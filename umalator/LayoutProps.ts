import { StateUpdater } from 'preact/hooks';
import { RaceParameters } from '../uma-skill-tools/RaceParameters';
import { HorseState } from '../components/HorseDefTypes';
import { PosKeepMode } from '../uma-skill-tools/RaceSolver';

export interface LayoutProps {
    lang: string;
    strings: any;
    // Race Track & Visualization
    courseId: number;
    setCourseId: (id: number) => void;
    course: any;
    chartData: any;
    rtMouseMove: (pos: number) => void;
    rtMouseLeave: () => void;
    handleSkillDrag: (skillId: string, umaIndex: number, newStart: number, newEnd: number) => void;
    skillActivations: any[];
    rushedIndicators: any[];
    posKeepLabels: any[];
    posKeepMode: PosKeepMode;
    
    // Horses & Pacer
    uma1: HorseState;
    setUma1: StateUpdater<HorseState>;
    uma2: HorseState;
    setUma2: StateUpdater<HorseState>;
    pacer: HorseState;
    setPacer: StateUpdater<HorseState>;
    resetAllUmas: () => void;
    copyUmaToRight: () => void;
    copyUmaToLeft: () => void;
    swapUmas: () => void;

    // Race Settings
    racedef: any; // RaceParams
    racesetter: (prop: string) => (value: any) => void;
    setRaceDef: StateUpdater<any>;
    
    // Simulation Controls
    mode: number; // Mode enum
    updateUiState: (msg: number) => void;
    isSimulationRunning: boolean;
    doComparison: () => void;
    doBasinnChart: () => void;
    doRunOnce: () => void;
    nsamples: number;
    setSamples: (n: number) => void;
    seed: number;
    setSeed: (n: number) => void;
    setRunOnceCounter: StateUpdater<number>;
    setPosKeepMode: (mode: PosKeepMode) => void;
    copyStateUrl: (e: Event) => void;

    // Display Options
    showHp: boolean;
    toggleShowHp: () => void;
    showLanes: boolean;
    toggleShowLanes: () => void;
    showVirtualPacemakerOnGraph: boolean;
    
    // Pacemaker Settings
    pacemakerCount: number;
    handlePacemakerCountChange: (n: number) => void;
    selectedPacemakerIndices: number[];
    togglePacemakerSelection: (index: number) => void;
    isPacemakerDropdownOpen: boolean;
    setIsPacemakerDropdownOpen: StateUpdater<boolean>;
    getSelectedPacemakers: () => boolean[];

    // Wit Variance
    simWitVariance: boolean;
    handleSimWitVarianceToggle: () => void;
    showWitVarianceSettings: boolean;
    setShowWitVarianceSettings: StateUpdater<boolean>;
    witVarianceProps: {
        allowRushedUma1: boolean;
        allowRushedUma2: boolean;
        allowDownhillUma1: boolean;
        allowDownhillUma2: boolean;
        allowSectionModifierUma1: boolean;
        allowSectionModifierUma2: boolean;
        allowSkillCheckChanceUma1: boolean;
        allowSkillCheckChanceUma2: boolean;
        toggleRushedUma1: () => void;
        toggleRushedUma2: () => void;
        toggleDownhillUma1: () => void;
        toggleDownhillUma2: () => void;
        toggleSectionModifierUma1: () => void;
        toggleSectionModifierUma2: () => void;
        toggleSkillCheckChanceUma1: () => void;
        toggleSkillCheckChanceUma2: () => void;
    };

    // Layout State
    expanded: boolean;
    toggleExpand: (e: Event) => void;
    currentIdx: number;

    // Results
    resultsContent: any; // The rendered results pane (minus IntroText)
    
    // Popovers
    popoverSkill: string;
    tableData: any;
}

