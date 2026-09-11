"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Copy, RotateCcw, Sparkles } from "lucide-react";
import { packs, labels, Dimension } from "@/lib/packs";
import { profileSignals, ScoreMap, scorePack } from "@/lib/scoring";
import { researchNotes } from "@/lib/research";

type Screen = "landing" | "questions" | "reveal" | "profile";
type Saved = { packIndex: number; questionIndex: number; answers: number[]; completed: number[]; totals: ScoreMap; screen: Screen };
const empty: Saved = { packIndex: 0, questionIndex: 0, answers: [], completed: [], totals: {}, screen: "landing" };
const funFindings: Record<Dimension, string> = {
  optimization: "you could find a faster way to boil water.",
  uncertainty: "you can handle chaos—if you get the password.",
  conformity: "the group chat does not make your decisions.",
  planning: "you are already packed for the possibility of rain.",
  control: "surprises are cuter when you approved them first.",
  risk: "you'll take the leap. just show you the landing.",
  social: "you noticed the vibe change three messages ago.",
  detail: "your brain has a zoom lens and it stays on.",
  novelty: "your curiosity has excellent taste.",
  rules: "you respect the rule. then inspect its reasoning.",
  decision: "you do not need fourteen tabs to choose lunch.",
  conflict: "you can say the thing—without making it a thing.",
};
const tellTeasers: Record<Dimension, string> = {
  optimization: "You spot the workaround before the complaint.",
  uncertainty: "Your calm has terms and conditions.",
  conformity: "You do not outsource taste to the group chat.",
  planning: "You pack for the plot twist.",
  control: "You like surprises with a spoiler warning.",
  risk: "You will jump—after checking the landing.",
  social: "You read the room before it finishes talking.",
  detail: "Nothing small is getting past you.",
  novelty: "The unfamiliar option keeps winning you over.",
  rules: "You respect the rule, then inspect it.",
  decision: "You can choose without opening a spreadsheet.",
  conflict: "You can say it without turning it into a scene.",
};

export default function Home() {
  const [state, setState] = useState<Saved>(empty);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openTell, setOpenTell] = useState<number | null>(null);
  useEffect(() => { const saved = localStorage.getItem("tells-a-lot-v1"); if (saved) try { setState(JSON.parse(saved)); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem("tells-a-lot-v1", JSON.stringify(state)); }, [state, ready]);
  const pack = packs[state.packIndex];
  const result = useMemo(() => pack ? scorePack(pack, state.answers) : null, [pack, state.answers]);
  const start = () => setState(s => ({ ...s, screen: "questions" }));
  const choose = (choice: number) => {
    setState(s => { const answers = [...s.answers]; answers[s.questionIndex] = choice; return { ...s, answers }; });
    window.setTimeout(() => setState(s => s.questionIndex === 4 ? { ...s, screen: "reveal" } : { ...s, questionIndex: s.questionIndex + 1 }), 260);
  };
  const next = () => setState(s => s.questionIndex === 4 ? { ...s, screen: "reveal" } : { ...s, questionIndex: s.questionIndex + 1 });
  const previous = () => setState(s => ({ ...s, questionIndex: Math.max(0, s.questionIndex - 1) }));
  const continueToNext = () => setState(s => {
    const scored = scorePack(packs[s.packIndex], s.answers);
    const totals = { ...s.totals }; Object.entries(scored.dimensions).forEach(([d, v]) => totals[d as Dimension] = (totals[d as Dimension] ?? 0) + (v ?? 0));
    const completed = [...s.completed, s.packIndex];
    return completed.length >= packs.length ? { ...s, totals, completed, screen: "profile" } : { ...s, totals, completed, packIndex: s.packIndex + 1, questionIndex: 0, answers: [], screen: "questions" };
  });
  const share = async () => { const top = profileSignals(state.totals).slice(0, 3).map(([d]) => labels[d]).join(" · "); const text = `tellsalotaboutyou\nsmall questions. surprisingly specific observations.\n\nmy strongest signals: ${top}`; try { if (navigator.share) await navigator.share({ title: "tellsalotaboutyou", text }); else { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); } } catch {} };
  const reset = () => { localStorage.removeItem("tells-a-lot-v1"); setState(empty); };
  if (!ready) return <main className="app-shell" />;

  if (state.screen === "landing") return <main className="app-shell landing"><div className="orb orb-one"/><div className="orb orb-two"/><section className="landing-inner"><p className="eyebrow"><span className="pulse"/> an experiment in small signals</p><h1>tells<br/>a lot<br/><em>about you.</em></h1><p className="intro">Five odd little questions. One surprisingly specific observation.</p><button className="start-button" onClick={start}>start <ArrowRight size={18}/></button><p className="fine-print">for reflection and entertainment, not a psychological assessment</p></section><footer>answer quickly. there are no right answers.</footer></main>;

  if (state.screen === "profile") {
    const signals = profileSignals(state.totals).slice(0, 5);
    return <main className="app-shell profile"><header className="top"><button className="brand" onClick={reset}>tellsalotaboutyou</button><button className="reset" onClick={reset}><RotateCcw size={15}/> begin again</button></header><section className="profile-content"><p className="eyebrow">all twelve signals, considered together</p><h1>you tell us a lot<br/><em>without saying much.</em></h1><div className="profile-grid"><div className="signals"><h2>your strongest signals</h2>{signals.map(([d, value], i) => <div className="signal" key={d}><div><span>{String(i + 1).padStart(2, "0")}</span>{labels[d]}</div><b>{value}</b><i><i style={{ width: `${value}%` }}/></i></div>)}</div><div className="observations"><span className="star"><Sparkles size={18}/></span><p>{signals[0] && signals[1] ? `You balance ${labels[signals[0][0]].toLowerCase()} with ${labels[signals[1][0]].toLowerCase()}.` : "Your answers made a distinctive pattern."}</p><p>You are more interested in the shape of a situation than its label.</p><p>Small choices are where your preferences show up most clearly.</p></div></div><button className="share-button" onClick={share}>{copied ? "copied" : "share your results"} <Copy size={16}/></button><p className="fine-print profile-note">These are playful hypotheses from a short, non-clinical exercise.</p></section></main>;
  }

  if (state.screen === "reveal" && result) return <main className="app-shell reveal"><header className="top"><button className="brand" onClick={reset}>tellsalotaboutyou</button><span>{state.completed.length + 1} of {packs.length}</span></header><section className="reveal-card"><p className="eyebrow"><span className="pulse"/> your tiny tells are showing</p><div className="reveal-number">0{state.completed.length + 1}</div><h1>{funFindings[pack.id]}</h1><p className="reveal-body">{result.reveal.body}</p><button className="next-button" onClick={continueToNext}>{state.completed.length + 1 === packs.length ? "see the full picture" : "keep going"} <ArrowRight size={18}/></button><p className="fine-print">{result.reveal.note}</p></section></main>;

  const question = pack.questions[state.questionIndex];
  const answeredHere = state.answers.filter(answer => answer !== undefined).length;
  const totalAnswers = state.completed.length * 5 + answeredHere;
  const nextUnlock = (Math.floor(totalAnswers / 5) + 1) * 5;
  const openPack = openTell === null ? null : packs[state.completed[openTell]];
  return <main className="app-shell questions"><header className="top"><button className="brand" onClick={reset}>tellsalotaboutyou</button><div className="progress-label">{state.questionIndex + 1} <span>/ 5</span></div></header><div className="progress"><i style={{ width: `${((state.questionIndex + 1) / 5) * 100}%` }}/></div><section className="question-card" key={`${state.packIndex}-${state.questionIndex}`}><p className="eyebrow">just pick the closest answer</p><h1>{question.text}</h1><div className="answers">{question.options.map((option, index) => <button key={option.label} className={state.answers[state.questionIndex] === index ? "selected" : ""} onClick={() => choose(index)}><span>{String.fromCharCode(65 + index)}</span>{option.label}<b>↗</b></button>)}</div><div className="question-nav"><button onClick={previous} disabled={state.questionIndex === 0}><ArrowLeft size={18}/> back</button><button className="continue" onClick={next} disabled={state.answers[state.questionIndex] === undefined}>{state.questionIndex === 4 ? "view result" : "forward"} <ArrowRight size={18}/></button></div><div className="tells-list">{state.completed.map((packIndex, index) => <button className={openTell === index ? "tell open" : "tell"} key={packIndex} onClick={() => setOpenTell(openTell === index ? null : index)}><span className="tell-copy"><small>your tell</small>{tellTeasers[packs[packIndex].id]}</span><b>{openTell === index ? "close" : "expand"}</b></button>)}{openPack && <article className="tell-detail"><span>your tell</span><h2>{funFindings[openPack.id]}</h2><p>{openPack.reveal.body}</p><div className="research-note"><b>{researchNotes[openPack.id].level}</b><strong>{researchNotes[openPack.id].construct}</strong><p>{researchNotes[openPack.id].basis}</p><small>{researchNotes[openPack.id].source}</small></div></article>}</div><div className="unlock"><div><span>next tell</span><b>unlocks at {nextUnlock}</b></div><i><i style={{ width: `${Math.min(100, (totalAnswers / nextUnlock) * 100)}%` }}/></i><p>{totalAnswers} small answers collected · another pattern is taking shape</p></div></section><footer>your answers stay on this device</footer></main>;
}
