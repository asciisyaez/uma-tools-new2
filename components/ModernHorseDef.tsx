import { h, Fragment } from 'preact';
import { useState, useReducer, useMemo, useEffect, useRef } from 'preact/hooks';
import { Set as ImmSet } from 'immutable';

import { SkillList, Skill, ExpandedSkillDetails } from '../components/SkillList';
import { HorseState, SkillSet } from './HorseDefTypes';
import './ModernHorseDef.css';

import umas from '../umas.json';
import icons from '../icons.json';
import skills from '../uma-skill-tools/data/skill_data.json';

// @ts-ignore
declare const CC_GLOBAL: boolean;

function skilldata(id: string) {
    return skills[id.split('-')[0]];
}

const umaAltIds = Object.keys(umas).flatMap(id => Object.keys(umas[id].outfits));
const umaNamesForSearch: Record<string, string> = {};
umaAltIds.forEach(id => {
    const u = umas[id.slice(0, 4)];
    umaNamesForSearch[id] = (u.outfits[id] + ' ' + u.name[1]).toUpperCase().replace(/\./g, '');
});

function searchNames(query: string) {
    const q = query.toUpperCase().replace(/\./g, '');
    return umaAltIds.filter(oid => umaNamesForSearch[oid].indexOf(q) > -1);
}

function ModernUmaSelector(props: any) {
    const randomMob = useMemo(() => `/uma-tools-new2/icons/mob/trained_mob_chr_icon_${8000 + Math.floor(Math.random() * 624)}_000001_01.png`, []);
    const u = props.value && umas[props.value.slice(0, 4)];

    const input = useRef<HTMLInputElement>(null);
    const suggestionsContainer = useRef<HTMLUListElement>(null);
    const [open, setOpen] = useState(false);
    const [activeIdx, setActiveIdx] = useState(-1);

    function update(q: string) {
        return { input: q, suggestions: searchNames(q) };
    }
    const [query, search] = useReducer((_, q) => update(q), u && u.name[1], update);

    function confirm(oid: string) {
        setOpen(false);
        props.select(oid);
        const uname = umas[oid.slice(0, 4)].name[1];
        search(uname);
        setActiveIdx(-1);
        if (input.current != null) {
            input.current.value = uname;
            input.current.blur();
        }
    }

    function focus() {
        input.current && input.current.select();
    }

    function setActiveAndScroll(idx: number) {
        setActiveIdx(idx);
        if (!suggestionsContainer.current) return;
        const container = suggestionsContainer.current;
        const li = container.querySelector(`[data-uma-id="${query.suggestions[idx]}"]`) as HTMLElement;
        if (!li) return;
        const ch = container.offsetHeight - 4;
        if (li.offsetTop < container.scrollTop) {
            container.scrollTop = li.offsetTop;
        } else if (li.offsetTop >= container.scrollTop + ch) {
            const h = li.offsetHeight;
            container.scrollTop = (li.offsetTop / h - (ch / h - 1)) * h;
        }
    }

    function handleClick(e: any) {
        const li = e.target.closest('.modern-suggestion-item');
        if (li == null) return;
        e.stopPropagation();
        confirm(li.dataset.umaId);
    }

    function handleInput(e: any) {
        search(e.target.value);
    }

    function handleKeyDown(e: any) {
        const l = query.suggestions.length;
        switch (e.keyCode) {
            case 13:
                if (activeIdx > -1) confirm(query.suggestions[activeIdx]);
                break;
            case 38:
                setActiveAndScroll((activeIdx - 1 + l) % l);
                break;
            case 40:
                setActiveAndScroll((activeIdx + 1 + l) % l);
                break;
        }
    }

    function handleBlur(e: any) {
        if (e.target.value.length == 0) props.select('');
        setOpen(false);
    }

    return (
        <div className="modern-uma-selector">
            <div className="modern-uma-icon" onClick={focus}>
                <img src={props.value ? icons[props.value] : randomMob} />
            </div>
            <div className="modern-uma-details">
                {props.children}
                <div className="modern-uma-input-wrapper">
                    <input
                        type="text"
                        className="modern-uma-input"
                        value={query.input}
                        tabIndex={props.tabindex}
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setOpen(true)}
                        onBlur={handleBlur}
                        ref={input}
                    />
                    <ul className={`modern-suggestions ${open ? 'open' : ''}`} onMouseDown={handleClick} ref={suggestionsContainer}>
                        {query.suggestions.map((oid: string, i: number) => {
                            const uid = oid.slice(0, 4);
                            return (
                                <li key={oid} data-uma-id={oid} className={`modern-suggestion-item ${i == activeIdx ? 'selected' : ''}`}>
                                    <img src={icons[oid]} /><span>{umas[uid].outfits[oid]} {umas[uid].name[1]}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="modern-uma-epithet">
                    {props.value && u.outfits[props.value]}
                </div>
                <div className="modern-reset-group">
                    {props.onReset && <button className="modern-reset-btn" onClick={props.onReset} title="Reset this horse">Reset</button>}
                    {props.onResetAll && <button className="modern-reset-btn" onClick={props.onResetAll} title="Reset all horses">Reset All</button>}
                </div>
            </div>
        </div>
    );
}

function rankForStat(x: number) {
    if (x > 1200) {
        return Math.min(18 + Math.floor((x - 1200) / 100) * 10 + Math.floor(x / 10) % 10, 97);
    } else if (x >= 1150) {
        return 17;
    } else if (x >= 1100) {
        return 16;
    } else if (x >= 400) {
        return 8 + Math.floor((x - 400) / 100);
    } else {
        return Math.floor(x / 50);
    }
}

function ModernStat(props: any) {
    return (
        <div className="modern-stat-item">
            <div className="modern-stat-header">
                <img src={props.icon} />
                <span>{props.label}</span>
            </div>
            <div className="modern-stat-value">
                <img src={`/uma-tools-new2/icons/statusrank/ui_statusrank_${(100 + rankForStat(props.value)).toString().slice(1)}.png`} />
                <input type="number" min="1" max="2000" value={props.value} tabIndex={props.tabindex} onInput={(e) => props.change(+e.currentTarget.value)} />
            </div>
        </div>
    );
}

const APTITUDES = Object.freeze(['S', 'A', 'B', 'C', 'D', 'E', 'F', 'G']);
function AptitudeIcon(props: any) {
    const idx = 7 - APTITUDES.indexOf(props.a);
    return <img src={`/uma-tools-new2/icons/utx_ico_statusrank_${(100 + idx).toString().slice(1)}.png`} style={{ height: '1.2em' }} />;
}

function ModernAptitudeSelect(props: any) {
    const [open, setOpen] = useState(false);
    function setAptitude(e: any) {
        e.stopPropagation();
        props.setA(e.currentTarget.dataset.horseAptitude);
        setOpen(false);
    }
    function selectByKey(e: KeyboardEvent) {
        const k = e.key.toUpperCase();
        if (APTITUDES.indexOf(k) > -1) {
            props.setA(k);
        }
    }
    return (
        <div className="modern-select-dropdown" tabIndex={props.tabindex} onClick={() => setOpen(!open)} onBlur={() => setOpen(false)} onKeyDown={selectByKey as any}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <AptitudeIcon a={props.a} /> <span style={{ fontSize: '0.8em', opacity: 0.7 }}>▼</span>
            </div>
            {open && (
                <ul>
                    {APTITUDES.map(a => <li key={a} data-horse-aptitude={a} onClick={setAptitude}><AptitudeIcon a={a} /></li>)}
                </ul>
            )}
        </div>
    );
}

function ModernMoodSelect(props: any) {
    const [open, setOpen] = useState(false);
    const moodValues = [
        { value: 2, icon: 'utx_ico_motivation_m_04', label: 'Great' },
        { value: 1, icon: 'utx_ico_motivation_m_03', label: 'Good' },
        { value: 0, icon: 'utx_ico_motivation_m_02', label: 'Normal' },
        { value: -1, icon: 'utx_ico_motivation_m_01', label: 'Bad' },
        { value: -2, icon: 'utx_ico_motivation_m_00', label: 'Awful' }
    ];

    function setMood(e: any) {
        e.stopPropagation();
        props.setM(+e.currentTarget.dataset.mood);
        setOpen(false);
    }

    return (
        <div className="modern-select-dropdown" tabIndex={props.tabindex} onClick={() => setOpen(!open)} onBlur={() => setOpen(false)}>
            <span>
                <img src={`/uma-tools-new2/icons/global/${moodValues.find(m => m.value === props.m)?.icon}.png`} style={{ height: '1.2em' }} />
            </span>
            {open && (
                <ul style={{ minWidth: '60px' }}>
                    {moodValues.map(mood =>
                        <li key={mood.value} data-mood={mood.value} onClick={setMood}>
                            <img src={`/uma-tools-new2/icons/global/${mood.icon}.png`} title={mood.label} style={{ height: '1.2em' }} />
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}

function ModernStrategySelect(props: any) {
    const disabled = props.disabled || false;
    return (
        <div className="modern-select-dropdown">
            <select
                value={props.s}
                tabIndex={props.tabindex}
                disabled={disabled}
                onInput={(e) => props.setS(e.currentTarget.value)}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'inherit',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    textAlign: 'right',
                    appearance: 'none',
                    paddingRight: '15px'
                }}
            >
                {CC_GLOBAL
                    ? <>
                        <option value="Oonige">Runaway</option>
                        <option value="Nige">Front Runner</option>
                        <option value="Senkou">Pace Chaser</option>
                        <option value="Sasi">Late Surger</option>
                        <option value="Oikomi">End Closer</option>
                    </>
                    : <>
                        <option value="Nige">逃げ</option>
                        <option value="Senkou">先行</option>
                        <option value="Sasi">差し</option>
                        <option value="Oikomi">追込</option>
                        <option value="Oonige">大逃げ</option>
                    </>
                }
            </select>
            <span style={{ position: 'absolute', right: 0, top: '2px', pointerEvents: 'none', fontSize: '0.8em', opacity: 0.7 }}>▼</span>
        </div>
    );
}

const nonUniqueSkills = Object.keys(skills).filter(id => skilldata(id).rarity < 3 || skilldata(id).rarity > 5);

function assertIsSkill(sid: string): asserts sid is keyof typeof skills {
    // console.assert(skilldata(sid) != null);
}

function uniqueSkillForUma(oid: string): keyof typeof skills {
    const i = +oid.slice(1, -2), v = +oid.slice(-2);
    const sid = (100000 + 10000 * (v - 1) + i * 10 + 1).toString();
    assertIsSkill(sid);
    return sid as keyof typeof skills;
}

let totalTabs = 0;
export function horseDefTabs() {
    return totalTabs;
}

export function ModernHorseDef(props: any) {
    const { state, setState } = props;
    const [skillPickerOpen, setSkillPickerOpen] = useState(false);
    const [expanded, setExpanded] = useState(() => ImmSet<string>());

    const tabstart = props.tabstart();
    let tabi = 0;
    function tabnext() {
        if (++tabi > totalTabs) totalTabs = tabi;
        return tabstart + tabi - 1;
    }

    const umaId = state.outfitId;
    const selectableSkills = useMemo(() => nonUniqueSkills.filter(id => skilldata(id).rarity != 6 || id.startsWith(umaId)), [umaId]);

    function setter(prop: keyof HorseState) {
        return (x: any) => setState(state.set(prop, x));
    }
    const setSkills = setter('skills');

    function setUma(id: string) {
        let newSkills = state.skills.filter((id: string) => skilldata(id).rarity < 3);
        if (id) newSkills = newSkills.add(uniqueSkillForUma(id));
        setState(
            state.set('outfitId', id)
                .set('skills', newSkills)
        );
    }

    function resetThisHorse() {
        setState(new HorseState());
    }

    function openSkillPicker(e: any) {
        e.stopPropagation();
        setSkillPickerOpen(true);
    }

    function setSkillsAndClose(ids: any) {
        setSkills(SkillSet(ids));
        setSkillPickerOpen(false);
    }

    function handleSkillClick(e: any) {
        e.stopPropagation();
        if (e.target.classList.contains('forcedPositionInput')) {
            return;
        }
        const se = e.target.closest('.modern-skill-item, .expandedSkill');
        if (se == null) return;
        const skillId = se.dataset.skillid;
        if (!skillId) return;

        if (e.target.classList.contains('skillDismiss')) {
            setSkills(state.skills.delete(skillId));
        } else if (se.classList.contains('expandedSkill') || expanded.has(skillId)) {
            setExpanded(expanded.delete(skillId));
        } else {
            setExpanded(expanded.add(skillId));
        }
    }

    function handlePositionChange(skillId: string, value: string) {
        const numValue = parseFloat(value);
        if (value === '' || isNaN(numValue)) {
            setState(state.set('forcedSkillPositions', state.forcedSkillPositions.delete(skillId)));
        } else {
            setState(state.set('forcedSkillPositions', state.forcedSkillPositions.set(skillId, numValue)));
        }
    }

    const hasRunawaySkill = state.skills.has('202051');
    useEffect(function () {
        if (hasRunawaySkill && state.strategy !== 'Oonige') {
            setState(state.set('strategy', 'Oonige'));
        }
    }, [hasRunawaySkill, state.strategy]);

    const skillList = useMemo(function () {
        const u = uniqueSkillForUma(umaId);
        return Array.from(state.skills).map((id: any) =>
            expanded.has(id)
                ? <li key={id} className="modern-skill-item expandedSkill" data-skillid={id}>
                    <ExpandedSkillDetails
                        id={id}
                        distanceFactor={props.courseDistance}
                        dismissable={id != u}
                        forcedPosition={state.forcedSkillPositions.get(id) || ''}
                        onPositionChange={(value: string) => handlePositionChange(id, value)}
                    />
                </li>
                : <li key={id} className="modern-skill-item" data-skillid={id} style={{ position: 'relative' }}>
                    <Skill id={id} selected={false} dismissable={id != u} />
                    {state.forcedSkillPositions.has(id) && (
                        <span className="forcedPositionLabel inline" style={{
                            position: 'absolute', right: '5px', bottom: '-10px',
                            background: 'rgba(121, 64, 22, 0.1)', padding: '2px 6px',
                            borderRadius: '3px', fontSize: '0.8em', pointerEvents: 'none'
                        }}>
                            @{state.forcedSkillPositions.get(id)}m
                        </span>
                    )}
                </li>
        );
    }, [state.skills, umaId, expanded, props.courseDistance, state.forcedSkillPositions]);

    return (
        <div className="modern-horse-def">
            <div className="modern-horse-header">{props.children}</div>
            
            <ModernUmaSelector value={umaId} select={setUma} tabindex={tabnext()} onReset={resetThisHorse} onResetAll={props.onResetAll}>
                {/* Children of UmaSelector if any, or we pass standard content */}
            </ModernUmaSelector>

            <div className="modern-stats-grid">
                <ModernStat icon="/uma-tools-new2/icons/status_00.png" label="Speed" value={state.speed} change={setter('speed')} tabindex={tabnext()} />
                <ModernStat icon="/uma-tools-new2/icons/status_01.png" label="Stamina" value={state.stamina} change={setter('stamina')} tabindex={tabnext()} />
                <ModernStat icon="/uma-tools-new2/icons/status_02.png" label="Power" value={state.power} change={setter('power')} tabindex={tabnext()} />
                <ModernStat icon="/uma-tools-new2/icons/status_03.png" label="Guts" value={state.guts} change={setter('guts')} tabindex={tabnext()} />
                <ModernStat icon="/uma-tools-new2/icons/status_04.png" label={CC_GLOBAL ? 'Wit' : 'Wisdom'} value={state.wisdom} change={setter('wisdom')} tabindex={tabnext()} />
            </div>

            <div className="modern-aptitudes-grid">
                <div className="modern-aptitude-item">
                    <span className="modern-aptitude-label">Surface:</span>
                    <ModernAptitudeSelect a={state.surfaceAptitude} setA={setter('surfaceAptitude')} tabindex={tabnext()} />
                </div>
                <div className="modern-aptitude-item">
                    <span className="modern-aptitude-label">Distance:</span>
                    <ModernAptitudeSelect a={state.distanceAptitude} setA={setter('distanceAptitude')} tabindex={tabnext()} />
                </div>
                <div className="modern-aptitude-item">
                    <span className="modern-aptitude-label">Mood:</span>
                    <ModernMoodSelect m={state.mood} setM={setter('mood')} tabindex={tabnext()} />
                </div>
                <div className="modern-aptitude-item">
                    <span className="modern-aptitude-label">{CC_GLOBAL ? 'Style:' : 'Strategy:'}</span>
                    <ModernStrategySelect s={state.strategy} setS={setter('strategy')} disabled={hasRunawaySkill} tabindex={tabnext()} />
                </div>
                <div className="modern-aptitude-item">
                    <span className="modern-aptitude-label">{CC_GLOBAL ? 'Style Apt:' : 'Strategy Apt:'}</span>
                    <ModernAptitudeSelect a={state.strategyAptitude} setA={setter('strategyAptitude')} tabindex={tabnext()} />
                </div>
            </div>

            <div className="modern-skills-section">
                <div className="modern-skills-header">Skills</div>
                <ul className="modern-skills-list" onClick={handleSkillClick}>
                    {skillList}
                    <li key="add">
                        <div className="modern-add-skill" onClick={openSkillPicker} tabIndex={tabnext()}>
                            <span style={{ fontSize: '1.5em' }}>+</span> Add Skill
                        </div>
                    </li>
                </ul>
            </div>

            {/* Reuse existing skill picker structure or adapt it */}
            <div className={`horseSkillPickerOverlay ${skillPickerOpen ? "open" : ""}`} onClick={() => setSkillPickerOpen(false)} />
            <div className={`horseSkillPickerWrapper ${skillPickerOpen ? "open" : ""}`} style={{ zIndex: 1000 }}>
                <SkillList ids={selectableSkills} selected={new ImmSet(state.skills)} setSelected={setSkillsAndClose} isOpen={skillPickerOpen} />
            </div>
        </div>
    );
}
