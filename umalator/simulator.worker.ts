import type { CourseData } from '../uma-skill-tools/CourseData';
import type { RaceParameters } from '../uma-skill-tools/RaceParameters';

import { Map as ImmMap } from 'immutable';
import { HorseState, SkillSet } from '../components/HorseDefTypes';
import { runComparison } from './compare';

function mergeResults(results1, results2) {
	console.assert(results1.id == results2.id, `mergeResults: ${results1.id} != ${results2.id}`);
	const n1 = results1.results.length, n2 = results2.results.length;
	const combinedResults = results1.results.concat(results2.results).sort((a, b) => a - b);
	const combinedMean = (results1.mean * n1 + results2.mean * n2) / (n1 + n2);
	const mid = Math.floor(combinedResults.length / 2);
	const newMedian = combinedResults.length % 2 == 0 ? (combinedResults[mid - 1] + combinedResults[mid]) / 2 : combinedResults[mid];
	return {
		id: results1.id,
		results: combinedResults,
		min: Math.min(results1.min, results2.min),
		max: Math.max(results1.max, results2.max),
		mean: combinedMean,
		median: newMedian,
		runData: {
			// TODO should re-compute the bashin gain from .t/.p and pick whichever is closer to new mean/median
			...(n2 > n1 ? results2.runData : results1.runData),
			minrun: results1.min < results2.min ? results1.runData.minrun : results2.runData.minrun,
			maxrun: results1.max > results2.max ? results1.runData.maxrun : results2.runData.maxrun,
		}
	};
}

function mergeResultSets(data1, data2) {
	data2.forEach((r, id) => {
		data1.set(id, mergeResults(data1.get(id), r));
	});
}

async function runRoundBatch(nsamples: number, skills: string[], course: CourseData, racedef: RaceParameters, uma, pacer, options, previousResults?: Map<string, any>, phase?: number) {
	const currentRoundData = new Map();
	const CHUNK_SIZE = Math.max(1, Math.floor(500 / nsamples));

	for (let i = 0; i < skills.length; i += CHUNK_SIZE) {
		const chunk = skills.slice(i, i + CHUNK_SIZE);
		const chunkUpdates = new Map();

		chunk.forEach(id => {
			const withSkill = uma.set('skills', uma.skills.add(id));
			const { results: rawResults, runData } = runComparison(nsamples, course, racedef, uma, withSkill, pacer, options);

			const mid = Math.floor(rawResults.length / 2);
			const median = rawResults.length % 2 == 0 ? (rawResults[mid - 1] + rawResults[mid]) / 2 : rawResults[mid];
			const mean = rawResults.reduce((a, b) => a + b, 0) / rawResults.length;

			const resultEntry = {
				id, results: rawResults, runData,
				min: rawResults[0],
				max: rawResults[rawResults.length - 1],
				mean,
				median
			};

			currentRoundData.set(id, resultEntry);

			const existing = previousResults ? previousResults.get(id) : null;
			const merged = existing ? mergeResults(existing, resultEntry) : resultEntry;

			chunkUpdates.set(id, merged);
			if (previousResults) previousResults.set(id, merged);
		});

		postMessage({ type: 'chart', results: chunkUpdates, phase, progress: i + chunk.length, total: skills.length });
		await new Promise(r => setTimeout(r, 0));
	}

	return currentRoundData;
}

async function runChart({ skills, course, racedef, uma, pacer, options }) {
	const uma_ = new HorseState(uma)
		.set('skills', SkillSet(uma.skills))
		.set('forcedSkillPositions', ImmMap(uma.forcedSkillPositions || {}));
	const pacer_ = pacer ? new HorseState(pacer)
		.set('skills', SkillSet(pacer.skills || []))
		.set('forcedSkillPositions', ImmMap(pacer.forcedSkillPositions || {})) : null;

	const results = new Map();

	await runRoundBatch(5, skills, course, racedef, uma_, pacer_, options, results, 1);

	skills = skills.filter(id => results.get(id).max > 0.1);

	await runRoundBatch(20, skills, course, racedef, uma_, pacer_, options, results, 2);

	skills = skills.filter(id => Math.abs(results.get(id).max - results.get(id).min) > 0.1);

	await runRoundBatch(50, skills, course, racedef, uma_, pacer_, options, results, 3);

	await runRoundBatch(200, skills, course, racedef, uma_, pacer_, options, results, 4);

	postMessage({ type: 'chart-complete' });
}

import { ComparisonSession } from './compare';

function runCompare({ nsamples, course, racedef, uma1, uma2, pacer, options }) {
	const uma1_ = new HorseState(uma1)
		.set('skills', SkillSet(uma1.skills))
		.set('forcedSkillPositions', ImmMap(uma1.forcedSkillPositions || {}));
	const uma2_ = new HorseState(uma2)
		.set('skills', SkillSet(uma2.skills))
		.set('forcedSkillPositions', ImmMap(uma2.forcedSkillPositions || {}));
	const pacer_ = pacer ? new HorseState(pacer)
		.set('skills', SkillSet(pacer.skills || []))
		.set('forcedSkillPositions', ImmMap(pacer.forcedSkillPositions || {})) : null;
	const compareOptions = { ...options, mode: 'compare' };

	const session = new ComparisonSession(nsamples, course, racedef, uma1_, uma2_, pacer_, compareOptions);

	const BATCH_SIZE = 50;
	let completed = 0;

	function runBatch() {
		const count = Math.min(BATCH_SIZE, nsamples - completed);
		if (count > 0) {
			session.run(count);
			completed += count;
			const results = session.getResults();
			postMessage({ type: 'compare', results, progress: completed, total: nsamples });
			setTimeout(runBatch, 0);
		} else {
			postMessage({ type: 'compare-complete' });
		}
	}

	runBatch();
}

self.addEventListener('message', function (e) {
	const { msg, data } = e.data;
	switch (msg) {
		case 'chart':
			runChart(data);
			break;
		case 'compare':
			runCompare(data);
			break;
	}
});
