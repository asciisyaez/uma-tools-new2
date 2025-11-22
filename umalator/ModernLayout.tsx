import { h, Fragment } from 'preact';
import { IntlProvider } from 'preact-i18n';
import { RaceTrack, TrackSelect } from '../components/RaceTrack';
import { ModernHorseDef as HorseDef, horseDefTabs } from '../components/ModernHorseDef';
import { Language } from '../components/Language';
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
import './ModernLayout.css';

export function ModernLayout(props: LayoutProps) {
    // #region agent log
    try {
        fetch('http://127.0.0.1:7242/ingest/55378581-5a28-41f0-af92-85de3c6247dc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'umalator/ModernLayout.tsx:22',message:'ModernLayout Render Start',data:{width:window.innerWidth, mode: props.mode},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'hyp_stale_deploy'})}).catch(()=>{});
        console.log('ModernLayout v2.1 rendering', {width: window.innerWidth});
    } catch (e) {}
    // #endregion
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
            {mode == Mode.Compare && <div class={`umaTab ${currentIdx == 1 ? 'selected' : ''}`} onClick={() => updateUiState(UiStateMsg.SetCurrentIdx1)}>Umamusume 2{posKeepMode != 2 && <div id="expandBtn" title="Expand panel" onClick={toggleExpand} />}</div>}
            {posKeepMode == 2 && <div class={`umaTab ${currentIdx == 2 ? 'selected' : ''}`} onClick={() => updateUiState(UiStateMsg.SetCurrentIdx2)}>Virtual Pacemaker<div id="expandBtn" title="Expand panel" onClick={toggleExpand} /></div>}
        </Fragment>
    );

    return (
        <Language.Provider value={lang}>
            <IntlProvider definition={strings}>
                <div className="modern-layout-container">
                    <div className="main-content-row">
                        <div className="pane-column" data-pane="UmaPane">
                            <div className="glass-panel uma-panel">
                                <div className={!expanded && currentIdx == 0 ? 'selected-tab-content' : 'hidden-tab-content'}>
                                    <HorseDef key={uma1.outfitId} state={uma1} setState={setUma1} courseDistance={course.distance} tabstart={() => 4} onResetAll={resetAllUmas}>
                                        {expanded ? 'Umamusume 1' : umaTabs}
                                    </HorseDef>
                                </div>
                                
                                {expanded && (
                                    <div className="uma-copy-controls">
                                        <button className="glass-button icon-only" title="Copy uma 1 to uma 2" onClick={copyUmaToRight}>→</button>
                                        <button className="glass-button icon-only" title="Copy uma 2 to uma 1" onClick={copyUmaToLeft}>←</button>
                                        <button className="glass-button icon-only" title="Swap umas" onClick={swapUmas}>⮂</button>
                                    </div>
                                )}

                                {mode == Mode.Compare && (
                                    <div className={!expanded && currentIdx == 1 ? 'selected-tab-content' : 'hidden-tab-content'}>
                                        <HorseDef key={uma2.outfitId} state={uma2} setState={setUma2} courseDistance={course.distance} tabstart={() => 4 + horseDefTabs()} onResetAll={resetAllUmas}>
                                            {expanded ? 'Umamusume 2' : umaTabs}
                                        </HorseDef>
                                    </div>
                                )}

                                {posKeepMode == 2 && (
                                    <div className={!expanded && currentIdx == 2 ? 'selected-tab-content' : 'hidden-tab-content'}>
                                        <HorseDef key={pacer.outfitId} state={pacer} setState={setPacer} courseDistance={course.distance} tabstart={() => 4 + (mode == Mode.Compare ? 2 : 1) * horseDefTabs()} onResetAll={resetAllUmas}>
                                            {expanded ? 'Virtual Pacemaker' : umaTabs}
                                        </HorseDef>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="track-column" data-pane="Track">
                            <div className="glass-panel track-panel">
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

                                <div className="controls-grid">
                                    <div className="control-section run-controls">
                                        <div className="mode-selector glass-input-group">
                                            <label>Mode:</label>
                                            <div className="radio-group">
                                                <label className={mode == Mode.Compare ? 'active' : ''}>
                                                    <input type="radio" name="mode" value="compare" checked={mode == Mode.Compare} onClick={() => updateUiState(UiStateMsg.SetModeCompare)} />
                                                    Compare
                                                </label>
                                                <label className={mode == Mode.Chart ? 'active' : ''}>
                                                    <input type="radio" name="mode" value="chart" checked={mode == Mode.Chart} onClick={() => updateUiState(UiStateMsg.SetModeChart)} />
                                                    Skill Chart
                                                </label>
                                                <label className={mode == Mode.UniquesChart ? 'active' : ''}>
                                                    <input type="radio" name="mode" value="uniques-chart" checked={mode == Mode.UniquesChart} onClick={() => updateUiState(UiStateMsg.SetModeUniquesChart)} />
                                                    Uma Chart
                                                </label>
                                            </div>
                                        </div>

                                        <div className="action-buttons">
                                            {mode == Mode.Compare
                                                ? <button className="glass-button primary" onClick={doComparison} disabled={isSimulationRunning}>COMPARE</button>
                                                : <button className="glass-button primary" onClick={doBasinnChart} disabled={isSimulationRunning}>RUN</button>
                                            }
                                            {mode == Mode.Compare && 
                                                <button className="glass-button secondary" onClick={doRunOnce} disabled={isSimulationRunning}>Run Once</button>
                                            }
                                        </div>

                                        <div className="simulation-params glass-input-group">
                                            <div className="param-row">
                                                <label>Samples:</label>
                                                <input type="number" className="glass-input" min="1" max="10000" value={nsamples} onInput={(e) => setSamples(+e.currentTarget.value)} />
                                            </div>
                                            <div className="param-row seed-row">
                                                <label>Seed:</label>
                                                <div className="input-with-button">
                                                    <input type="number" className="glass-input" value={seed} onInput={(e) => { setSeed(+e.currentTarget.value); setRunOnceCounter(0); }} />
                                                    <button className="icon-button" title="Randomize seed" onClick={() => { setSeed(Math.floor(Math.random() * (-1 >>> 0)) >>> 0); setRunOnceCounter(0); }}>🎲</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="control-section race-settings">
                                        <div className="glass-input-group">
                                            <label>Position Keep:</label>
                                            <select className="glass-select" value={posKeepMode} onInput={(e) => setPosKeepMode(+e.currentTarget.value)}>
                                                <option value={0}>None</option>
                                                <option value={1}>Approximate</option>
                                                <option value={2}>Virtual Pacemaker</option>
                                            </select>
                                        </div>

                                        {posKeepMode == 2 && (
                                            <div className="glass-input-group pacemaker-settings">
                                                <div className="pacemaker-combobox">
                                                    <button
                                                        className="glass-select"
                                                        onClick={() => setIsPacemakerDropdownOpen(!isPacemakerDropdownOpen)}
                                                    >
                                                        {selectedPacemakerIndices.length === 0 ? 'None' :
                                                            selectedPacemakerIndices.length === 1 ? `Pacemaker ${selectedPacemakerIndices[0] + 1}` :
                                                            selectedPacemakerIndices.length === pacemakerCount ? 'All Pacemakers' :
                                                            `${selectedPacemakerIndices.length} Pacemakers`}
                                                        <span className="arrow">▼</span>
                                                    </button>
                                                    {isPacemakerDropdownOpen && (
                                                        <div className="glass-dropdown">
                                                            {[...Array(pacemakerCount)].map((_, index) => (
                                                                <label key={index} className="dropdown-item">
                                                                    <input type="checkbox" checked={selectedPacemakerIndices.includes(index)} onChange={() => togglePacemakerSelection(index)} />
                                                                    <span style={{ color: index === 0 ? '#22c55e' : index === 1 ? '#a855f7' : '#ec4899' }}>
                                                                        Pacemaker {index + 1}
                                                                    </span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="pacemaker-count">
                                                    <label>Count: {pacemakerCount}</label>
                                                    <input type="range" min="1" max="3" value={pacemakerCount} onInput={(e) => handlePacemakerCountChange(+e.currentTarget.value)} />
                                                </div>
                                            </div>
                                        )}

                                        <div className="toggles-row">
                                            <label className="toggle-label">
                                                <input type="checkbox" checked={showHp} onClick={toggleShowHp} /> Show HP
                                            </label>
                                            <label className="toggle-label">
                                                <input type="checkbox" checked={showLanes} onClick={toggleShowLanes} /> Show Lanes
                                            </label>
                                            <div className="wit-variance-toggle">
                                                <label className="toggle-label">
                                                    <input type="checkbox" checked={simWitVariance} onClick={handleSimWitVarianceToggle} /> Wit Variance
                                                </label>
                                                <button className="icon-button settings-btn" onClick={() => setShowWitVarianceSettings(true)} disabled={!simWitVariance} title="Configure">⚙️</button>
                                            </div>
                                        </div>
                                        
                                        <div className="meta-actions">
                                            <button className="text-button" onClick={copyStateUrl}>Copy Link</button>
                                            <RacePresets set={(courseId, racedef) => { setCourseId(courseId); setRaceDef(racedef); }} />
                                        </div>
                                    </div>

                                    <div className="control-section track-settings">
                                        <TrackSelect key={courseId} courseid={courseId} setCourseid={setCourseId} tabindex={2} />
                                        <div className="track-conditions">
                                            <TimeOfDaySelect value={racedef.time} set={racesetter('time')} />
                                            <div className="condition-group">
                                                <GroundSelect value={racedef.ground} set={racesetter('ground')} />
                                                <WeatherSelect value={racedef.weather} set={racesetter('weather')} />
                                            </div>
                                            <SeasonSelect value={racedef.season} set={racesetter('season')} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {resultsContent && (
                                <div className="glass-panel results-pane">
                                    {resultsContent}
                                </div>
                            )}
                        </div>
                    </div>

                    {expanded && (
                        <div className="uma-overlay glass-panel">
                            <button className="close-overlay" onClick={toggleExpand}>×</button>
                            {/* Overlay content replicates the structure but in a wider view */}
                            <div className="overlay-column">
                                <HorseDef key={uma1.outfitId} state={uma1} setState={setUma1} courseDistance={course.distance} tabstart={() => 4} onResetAll={resetAllUmas}>
                                    Umamusume 1
                                </HorseDef>
                            </div>
                            <div className="overlay-controls">
                                <div id="copyUmaButtons">
                                    <div id="copyUmaToRight" title="Copy uma 1 to uma 2" onClick={copyUmaToRight} />
                                    <div id="copyUmaToLeft" title="Copy uma 2 to uma 1" onClick={copyUmaToLeft} />
                                    <div id="swapUmas" title="Swap umas" onClick={swapUmas}>⮂</div>
                                </div>
                            </div>
                            {mode == Mode.Compare && (
                                <div className="overlay-column">
                                    <HorseDef key={uma2.outfitId} state={uma2} setState={setUma2} courseDistance={course.distance} tabstart={() => 4 + horseDefTabs()} onResetAll={resetAllUmas}>
                                        Umamusume 2
                                    </HorseDef>
                                </div>
                            )}
                            {posKeepMode == 2 && (
                                <div className="overlay-column">
                                    <HorseDef key={pacer.outfitId} state={pacer} setState={setPacer} courseDistance={course.distance} tabstart={() => 4 + (mode == Mode.Compare ? 2 : 1) * horseDefTabs()} onResetAll={resetAllUmas}>
                                        Virtual Pacemaker
                                    </HorseDef>
                                </div>
                            )}
                        </div>
                    )}

                    {popoverSkill && <BasinnChartPopover skillid={popoverSkill} results={tableData.get(popoverSkill).results} courseDistance={course.distance} />}
                    
                    <WitVarianceSettingsPopup
                        show={showWitVarianceSettings}
                        onClose={() => setShowWitVarianceSettings(false)}
                        {...witVarianceProps}
                    />
                </div>
            </IntlProvider>
        </Language.Provider>
    );
}

