"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Copy, RotateCcw, Sparkles } from "lucide-react";
import { packs, labels, Dimension } from "@/lib/packs";
import { profileSignals, ScoreMap, scorePack } from "@/lib/scoring";
import { researchNotes } from "@/lib/research";

type Screen = "landing" | "questions" | "reveal" | "profile";
type CompletedTell = { packIndex: number; title: string; body: string };
type Saved = { packIndex: number; questionIndex: number; answers: number[]; completed: number[]; tells: CompletedTell[]; totals: ScoreMap; screen: Screen };
const empty: Saved = { packIndex: 0, questionIndex: 0, answers: [], completed: [], tells: [], totals: {}, screen: "landing" };
const storageKey = "tells-a-lot-v5";

function personalityFor(signals: readonly (readonly [Dimension, number])[]) {
  const strongest = new Set(signals.slice(0, 3).map(([dimension]) => dimension));
  if (strongest.has("optimization") && strongest.has("control")) return { name: "the practical optimiser", body: "You identify inefficient processes quickly and prefer to retain influence over how they are corrected." };
  if (strongest.has("planning") && strongest.has("detail")) return { name: "the structured planner", body: "Preparation and close attention support the way you approach ordinary decisions." };
  if (strongest.has("novelty") && strongest.has("risk")) return { name: "the exploratory risk-taker", body: "New experiences hold strong appeal, even when their outcomes cannot be predicted with confidence." };
  if (strongest.has("social") && strongest.has("conflict")) return { name: "the socially assertive observer", body: "You detect changes in group behaviour and are willing to address a problem directly." };
  if (strongest.has("decision") && strongest.has("rules")) return { name: "the decisive pragmatist", body: "Clear standards support your decisions, which are usually made without prolonged comparison." };
  if (strongest.has("uncertainty") && strongest.has("planning")) return { name: "the prepared realist", body: "Advance planning helps you manage situations in which important information remains uncertain." };
  return { name: "the mixed profile", body: "Your strongest signals reflect several behavioural tendencies with no single dominant pattern." };
}

export default function Home() {
  const [state, setState] = useState<Saved>(empty);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) try {
      const parsed = JSON.parse(saved);
      setState({ ...empty, ...parsed, tells: parsed.tells ?? [] });
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(storageKey, JSON.stringify(state)); }, [state, ready]);
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
    const totals = { ...s.totals, [packs[s.packIndex].id]: scored.normalizedScore };
    const completed = [...s.completed, s.packIndex];
    const tells = [...(s.tells ?? []), { packIndex: s.packIndex, title: scored.reveal.title, body: scored.reveal.body }];
    return completed.length >= packs.length ? { ...s, totals, completed, tells, screen: "profile" } : { ...s, totals, completed, tells, packIndex: s.packIndex + 1, questionIndex: 0, answers: [], screen: "questions" };
  });
  const share = async () => { const ranked = profileSignals(state.totals); const top = ranked.slice(0, 3).map(([d]) => labels[d]).join(" · "); const personality = personalityFor(ranked); const text = `tellsalotaboutyou\n\nmy personality: ${personality.name}\nmy strongest signals: ${top}`; try { if (navigator.share) await navigator.share({ title: "tellsalotaboutyou", text }); else { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1800); } } catch {} };
  const reset = () => { localStorage.removeItem(storageKey); setState(empty); };
  if (!ready) return <main className="app-shell" />;

  if (state.screen === "landing") return <main className="app-shell landing"><div className="orb orb-one"/><div className="orb orb-two"/><section className="landing-inner"><p className="eyebrow"><span className="pulse"/> an experiment in small signals</p><h1>tells<br/>a lot<br/><em>about you.</em></h1><button className="start-button" onClick={start}>start <ArrowRight size={18}/></button></section><footer>answer quickly. there are no right answers.</footer></main>;

  if (state.screen === "profile") {
    const signals = profileSignals(state.totals).slice(0, 5);
    const personality = personalityFor(signals);
    return <main className="app-shell profile"><header className="top"><button className="brand" onClick={reset}>tellsalotaboutyou</button><button className="reset" onClick={reset}><RotateCcw size={15}/> begin again</button></header><section className="profile-content"><p className="eyebrow">all twelve signals, considered together</p><h1>you tell us a lot<br/><em>without saying much.</em></h1><div className="personality-card"><span>your personality</span><h2>{personality.name}</h2><p>{personality.body}</p></div><div className="profile-grid"><div className="signals"><h2>your strongest signals</h2>{signals.map(([d, value], i) => <div className="signal" key={d}><div><span>{String(i + 1).padStart(2, "0")}</span>{labels[d]}</div><b>{value}</b><i><i style={{ width: `${value}%` }}/></i></div>)}</div><div className="observations"><span className="star"><Sparkles size={18}/></span><p>{signals[0] && signals[1] ? `You balance ${labels[signals[0][0]].toLowerCase()} with ${labels[signals[1][0]].toLowerCase()}.` : "Your answers made a distinctive pattern."}</p><p>You are more interested in the shape of a situation than its label.</p><p>Small choices are where your preferences show up most clearly.</p></div></div><button className="share-button" onClick={share}>{copied ? "copied" : "share your results"} <Copy size={16}/></button><p className="fine-print profile-note">These are playful hypotheses from a short, non-clinical exercise.</p></section></main>;
  }

  if (state.screen === "reveal" && result) return <main className="app-shell reveal"><header className="top"><button className="brand" onClick={reset}>tellsalotaboutyou</button><div className="header-actions"><span>{state.completed.length + 1} of {packs.length}</span><button className="reset" onClick={reset}><RotateCcw size={14}/> reset</button></div></header><section className="reveal-card"><p className="eyebrow"><span className="pulse"/> your result</p><div className="reveal-number">0{state.completed.length + 1}</div><h1>{result.reveal.title}</h1><p className="reveal-body">{result.reveal.body}</p><button className="next-button" onClick={continueToNext}>{state.completed.length + 1 === packs.length ? "view full profile" : "continue"} <ArrowRight size={18}/></button></section></main>;

  const question = pack.questions[state.questionIndex];
  const answeredHere = state.answers.filter(answer => answer !== undefined).length;
  const totalAnswers = state.completed.length * 5 + answeredHere;
  const nextUnlock = (Math.floor(totalAnswers / 5) + 1) * 5;
  const completedNewest = (state.tells ?? [])
    .map((tell, index) => ({ tell, index }))
    .reverse();

  return (
    <main className="app-shell questions">
      <header className="top">
        <button className="brand" onClick={reset}>tellsalotaboutyou</button>
        <div className="header-actions">
          <div className="progress-label">{state.questionIndex + 1} <span>/ 5</span></div>
          <button className="reset" onClick={reset}><RotateCcw size={14}/> reset</button>
        </div>
      </header>
      <div className="progress"><i style={{ width: `${((state.questionIndex + 1) / 5) * 100}%` }}/></div>
      <section className="question-card" key={`${state.packIndex}-${state.questionIndex}`}>
        <p className="eyebrow">just pick the closest answer</p>
        <h1>{question.text}</h1>
        <div className="answers">
          {question.options.map((option, index) => (
            <button key={option.label} className={state.answers[state.questionIndex] === index ? "selected" : ""} onClick={() => choose(index)}>
              {option.label}<b>↗</b>
            </button>
          ))}
        </div>
        <div className="question-nav">
          <button onClick={previous} disabled={state.questionIndex === 0}><ArrowLeft size={18}/> back</button>
          <button className="continue" onClick={next} disabled={state.answers[state.questionIndex] === undefined}>
            {state.questionIndex === 4 ? "view result" : "forward"} <ArrowRight size={18}/>
          </button>
        </div>
        <div className="unlock">
          <div><span>next tell</span><b>unlocks at {nextUnlock}</b></div>
          <i><i style={{ width: `${Math.min(100, (totalAnswers / nextUnlock) * 100)}%` }}/></i>
        </div>
        <div className="tells-list">
          {completedNewest.map(({ tell, index }) => {
            const tellPack = packs[tell.packIndex];
            return (
              <details className="tell-item" key={`${tell.packIndex}-${index}`}>
                <summary className="tell">
                  <span className="tell-copy"><small>your tell</small>{tell.title}</span>
                  <b><span className="when-closed">expand</span><span className="when-open">close</span></b>
                </summary>
                <article className="tell-detail">
                  <p>{tell.body}</p>
                  <div className="research-note">
                    <b>{researchNotes[tellPack.id].level}</b>
                    <strong>{researchNotes[tellPack.id].construct}</strong>
                    <p>{researchNotes[tellPack.id].basis}</p>
                    <small>{researchNotes[tellPack.id].source}</small>
                  </div>
                </article>
              </details>
            );
          })}
        </div>
      </section>
      <footer>your answers stay on this device</footer>
    </main>
  );
}
