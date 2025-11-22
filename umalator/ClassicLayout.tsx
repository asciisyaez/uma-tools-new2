import { h, Fragment } from 'preact';
import { IntlProvider } from 'preact-i18n';
import { RaceTrack, TrackSelect } from '../components/RaceTrack';
import { HorseDef, horseDefTabs } from '../components/HorseDef';
import { Language } from '../components/Language';
import { IntroText } from './IntroText';
import {
    TimeOfDaySelect,
    GroundSelect,
    WeatherSelect,
    SeasonSelect,
    VelocityLines,
    RacePresets,
    BasinnChartPopover,
    WitVarianceSettingsPopup,
    Mode,
    UiStateMsg
} from './app';
import { LayoutProps } from './LayoutProps';

export function ClassicLayout(props: LayoutProps) {
    const {
        lang, strings, courseId, setCourseId, course, chartData, rtMouseMove, rtMouseLeave, handleSkillDrag,
        skillActivations, rushedIndicators, posKeepLabels, uma1, setUma1, uma2, setUma2, pacer, setPacer,
        resetAllUmas, copyUmaToRight, copyUmaToLeft, swapUmas, racedef, racesetter, setRaceDef,
        mode, updateUiState, isSimulationRunning, doComparison, doBasinnChart, doRunOnce,
        nsamples, setSamples, seed, setSeed, setRunOnceCounter, posKeepMode, setPosKeepMode, copyStateUrl,
        showHp, toggleShowHp, showLanes, toggleShowLanes, showVirtualPacemakerOnGraph,
        pacemakerCount, handlePacemakerCountChange, selectedPacemakerIndices, togglePacemakerSelection,
        isPacemakerDropdownOpen, setIsPacemakerDropdownOpen, getSelectedPacemakers,
        simWitVariance, handleSimWitVarianceToggle, showWitVarianceSettings, setShowWitVarianceSettings,
        witVarianceProps, expanded, toggleExpand, currentIdx, resultsContent, popoverSkill, tableData
    } = props;

    const umaTabs = (
        <Fragment>
            <div class={`umaTab ${currentIdx == 0 ? 'selected' : ''}`} onClick={() => updateUiState(UiStateMsg.SetCurrentIdx0)}>Umamusume 1</div>
            {mode == Mode.Compare && <div class={`umaTab ${currentIdx == 1 ? 'selected' : ''}`} onClick={() => updateUiState(UiStateMsg.SetCurrentIdx1)}>Umamusume 2{posKeepMode != 2 /* PosKeepMode.Virtual */ && <div id="expandBtn" title="Expand panel" onClick={toggleExpand} />}</div>}
            {posKeepMode == 2 /* PosKeepMode.Virtual */ && <div class={`umaTab ${currentIdx == 2 ? 'selected' : ''}`} onClick={() => updateUiState(UiStateMsg.SetCurrentIdx2)}>Virtual Pacemaker<div id="expandBtn" title="Expand panel" onClick={toggleExpand} /></div>}
        </Fragment>
    );

    let finalResultsPane = resultsContent;
    if (!finalResultsPane && typeof CC_GLOBAL !== 'undefined' && CC_GLOBAL) {
        finalResultsPane = (
            <div id="resultsPaneWrapper">
                <div id="resultsPane">
                    <IntroText />
                </div>
            </div>
        );
    }

    return (
        <Language.Provider value={lang}>
            <IntlProvider definition={strings}>
                <div id="topPane" class={chartData ? 'hasResults' : ''}>
                    <RaceTrack courseid={courseId} width={960} height={240} xOffset={20} yOffset={15} yExtra={20} mouseMove={rtMouseMove} mouseLeave={rtMouseLeave} onSkillDrag={handleSkillDrag} regions={[...skillActivations, ...rushedIndicators]} posKeepLabels={posKeepLabels} uma1={uma1} uma2={uma2} pacer={pacer}>
                        <VelocityLines data={chartData} courseDistance={course.distance} width={960} height={250} xOffset={20} showHp={showHp} showLanes={showLanes} horseLane={course.horseLane} showVirtualPacemaker={showVirtualPacemakerOnGraph && posKeepMode === 2} selectedPacemakers={getSelectedPacemakers()} />

                        <g id="rtMouseOverBox" style="display:none">
                            <text id="rtV1" x="25" y="10" fill="#2a77c5" font-size="10px"></text>
                            <text id="rtV2" x="25" y="20" fill="#c52a2a" font-size="10px"></text>
                            <text id="rtVp" x="25" y="30" fill="#22c55e" font-size="10px"></text>
                            <text id="pd1" x="25" y="10" fill="#2a77c5" font-size="10px"></text>
                            <text id="pd2" x="25" y="20" fill="#c52a2a" font-size="10px"></text>
                        </g>
                    </RaceTrack>
                    <div id="runPane">
                        <fieldset>
                            <legend>Mode:</legend>
                            <div>
                                <input type="radio" id="mode-compare" name="mode" value="compare" checked={mode == Mode.Compare} onClick={() => updateUiState(UiStateMsg.SetModeCompare)} />
                                <label for="mode-compare">Compare</label>
                            </div>
                            <div>
                                <input type="radio" id="mode-chart" name="mode" value="chart" checked={mode == Mode.Chart} onClick={() => updateUiState(UiStateMsg.SetModeChart)} />
                                <label for="mode-chart">Skill chart</label>
                            </div>
                            <div>
                                <input type="radio" id="mode-uniques-chart" name="mode" value="uniques-chart" checked={mode == Mode.UniquesChart} onClick={() => updateUiState(UiStateMsg.SetModeUniquesChart)} />
                                <label for="mode-uniques-chart">Uma chart</label>
                            </div>
                        </fieldset>
                        {
                            mode == Mode.Compare
                                ? <button id="run" onClick={doComparison} tabindex={1} disabled={isSimulationRunning}>COMPARE</button>
                                : <button id="run" onClick={doBasinnChart} tabindex={1} disabled={isSimulationRunning}>RUN</button>
                        }
                        {
                            mode == Mode.Compare
                                ? <button id="runOnce" onClick={doRunOnce} tabindex={1} disabled={isSimulationRunning}>Run Once</button>
                                : null
                        }
                        <label for="nsamples">Samples:</label>
                        <input type="number" id="nsamples" min="1" max="10000" value={nsamples} onInput={(e) => setSamples(+e.currentTarget.value)} />
                        <label for="seed">Seed:</label>
                        <div id="seedWrapper">
                            <input type="number" id="seed" value={seed} onInput={(e) => { setSeed(+e.currentTarget.value); setRunOnceCounter(0); }} />
                            <button title="Randomize seed" onClick={() => { setSeed(Math.floor(Math.random() * (-1 >>> 0)) >>> 0); setRunOnceCounter(0); }}>🎲</button>
                        </div>
                        <fieldset id="posKeepFieldset">
                            <legend>Position Keep:</legend>
                            <select id="poskeepmode" value={posKeepMode} onInput={(e) => setPosKeepMode(+e.currentTarget.value)}>
                                <option value={0}>None</option>
                                <option value={1}>Approximate</option>
                                <option value={2}>Virtual Pacemaker</option>
                            </select>
                            {posKeepMode == 1 /* Approximate */ && (
                                <div id="pacemakerIndicator">
                                    <span>Using default pacemaker</span>
                                </div>
                            )}
                            {posKeepMode == 2 /* Virtual */ && (
                                <div id="pacemakerIndicator">
                                    <div>
                                        <label>Show Pacemakers:</label>
                                        <div className="pacemaker-combobox">
                                            <button
                                                className="pacemaker-combobox-button"
                                                onClick={() => setIsPacemakerDropdownOpen(!isPacemakerDropdownOpen)}
                                            >
                                                {selectedPacemakerIndices.length === 0
                                                    ? 'None'
                                                    : selectedPacemakerIndices.length === 1
                                                        ? `Pacemaker ${selectedPacemakerIndices[0] + 1}`
                                                        : selectedPacemakerIndices.length === pacemakerCount
                                                            ? 'All Pacemakers'
                                                            : `${selectedPacemakerIndices.length} Pacemakers`
                                                }
                                                <span className="pacemaker-combobox-arrow">▼</span>
                                            </button>
                                            {isPacemakerDropdownOpen && (
                                                <div className="pacemaker-combobox-dropdown">
                                                    {[...Array(pacemakerCount)].map((_, index) => (
                                                        <label key={index} className="pacemaker-combobox-option">
                                                            <input
                                                                type="checkbox"
                                                                checked={selectedPacemakerIndices.includes(index)}
                                                                onChange={() => togglePacemakerSelection(index)}
                                                            />
                                                            <span style={{ color: index === 0 ? '#22c55e' : index === 1 ? '#a855f7' : '#ec4899' }}>
                                                                Pacemaker {index + 1}
                                                            </span>
                                                        </label>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div id="pacemakerCountControl">
                                        <label for="pacemakercount">Number of pacemakers: {pacemakerCount}</label>
                                        <input
                                            type="range"
                                            id="pacemakercount"
                                            min="1"
                                            max="3"
                                            value={pacemakerCount}
                                            onInput={(e) => handlePacemakerCountChange(+e.currentTarget.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </fieldset>
                        <div>
                            <label for="showhp">Show HP</label>
                            <input type="checkbox" id="showhp" checked={showHp} onClick={toggleShowHp} />
                        </div>
                        <div>
                            <label for="showlanes">Show Lanes</label>
                            <input type="checkbox" id="showlanes" checked={showLanes} onClick={toggleShowLanes} />
                        </div>
                        <div>
                            <label for="simWitVariance">Wit Variance</label>
                            <input type="checkbox" id="simWitVariance" checked={simWitVariance} onClick={handleSimWitVarianceToggle} />
                            <button
                                className="wit-variance-settings-btn"
                                onClick={() => setShowWitVarianceSettings(true)}
                                title="Configure Wit Variance settings"
                                disabled={!simWitVariance}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                            </button>
                        </div>

                        <a href="#" onClick={copyStateUrl}>Copy link</a>
                        <RacePresets set={(courseId, racedef) => { setCourseId(courseId); setRaceDef(racedef); }} />
                    </div>
                    <div id="buttonsRow">
                        <TrackSelect key={courseId} courseid={courseId} setCourseid={setCourseId} tabindex={2} />
                        <div id="buttonsRowSpace" />
                        <TimeOfDaySelect value={racedef.time} set={racesetter('time')} />
                        <div>
                            <GroundSelect value={racedef.ground} set={racesetter('ground')} />
                            <WeatherSelect value={racedef.weather} set={racesetter('weather')} />
                        </div>
                        <SeasonSelect value={racedef.season} set={racesetter('season')} />
                    </div>
                </div>
                {finalResultsPane}
                {expanded && <div id="umaPane" />}
                <div id={expanded ? 'umaOverlay' : 'umaPane'}>
                    <div class={!expanded && currentIdx == 0 ? 'selected' : ''}>
                        <HorseDef key={uma1.outfitId} state={uma1} setState={setUma1} courseDistance={course.distance} tabstart={() => 4} onResetAll={resetAllUmas}>
                            {expanded ? 'Umamusume 1' : umaTabs}
                        </HorseDef>
                    </div>
                    {expanded &&
                        <div id="copyUmaButtons">
                            <div id="copyUmaToRight" title="Copy uma 1 to uma 2" onClick={copyUmaToRight} />
                            <div id="copyUmaToLeft" title="Copy uma 2 to uma 1" onClick={copyUmaToLeft} />
                            <div id="swapUmas" title="Swap umas" onClick={swapUmas}>⮂</div>
                        </div>}
                    {mode == Mode.Compare && <div class={!expanded && currentIdx == 1 ? 'selected' : ''}>
                        <HorseDef key={uma2.outfitId} state={uma2} setState={setUma2} courseDistance={course.distance} tabstart={() => 4 + horseDefTabs()} onResetAll={resetAllUmas}>
                            {expanded ? 'Umamusume 2' : umaTabs}
                        </HorseDef>
                    </div>}
                    {posKeepMode == 2 /* Virtual */ && <div class={!expanded && currentIdx == 2 ? 'selected' : ''}>
                        <HorseDef key={pacer.outfitId} state={pacer} setState={setPacer} courseDistance={course.distance} tabstart={() => 4 + (mode == Mode.Compare ? 2 : 1) * horseDefTabs()} onResetAll={resetAllUmas}>
                            {expanded ? 'Virtual Pacemaker' : umaTabs}
                        </HorseDef>
                    </div>}
                    {expanded && <div id="closeUmaOverlay" title="Close panel" onClick={toggleExpand}>✕</div>}
                </div>
                {popoverSkill && <BasinnChartPopover skillid={popoverSkill} results={tableData.get(popoverSkill).results} courseDistance={course.distance} />}
                <WitVarianceSettingsPopup
                    show={showWitVarianceSettings}
                    onClose={() => setShowWitVarianceSettings(false)}
                    {...witVarianceProps}
                />
            </IntlProvider>
        </Language.Provider>
    );
}

