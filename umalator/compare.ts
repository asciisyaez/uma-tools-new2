import { CourseData } from '../uma-skill-tools/CourseData';
import { RaceParameters, GroundCondition } from '../uma-skill-tools/RaceParameters';
import { RaceSolver, PosKeepMode } from '../uma-skill-tools/RaceSolver';
import { RaceSolverBuilder, Perspective, parseStrategy, parseAptitude, buildBaseStats, buildAdjustedStats } from '../uma-skill-tools/RaceSolverBuilder';
import { EnhancedHpPolicy } from '../uma-skill-tools/EnhancedHpPolicy';
import { GameHpPolicy } from '../uma-skill-tools/HpPolicy';
import { HorseParameters } from '../uma-skill-tools/HorseTypes';

import { HorseState } from '../components/HorseDefTypes';

import skilldata from '../uma-skill-tools/data/skill_data.json';
import { Rule30CARng } from '../uma-skill-tools/Random';

declare const CC_GLOBAL: boolean;

// Calculate theoretical max spurt based purely on stats (no RNG)
function calculateTheoreticalMaxSpurt(horse: any, course: CourseData, ground: GroundCondition): {
	canMaxSpurt: boolean,
	maxHp: number,
	hpNeededForMaxSpurt: number,
	maxSpurtSpeed: number,
	baseTargetSpeed2: number
} {
	const HpStrategyCoefficient = [0, 0.95, 0.89, 1.0, 0.995, 0.86];
	const HpConsumptionGroundModifier = [
		[],
		[0, 1.0, 1.0, 1.02, 1.02],
		[0, 1.0, 1.0, 1.01, 1.02]
	];
	const StrategyPhaseCoefficient = [
		[],
		[1.0, 0.98, 0.962],
		[0.978, 0.991, 0.975],
		[0.938, 0.998, 0.994],
		[0.931, 1.0, 1.0],
		[1.063, 0.962, 0.95]
	];
	const DistanceProficiencyModifier = [1.05, 1.0, 0.9, 0.8, 0.6, 0.4, 0.2, 0.1];

	// Parse strategy and aptitude from strings to numeric enums if needed
	const strategy = parseStrategy(horse.strategy);
	const distanceAptitude = parseAptitude(horse.distanceAptitude, 'distance');

	const baseSpeed = 20.0 - (course.distance - 2000) / 1000.0;
	const maxHp = 0.8 * HpStrategyCoefficient[strategy] * horse.stamina + course.distance;
	const groundModifier = HpConsumptionGroundModifier[course.surface][ground];
	const gutsModifier = 1.0 + 200.0 / Math.sqrt(600.0 * horse.guts);

	// Calculate base target speed for phase 2
	const baseTargetSpeed2 = baseSpeed * StrategyPhaseCoefficient[strategy][2] +
		Math.sqrt(500.0 * horse.speed) * DistanceProficiencyModifier[distanceAptitude] * 0.002;

	// Calculate max spurt speed
	const maxSpurtSpeed = (baseSpeed * (StrategyPhaseCoefficient[strategy][2] + 0.01) +
		Math.sqrt(horse.speed / 500.0) * DistanceProficiencyModifier[distanceAptitude]) * 1.05 +
		Math.sqrt(500.0 * horse.speed) * DistanceProficiencyModifier[distanceAptitude] * 0.002 +
		Math.pow(450.0 * horse.guts, 0.597) * 0.0001;

	// Calculate HP consumption for the entire race
	// Phase 0: 0 to 1/6 of course (acceleration phase)
	const phase0Distance = course.distance / 6;
	const phase0Speed = baseSpeed * StrategyPhaseCoefficient[strategy][0];
	const phase0HpPerSec = 20.0 * Math.pow(phase0Speed - baseSpeed + 12.0, 2) / 144.0 * groundModifier;
	const phase0Time = phase0Distance / phase0Speed;
	const phase0Hp = phase0HpPerSec * phase0Time;

	// Phase 1: 1/6 to 2/3 of course (middle phase)
	const phase1Distance = course.distance * 2 / 3 - phase0Distance;
	const phase1Speed = baseSpeed * StrategyPhaseCoefficient[strategy][1];
	const phase1HpPerSec = 20.0 * Math.pow(phase1Speed - baseSpeed + 12.0, 2) / 144.0 * groundModifier;
	const phase1Time = phase1Distance / phase1Speed;
	const phase1Hp = phase1HpPerSec * phase1Time;

	// Phase 2: 2/3 to finish (spurt phase)
	const spurtEntryPos = course.distance * 2 / 3;
	const remainingDistance = course.distance - spurtEntryPos;
	const spurtDistance = remainingDistance - 60; // 60m buffer

	// HP consumption during spurt at max speed
	const spurtHpPerSec = 20.0 * Math.pow(maxSpurtSpeed - baseSpeed + 12.0, 2) / 144.0 * groundModifier * gutsModifier;
	const spurtTime = spurtDistance / maxSpurtSpeed;
	const spurtHp = spurtHpPerSec * spurtTime;

	// Total HP needed for the entire race with max spurt
	const totalHpNeeded = phase0Hp + phase1Hp + spurtHp;

	// HP remaining after race (can be negative if horse runs out)
	const hpRemaining = maxHp - totalHpNeeded;

	// Can max spurt if we have enough HP
	const canMaxSpurt = hpRemaining >= 0;

	return {
		canMaxSpurt,
		maxHp,
		hpNeededForMaxSpurt: totalHpNeeded,
		maxSpurtSpeed,
		baseTargetSpeed2,
		hpRemaining
	};
}

export class ComparisonSession {
	private standard: RaceSolverBuilder;
	private compare: RaceSolverBuilder;
	private a: Generator<RaceSolver, void, boolean>;
	private b: Generator<RaceSolver, void, boolean>;
	private ai: number = 1;
	private bi: number = 0;
	private sign: number = 1;
	private diff: number[] = [];
	private min: number = Infinity;
	private max: number = -Infinity;
	private minrun: any;
	private maxrun: any;
	private meanrun: any;
	private medianrun: any;
	private estMean: number;
	private estMedian: number;
	private bestMeanDiff: number = Infinity;
	private bestMedianDiff: number = Infinity;
	private sampleCutoff: number;
	private retry: boolean = false;
	private rushedStats: any;
	private leadCompetitionStats: any;
	private staminaStats: any;
	private firstUmaStats: any;
	private aIsUma1: boolean = true;
	private basePacerRng: Rule30CARng;
	private pacers: RaceSolverBuilder[] = [];
	private options: any;
	private course: CourseData;
	private nsamples: number;
	private pacerHorse: any;
	private skillPos1: Map<string, any> = new Map();
	private skillPos2: Map<string, any> = new Map();

	constructor(nsamples: number, course: CourseData, racedef: RaceParameters, uma1: HorseState, uma2: HorseState, pacer: HorseState, options: any) {
		this.nsamples = nsamples;
		this.course = course;
		this.options = options;

		// Pre-calculate heal skills from uma's skill lists before race starts
		const uma1HealSkills = [];
		const uma2HealSkills = [];

		uma1.skills.forEach(skillId => {
			const skill = skilldata[skillId.split('-')[0]];
			if (skill && skill.alternatives) {
				skill.alternatives.forEach(alt => {
					if (alt.effects) {
						alt.effects.forEach(effect => {
							if (effect.type === 9) { // Recovery/Heal skill
								uma1HealSkills.push({
									id: skillId,
									heal: effect.modifier,
									duration: alt.baseDuration || 0
								});
							}
						});
					}
				});
			}
		});

		uma2.skills.forEach(skillId => {
			const skill = skilldata[skillId.split('-')[0]];
			if (skill && skill.alternatives) {
				skill.alternatives.forEach(alt => {
					if (alt.effects) {
						alt.effects.forEach(effect => {
							if (effect.type === 9) { // Recovery/Heal skill
								uma2HealSkills.push({
									id: skillId,
									heal: effect.modifier,
									duration: alt.baseDuration || 0
								});
							}
						});
					}
				});
			}
		});

		this.standard = new RaceSolverBuilder(nsamples)
			.seed(options.seed)
			.course(course)
			.ground(racedef.groundCondition)
			.weather(racedef.weather)
			.season(racedef.season)
			.time(racedef.time)
			.useEnhancedSpurt(options.useEnhancedSpurt || false)
			.accuracyMode(options.accuracyMode || false)
			.posKeepMode(options.posKeepMode)
			.mode(options.mode);
		if (racedef.orderRange != null) {
			this.standard
				.order(racedef.orderRange[0], racedef.orderRange[1])
				.numUmas(racedef.numUmas);
		}
		// Fork to share RNG - both horses face the same random events for fair comparison
		this.compare = this.standard.fork();

		if (options.mode === 'compare') {
			this.standard.desync();
		}

		this.standard.horse(uma1.toJS());
		this.compare.horse(uma2.toJS());

		// Apply rushed toggles
		if (options.allowRushedUma1 === false) {
			this.standard.disableRushed();
		}
		if (options.allowRushedUma2 === false) {
			this.compare.disableRushed();
		}

		// Apply downhill toggles
		if (options.allowDownhillUma1 === false) {
			this.standard.disableDownhill();
		}
		if (options.allowDownhillUma2 === false) {
			this.compare.disableDownhill();
		}

		if (options.allowSectionModifierUma1 === false) {
			this.standard.disableSectionModifier();
		}
		if (options.allowSectionModifierUma2 === false) {
			this.compare.disableSectionModifier();
		}

		// Apply skill check chance toggle
		if (options.skillCheckChanceUma1 === false) {
			this.standard.skillCheckChance(false);
		}
		if (options.skillCheckChanceUma2 === false) {
			this.compare.skillCheckChance(false);
		}
		// ensure skills common to the two umas are added in the same order regardless of what additional skills they have
		// this is important to make sure the rng for their activations is synced
		const common = uma1.skills.intersect(uma2.skills).toArray().sort((a, b) => +a - +b);
		const commonIdx = (id) => { let i = common.indexOf(id); return i > -1 ? i : common.length; };
		const sort = (a, b) => commonIdx(a) - commonIdx(b) || +a - +b;

		const uma1Horse = uma1.toJS();
		const uma1BaseStats = buildBaseStats(uma1Horse, uma1Horse.mood);
		const uma1AdjustedStats = buildAdjustedStats(uma1BaseStats, course, racedef.groundCondition);
		const uma1Wisdom = uma1AdjustedStats.wisdom;

		const uma2Horse = uma2.toJS();
		const uma2BaseStats = buildBaseStats(uma2Horse, uma2Horse.mood);
		const uma2AdjustedStats = buildAdjustedStats(uma2BaseStats, course, racedef.groundCondition);
		const uma2Wisdom = uma2AdjustedStats.wisdom;

		uma1.skills.toArray().sort(sort).forEach((id: string) => {
			const skillId = id.split('-')[0];
			const forcedPos = uma1.forcedSkillPositions.get(id);
			if (forcedPos != null) {
				this.standard.addSkillAtPosition(skillId, forcedPos, Perspective.Self);
				this.compare.addSkill(skillId, Perspective.Other, undefined, uma1Wisdom);
			} else {
				this.standard.addSkill(skillId, Perspective.Self);
				this.compare.addSkill(skillId, Perspective.Other, undefined, uma1Wisdom);
			}
		});
		uma2.skills.toArray().sort(sort).forEach((id: string) => {
			const skillId = id.split('-')[0];
			const forcedPos = uma2.forcedSkillPositions.get(id);
			if (forcedPos != null) {
				this.compare.addSkillAtPosition(skillId, forcedPos, Perspective.Self);
				this.standard.addSkill(skillId, Perspective.Other, undefined, uma2Wisdom);
			} else {
				this.compare.addSkill(skillId, Perspective.Self);
				this.standard.addSkill(skillId, Perspective.Other, undefined, uma2Wisdom);
			}
		});
		if (typeof CC_GLOBAL !== 'undefined' && !CC_GLOBAL) {
			this.standard.withAsiwotameru().withStaminaSyoubu();
			this.compare.withAsiwotameru().withStaminaSyoubu();
		}

		if (options.posKeepMode === PosKeepMode.Approximate) {
			this.pacerHorse = this.standard.useDefaultPacer(true);
		}
		else if (options.posKeepMode === PosKeepMode.Virtual) {
			if (pacer) {
				const pacerConfig = pacer.toJS ? pacer.toJS() : pacer;
				this.pacerHorse = this.standard.pacer(pacerConfig);

				if (pacerConfig.skills && Array.isArray(pacerConfig.skills) && pacerConfig.skills.length > 0) {
					pacerConfig.skills.forEach((skillId: string) => {
						const cleanSkillId = skillId.split('-')[0];
						this.standard.addPacerSkill(cleanSkillId);
					});
				}
			}
			else {
				this.pacerHorse = this.standard.useDefaultPacer();
			}
		}

		const getActivator = (selfSet, otherSet) => {
			return function (s, id, persp) {
				const skillSet = persp == Perspective.Self ? selfSet : otherSet;
				if (id != 'asitame' && id != 'staminasyoubu') {
					if (!skillSet.has(id)) skillSet.set(id, []);
					skillSet.get(id).push([s.pos, s.pos]);  // Initialize with same position for instant skills
				}
			};
		};
		const getDeactivator = (selfSet, otherSet) => {
			return function (s, id, persp) {
				const skillSet = persp == Perspective.Self ? selfSet : otherSet;
				if (id != 'asitame' && id != 'staminasyoubu') {
					const ar = skillSet.get(id);  // activation record
					if (ar && ar.length > 0) {
						// Only update if this is a duration skill (position has moved)
						const activationPos = ar[ar.length - 1][0];
						if (s.pos > activationPos) {
							ar[ar.length - 1][1] = Math.min(s.pos, course.distance);
						}
					}
				}
			};
		};
		this.standard.onSkillActivate(getActivator(this.skillPos1, this.skillPos2));
		this.standard.onSkillDeactivate(getDeactivator(this.skillPos1, this.skillPos2));
		this.compare.onSkillActivate(getActivator(this.skillPos2, this.skillPos1));
		this.compare.onSkillDeactivate(getDeactivator(this.skillPos2, this.skillPos1));
		this.a = this.standard.build();
		this.b = this.compare.build();

		this.sampleCutoff = Math.max(Math.floor(nsamples * 0.8), nsamples - 200);

		// Track rushed statistics across all simulations
		this.rushedStats = {
			uma1: { lengths: [], count: 0 },
			uma2: { lengths: [], count: 0 }
		};

		this.leadCompetitionStats = {
			uma1: { lengths: [], count: 0 },
			uma2: { lengths: [], count: 0 }
		};

		// Track stamina survival and full spurt statistics
		this.staminaStats = {
			uma1: { hpDiedCount: 0, fullSpurtCount: 0, total: 0 },
			uma2: { hpDiedCount: 0, fullSpurtCount: 0, total: 0 }
		};

		this.firstUmaStats = {
			uma1: { firstPlaceCount: 0, total: 0 },
			uma2: { firstPlaceCount: 0, total: 0 }
		};

		this.basePacerRng = new Rule30CARng(options.seed + 1);
	}

	run(count: number) {
		const getDeactivator = (selfSet, otherSet) => {
			return function (s, id, persp) {
				const skillSet = persp == Perspective.Self ? selfSet : otherSet;
				if (id != 'asitame' && id != 'staminasyoubu') {
					const ar = skillSet.get(id);  // activation record
					if (ar && ar.length > 0) {
						// Only update if this is a duration skill (position has moved)
						const activationPos = ar[ar.length - 1][0];
						if (s.pos > activationPos) {
							ar[ar.length - 1][1] = Math.min(s.pos, this.course.distance);
						}
					}
				}
			};
		};

		for (let i = 0; i < count; ++i) {
			let pacers = [];

			for (let j = 0; j < this.options.pacemakerCount; ++j) {
				let pacerRng = new Rule30CARng(this.basePacerRng.int32());
				const pacer: RaceSolver | null = this.pacerHorse != null ? this.standard.buildPacer(this.pacerHorse, i, pacerRng) : null;
				pacers.push(pacer);
			}

			const pacer: RaceSolver | null = pacers.length > 0 ? pacers[0] : null;

			const s1 = this.a.next(this.retry).value as RaceSolver;
			const s2 = this.b.next(this.retry).value as RaceSolver;
			const data = { t: [[], []], p: [[], []], v: [[], []], hp: [[], []], currentLane: [[], []], pacerGap: [[], []], sk: [null, null], sdly: [0, 0], rushed: [[], []], posKeep: [[], []], competeFight: [[], []], leadCompetition: [[], []], pacerV: [[], [], []], pacerP: [[], [], []], pacerT: [[], [], []], pacerPosKeep: [[], [], []], pacerLeadCompetition: [[], [], []] };

			s1.initUmas([s2, ...pacers]);
			s2.initUmas([s1, ...pacers]);

			pacers.forEach(p => {
				p?.initUmas([s1, s2, ...pacers.filter(p2 => p2 !== p)]);
			});

			let s1Finished = false;
			let s2Finished = false;
			let posDifference = 0;

			while (!s1Finished || !s2Finished) {
				let currentPacer = null;

				if (pacer) {
					currentPacer = pacer.getPacer();

					pacer.umas.forEach(u => {
						u.updatePacer(currentPacer);
					});
				}

				if (s2.pos < this.course.distance) {
					data.pacerGap[this.ai].push(currentPacer ? currentPacer.pos - s2.pos : undefined);
				}
				if (s1.pos < this.course.distance) {
					data.pacerGap[this.bi].push(currentPacer ? currentPacer.pos - s1.pos : undefined);
				}

				for (let j = 0; j < this.options.pacemakerCount; j++) {
					const p = j < pacers.length ? pacers[j] : null;
					if (!p || p.pos >= this.course.distance) continue;
					p.step(1 / 15);
					data.pacerV[j].push(p ? (p.currentSpeed + (p.modifiers.currentSpeed.acc + p.modifiers.currentSpeed.err)) : undefined);
					data.pacerP[j].push(p ? p.pos : undefined);
					data.pacerT[j].push(p ? p.accumulatetime.t : undefined);
				}

				if (s2.pos < this.course.distance) {
					s2.step(1 / 15);

					data.t[this.ai].push(s2.accumulatetime.t);
					data.p[this.ai].push(s2.pos);
					data.v[this.ai].push(s2.currentSpeed + (s2.modifiers.currentSpeed.acc + s2.modifiers.currentSpeed.err));
					data.hp[this.ai].push((s2.hp as any).hp);
					data.currentLane[this.ai].push(s2.currentLane);
				}
				else if (!s2Finished) {
					s2Finished = true;

					data.sdly[this.ai] = s2.startDelay;
					data.rushed[this.ai] = s2.rushedActivations.slice();
					data.posKeep[this.ai] = s2.positionKeepActivations.slice();
					if (s2.competeFightStart != null) {
						data.competeFight[this.ai] = [s2.competeFightStart, s2.competeFightEnd != null ? s2.competeFightEnd : this.course.distance];
					}
					if (s2.leadCompetitionStart != null) {
						data.leadCompetition[this.ai] = [s2.leadCompetitionStart, s2.leadCompetitionEnd != null ? s2.leadCompetitionEnd : this.course.distance];
					}
				}

				if (s1.pos < this.course.distance) {
					s1.step(1 / 15);

					data.t[this.bi].push(s1.accumulatetime.t);
					data.p[this.bi].push(s1.pos);
					data.v[this.bi].push(s1.currentSpeed + (s1.modifiers.currentSpeed.acc + s1.modifiers.currentSpeed.err));
					data.hp[this.bi].push((s1.hp as any).hp);
					data.currentLane[this.bi].push(s1.currentLane);
				}
				else if (!s1Finished) {
					s1Finished = true;

					data.sdly[this.bi] = s1.startDelay;
					data.rushed[this.bi] = s1.rushedActivations.slice();
					data.posKeep[this.bi] = s1.positionKeepActivations.slice();
					if (s1.competeFightStart != null) {
						data.competeFight[this.bi] = [s1.competeFightStart, s1.competeFightEnd != null ? s1.competeFightEnd : this.course.distance];
					}
					if (s1.leadCompetitionStart != null) {
						data.leadCompetition[this.bi] = [s1.leadCompetitionStart, s1.leadCompetitionEnd != null ? s1.leadCompetitionEnd : this.course.distance];
					}
				}

				s2.updatefirstUmaInLateRace();
			}

			// ai took less time to finish (less frames to finish)
			if (data.p[this.ai].length <= data.p[this.bi].length) {
				let aiFrames = data.p[this.ai].length;
				posDifference = data.p[this.ai][aiFrames - 1] - data.p[this.bi][aiFrames - 1];
			}
			else {
				let biFrames = data.p[this.bi].length;
				posDifference = data.p[this.ai][biFrames - 1] - data.p[this.bi][biFrames - 1];
			}

			pacers.forEach(p => {
				if (p && p.pos < this.course.distance) {
					p.step(1 / 15);

					for (let pacemakerIndex = 0; pacemakerIndex < 3; pacemakerIndex++) {
						if (pacemakerIndex < pacers.length && pacers[pacemakerIndex] === p) {
							data.pacerV[pacemakerIndex].push(p ? (p.currentSpeed + (p.modifiers.currentSpeed.acc + p.modifiers.currentSpeed.err)) : undefined);
							data.pacerP[pacemakerIndex].push(p ? p.pos : undefined);
							data.pacerT[pacemakerIndex].push(p ? p.accumulatetime.t : undefined);
						}
					}
				}
			});

			for (let j = 0; j < this.options.pacemakerCount; j++) {
				const p = j < pacers.length ? pacers[j] : null;
				data.pacerPosKeep[j] = p ? p.positionKeepActivations.slice() : [];
				if (p && p.leadCompetitionStart != null) {
					data.pacerLeadCompetition[j] = [p.leadCompetitionStart, p.leadCompetitionEnd != null ? p.leadCompetitionEnd : this.course.distance];
				} else {
					data.pacerLeadCompetition[j] = [];
				}
			}

			// Clean up skills that are still active when the race ends
			// This ensures skills that activate near the finish line get proper end positions
			// Also handles skills with very short durations that might deactivate in the same frame
			const cleanupActiveSkills = (solver, selfSkillSet, otherSkillSet) => {
				const allActiveSkills = [
					...solver.activeTargetSpeedSkills,
					...solver.activeCurrentSpeedSkills,
					...solver.activeAccelSkills
				];

				allActiveSkills.forEach(skill => {
					// Call the deactivator to set the end position to course.distance
					// This handles both race-end cleanup and very short duration skills
					// Use the correct skill position maps for this solver
					// NOTE: We need to bind `this` or use the closure properly, but `getDeactivator` is defined in constructor
					// We redefine it here or make it a method.
					// Since we need access to `this.course.distance`, it's better to define it inside `run` or as a method.
					// I've redefined it at the top of `run`.
					getDeactivator(selfSkillSet, otherSkillSet).call(this, solver, skill.skillId, skill.perspective);
				});
			};

			// Clean up active skills for both horses
			// s1 comes from generator 'a' (standard), s2 comes from generator 'b' (compare)
			// standard uses skillPos1 for self, skillPos2 for other
			// compare uses skillPos2 for self, skillPos1 for other
			cleanupActiveSkills(s1, this.skillPos1, this.skillPos2);
			cleanupActiveSkills(s2, this.skillPos2, this.skillPos1);

			data.sk[1] = new Map(this.skillPos2);  // NOT ai (NB. why not?)
			this.skillPos2.clear();
			data.sk[0] = new Map(this.skillPos1);  // NOT bi (NB. why not?)
			this.skillPos1.clear();

			this.retry = false;

			// ONLY track stats for valid iterations (after swap check, but BEFORE cleanup)
			// Key insight: After swaps, s1 and s2 variable names don't tell us which uma they are!
			// We need to track which BUILDER (a or b) they came from:
			// - s1 always comes from generator 'a'
			// - s2 always comes from generator 'b'
			// - 'a' started as standard builder (uma1), 'b' started as compare builder (uma2)
			// - After swaps, 'a' might generate uma2 and 'b' might generate uma1
			// BUT: we swapped both the generators AND the indices, so:
			//   - If aIsUma1, then s1=uma1, s2=uma2
			//   - After swap: generators swap AND indices swap, so relationship stays same!

			// Actually wait, that's not right either. Let me think...
			// After [b,a]=[a,b], the generator that WAS producing uma1 is now in variable 'b'

			// Determine which uma each solver represents based on current generator state
			// s1 came from generator 'a': if aIsUma1, then s1 is uma1, else s1 is uma2  
			// s2 came from generator 'b': if aIsUma1, then s2 is uma2, else s2 is uma1
			const s1IsUma1 = this.aIsUma1;
			const s2IsUma1 = !this.aIsUma1;

			// Track stats for s1's uma
			const s1Stats = s1IsUma1 ? this.staminaStats.uma1 : this.staminaStats.uma2;
			s1Stats.total++;
			if (s1.hpDied) {
				s1Stats.hpDiedCount++;
			}
			if (s1.fullSpurt) {
				s1Stats.fullSpurtCount++;
			}

			// Track stats for s2's uma
			const s2Stats = s2IsUma1 ? this.staminaStats.uma1 : this.staminaStats.uma2;
			s2Stats.total++;
			if (s2.hpDied) {
				s2Stats.hpDiedCount++;
			}
			if (s2.fullSpurt) {
				s2Stats.fullSpurtCount++;
			}

			const s1FirstUmaStats = s1IsUma1 ? this.firstUmaStats.uma1 : this.firstUmaStats.uma2;
			s1FirstUmaStats.total++;
			if (s1.firstUmaInLateRace) {
				s1FirstUmaStats.firstPlaceCount++;
			}

			const s2FirstUmaStats = s2IsUma1 ? this.firstUmaStats.uma1 : this.firstUmaStats.uma2;
			s2FirstUmaStats.total++;
			if (s2.firstUmaInLateRace) {
				s2FirstUmaStats.firstPlaceCount++;
			}

			// Cleanup AFTER stat tracking
			s2.cleanup();
			s1.cleanup();

			// Collect rushed statistics (also based on which uma the solver represents)
			if (s1.rushedActivations.length > 0) {
				const [start, end] = s1.rushedActivations[0];
				const length = end - start;
				const s1RushedStats = s1IsUma1 ? this.rushedStats.uma1 : this.rushedStats.uma2;
				s1RushedStats.lengths.push(length);
				s1RushedStats.count++;
			}
			if (s2.rushedActivations.length > 0) {
				const [start, end] = s2.rushedActivations[0];
				const length = end - start;
				const s2RushedStats = s2IsUma1 ? this.rushedStats.uma1 : this.rushedStats.uma2;
				s2RushedStats.lengths.push(length);
				s2RushedStats.count++;
			}

			if (s1.leadCompetitionStart != null) {
				const start = s1.leadCompetitionStart;
				const end = s1.leadCompetitionEnd != null ? s1.leadCompetitionEnd : this.course.distance;
				const length = end - start;
				const s1LeadCompStats = s1IsUma1 ? this.leadCompetitionStats.uma1 : this.leadCompetitionStats.uma2;
				s1LeadCompStats.lengths.push(length);
				s1LeadCompStats.count++;
			}
			if (s2.leadCompetitionStart != null) {
				const start = s2.leadCompetitionStart;
				const end = s2.leadCompetitionEnd != null ? s2.leadCompetitionEnd : this.course.distance;
				const length = end - start;
				const s2LeadCompStats = s2IsUma1 ? this.leadCompetitionStats.uma1 : this.leadCompetitionStats.uma2;
				s2LeadCompStats.lengths.push(length);
				s2LeadCompStats.count++;
			}

			const basinn = this.sign * posDifference / 2.5;
			this.diff.push(basinn);
			if (basinn < this.min) {
				this.min = basinn;
				this.minrun = data;
			}
			if (basinn > this.max) {
				this.max = basinn;
				this.maxrun = data;
			}
			if (this.diff.length == this.sampleCutoff) {
				this.diff.sort((a, b) => a - b);
				this.estMean = this.diff.reduce((a, b) => a + b) / this.diff.length;
				const mid = Math.floor(this.diff.length / 2);
				this.estMedian = mid > 0 && this.diff.length % 2 == 0 ? (this.diff[mid - 1] + this.diff[mid]) / 2 : this.diff[mid];
			}
			if (this.diff.length >= this.sampleCutoff) {
				const meanDiff = Math.abs(basinn - this.estMean), medianDiff = Math.abs(basinn - this.estMedian);
				if (meanDiff < this.bestMeanDiff) {
					this.bestMeanDiff = meanDiff;
					this.meanrun = data;
				}
				if (medianDiff < this.bestMedianDiff) {
					this.bestMedianDiff = medianDiff;
					this.medianrun = data;
				}
			}
		}
	}

	getResults() {
		this.diff.sort((a, b) => a - b);

		// Calculate rushed statistics
		const calculateStats = (stats) => {
			if (stats.lengths.length === 0) {
				return { min: 0, max: 0, mean: 0, frequency: 0 };
			}
			const min = Math.min(...stats.lengths);
			const max = Math.max(...stats.lengths);
			const mean = stats.lengths.reduce((a, b) => a + b, 0) / stats.lengths.length;
			const frequency = (stats.count / this.diff.length) * 100; // percentage
			return { min, max, mean, frequency };
		};

		const rushedStatsSummary = {
			uma1: calculateStats(this.rushedStats.uma1),
			uma2: calculateStats(this.rushedStats.uma2)
		};

		const leadCompetitionStatsSummary = {
			uma1: calculateStats(this.leadCompetitionStats.uma1),
			uma2: calculateStats(this.leadCompetitionStats.uma2)
		};

		// Calculate stamina survival and full spurt rates
		const staminaStatsSummary = {
			uma1: {
				staminaSurvivalRate: this.staminaStats.uma1.total > 0 ? ((this.staminaStats.uma1.total - this.staminaStats.uma1.hpDiedCount) / this.staminaStats.uma1.total * 100) : 0,
				fullSpurtRate: this.staminaStats.uma1.total > 0 ? (this.staminaStats.uma1.fullSpurtCount / this.staminaStats.uma1.total * 100) : 0
			},
			uma2: {
				staminaSurvivalRate: this.staminaStats.uma2.total > 0 ? ((this.staminaStats.uma2.total - this.staminaStats.uma2.hpDiedCount) / this.staminaStats.uma2.total * 100) : 0,
				fullSpurtRate: this.staminaStats.uma2.total > 0 ? (this.staminaStats.uma2.fullSpurtCount / this.staminaStats.uma2.total * 100) : 0
			}
		};

		const firstUmaStatsSummary = {
			uma1: {
				firstPlaceRate: this.firstUmaStats.uma1.total > 0 ? (this.firstUmaStats.uma1.firstPlaceCount / this.firstUmaStats.uma1.total * 100) : 0
			},
			uma2: {
				firstPlaceRate: this.firstUmaStats.uma2.total > 0 ? (this.firstUmaStats.uma2.firstPlaceCount / this.firstUmaStats.uma2.total * 100) : 0
			}
		};

		return {
			results: this.diff,
			runData: { minrun: this.minrun, maxrun: this.maxrun, meanrun: this.meanrun, medianrun: this.medianrun },
			rushedStats: rushedStatsSummary,
			leadCompetitionStats: leadCompetitionStatsSummary,
			spurtInfo: this.options.useEnhancedSpurt ? { uma1: null, uma2: null } : null, // Placeholder as spurtInfo wasn't fully implemented in original
			staminaStats: staminaStatsSummary,
			firstUmaStats: firstUmaStatsSummary
		};
	}
}

export function runComparison(nsamples: number, course: CourseData, racedef: RaceParameters, uma1: HorseState, uma2: HorseState, pacer: HorseState, options) {
	const session = new ComparisonSession(nsamples, course, racedef, uma1, uma2, pacer, options);
	session.run(nsamples);
	return session.getResults();
}
