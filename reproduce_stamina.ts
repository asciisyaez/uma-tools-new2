import { createRaceSolver } from './uma-skill-tools/RaceSolverEnhanced';
import { CourseData, Phase } from './uma-skill-tools/CourseData';
import { HorseParameters, Strategy, Aptitude } from './uma-skill-tools/HorseTypes';
import { GroundCondition, Weather, Season } from './uma-skill-tools/RaceParameters';
import { PRNG, SeededRng } from './uma-skill-tools/Random';

// Mock CC_GLOBAL if needed
if (typeof (global as any).CC_GLOBAL === 'undefined') {
    (global as any).CC_GLOBAL = false;
}

// Course 10811: Kyoto 3200m (Tenno Sho Spring)
const courseData = {
    "corners": [{ "length": 250, "start": 458 }, { "length": 250, "start": 708 }, { "length": 200, "start": 1450 }, { "length": 200, "start": 1650 }, { "length": 250, "start": 2300 }, { "length": 247, "start": 2550 }],
    "course": 3,
    "courseSetStatus": [],
    "distance": 3200,
    "distanceType": 4,
    "finishTimeMax": 2040000,
    "finishTimeMin": 1930000,
    "laneMax": 14100,
    "raceTrackId": 10008,
    "slopes": [{ "length": 100, "slope": 20000, "start": 208 }, { "length": 225, "slope": 10000, "start": 308 }, { "length": 150, "slope": -20000, "start": 533 }, { "length": 100, "slope": 20000, "start": 2050 }, { "length": 225, "slope": 10000, "start": 2150 }, { "length": 150, "slope": -20000, "start": 2375 }],
    "straights": [{ "end": 458, "frontType": 2, "start": 0 }, { "end": 1450, "frontType": 1, "start": 958 }, { "end": 2300, "frontType": 2, "start": 1850 }, { "end": 3200, "frontType": 1, "start": 2797 }],
    "surface": 1,
    "turn": 1,
    "horseLane": 2.5, // Standard lane width simulation
    "laneChangeAccelerationPerFrame": 0.006, // Default value
    "moveLanePoint": 200, // Standard move lane point
    "maxLaneDistance": 15 // Standard max lane distance
} as any; // Cast to any to avoid exact type matching for now

// Low stamina horse
const horse: HorseParameters = {
    speed: 1200,
    stamina: 300, // Very low for 3200m
    power: 1000,
    guts: 1000,
    wisdom: 1000,
    surfaceAptitude: 0,
    distanceAptitude: 0,
    strategyAptitude: 0,
    strategy: Strategy.Nige, // 1
    mood: 0, // Normal
    properRunStrategy: Strategy.Nige
};

const ground = GroundCondition.Good;

const rng = new SeededRng(12345);

console.log("Creating RaceSolver with EnhancedHpPolicy...");
const solver = createRaceSolver({
    horse,
    course: courseData,
    ground,
    rng,
    skills: [],
    useEnhancedSpurt: false
});

console.log(`Initial HP: ${solver.hp.hp} / ${solver.hp.maxHp}`);
console.log(`Course Distance: ${solver.course.distance}`);

// Run simulation
const dt = 1 / 15;
let frames = 0;
while (solver.pos < solver.course.distance) {
    solver.step(dt);
    frames++;
    if (frames % 150 === 0) { // Log every ~10s
        // console.log(`Time: ${solver.accumulatetime.t.toFixed(1)}s, Dist: ${solver.pos.toFixed(1)}m, HP: ${solver.hp.hp.toFixed(1)}, Spurt: ${solver.fullSpurt}`);
    }
}

console.log("Race finished.");
console.log(`Final HP: ${solver.hp.hp.toFixed(1)}`);
console.log(`HP Died: ${solver.hpDied}`);
console.log(`Full Spurt: ${solver.fullSpurt}`);

const expectedMaxHp = 0.8 * 0.95 * 300 + 3200; // Approx logic: 0.8 * coef * sta + dist
console.log(`Expected MaxHP (approx): ${expectedMaxHp}`);

if (solver.hp.hp > 0) {
    console.error("FAILURE: Horse finished with remaining HP despite low stamina!");
} else {
    console.log("SUCCESS: Horse ran out of HP as expected.");
}
