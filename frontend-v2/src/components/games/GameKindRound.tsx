"use client";

import { useEffect, useRef, useState } from "react";
import { GAME_KIND_REGISTRY, type AnyRound, type GameKind, type RoundResponse } from "@/lib/game-kind-registry";

type Props = { round: AnyRound; onAnswer: (answer: RoundResponse) => void };
const btn = "rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm transition hover:border-cyan-300/50 hover:bg-cyan-300/10";
const title = "mb-8 text-center text-xl font-medium leading-relaxed sm:text-2xl";

export default function GameKindRound({ round, onAnswer }: Props) {
  const [chosen, setChosen] = useState<number[]>([]);
  const [shown, setShown] = useState(-1);
  const [revealing, setRevealing] = useState(true);
  const [ready, setReady] = useState(false);
  const [reaction, setReaction] = useState<number | null>(null);
  const pressRef = useRef<number[]>([]);
  const kind = round.kind as GameKind;
  const label = GAME_KIND_REGISTRY[kind].label;

  useEffect(() => {
    if (kind === "sequence_memory" || kind === "path_tracking") {
      const sequence = (kind === "sequence_memory" ? round.sequence : round.path) as Array<string | number>;
      let i = 0;
      const timer = window.setInterval(() => {
        if (i >= sequence.length) { window.clearInterval(timer); window.setTimeout(() => { setShown(-1); setRevealing(false); }, 250); return; }
        setShown(i++);
      }, 700);
      return () => window.clearInterval(timer);
    }
    if (kind === "reaction_time") {
      const timer = window.setTimeout(() => { setReady(true); window.__gameReactionStart = performance.now(); }, Number(round.targetDelayMs));
      return () => window.clearTimeout(timer);
    }
    if (kind === "go_no_go") {
      const stimuli = round.stimuli as string[];
      let i = -1;
      pressRef.current = [];
      const timer = window.setInterval(() => {
        i += 1;
        if (i >= stimuli.length) { window.clearInterval(timer); onAnswer(pressRef.current); return; }
        setShown(i);
      }, 800);
      return () => window.clearInterval(timer);
    }
  }, [kind, round, onAnswer]);

  if (kind === "sequence_memory") {
    const sequence = round.sequence as string[]; const choices = round.choices as string[];
    if (revealing) return <div className="flex min-h-[350px] flex-col items-center justify-center"><p className="text-sm text-slate-400">Remember this sequence</p><div className="mt-8 rounded-2xl bg-cyan-300/10 px-10 py-8 text-4xl font-bold text-cyan-100">{shown < 0 ? "…" : sequence[shown]}</div></div>;
    return <div className="mx-auto flex min-h-[350px] max-w-2xl flex-col justify-center"><h2 className={title}>{round.prompt}</h2><p className="mb-4 text-center text-sm text-slate-400">Tap the tokens in the order shown.</p><div className="grid gap-3 sm:grid-cols-2">{choices.map((choice,i)=><button key={`${choice}-${i}`} className={btn} onClick={()=>{const next=[...chosen,i];setChosen(next);if(next.length===sequence.length)onAnswer(next.map((index)=>choices[index]));}}>{choice}{chosen.filter((x)=>x===i).length>0&&<span className="ml-2 text-cyan-200">{chosen.indexOf(i)+1}</span>}</button>)}</div><button className="mt-4 text-sm text-slate-400" onClick={()=>setChosen([])}>Reset sequence</button></div>;
  }
  if (kind === "path_tracking") {
    const path=round.path as number[];
    if(revealing)return <div className="flex min-h-[350px] flex-col items-center justify-center"><p className="mb-6 text-slate-300">Follow the moving marker</p><div className="grid grid-cols-3 gap-3">{Array.from({length:9},(_,i)=><div key={i} className={`h-16 w-16 rounded-xl border ${shown>=0&&path[shown]===i?"border-rose-200 bg-rose-300 shadow-lg shadow-rose-300/40":"border-white/10 bg-white/5"}`}/>)}</div></div>;
    return <div className="flex min-h-[350px] flex-col items-center justify-center"><h2 className={title}>{round.prompt}</h2><p className="mb-5 text-sm text-slate-400">Select {path.length} cells in the path order.</p><div className="grid grid-cols-3 gap-3">{Array.from({length:9},(_,i)=><button key={i} aria-label={`Path tile ${i+1}`} className={`h-16 w-16 rounded-xl border ${chosen.includes(i)?"border-cyan-200 bg-cyan-300/20":"border-white/10 bg-white/5"}`} onClick={()=>setChosen((prev)=>prev.length<path.length?[...prev,i]:prev)}>{chosen.includes(i)?chosen.indexOf(i)+1:""}</button>)}</div><button disabled={chosen.length!==path.length} className="mt-5 rounded-xl bg-cyan-300 px-5 py-2 font-semibold text-slate-950 disabled:opacity-40" onClick={()=>onAnswer(chosen)}>Check path</button></div>;
  }
  if(kind === "target_detection") {
    const items=round.items as string[];const target=String(round.target);
    const toggle=(i:number)=>setChosen((p)=>p.includes(i)?p.filter((x)=>x!==i):[...p,i]);
    return <div className="mx-auto flex min-h-[350px] max-w-2xl flex-col justify-center"><h2 className={title}>{round.prompt}</h2><p className="mb-5 text-center text-sm text-slate-400">Select every <strong className="text-cyan-200">{target}</strong> target.</p><div className="grid grid-cols-4 gap-3">{items.map((item,i)=><button key={i} onClick={()=>toggle(i)} className={`rounded-xl border py-4 text-xl font-semibold ${chosen.includes(i)?"border-cyan-200 bg-cyan-300/20":"border-white/10 bg-white/5"}`}>{item}</button>)}</div><button className="mt-6 self-center rounded-xl bg-cyan-300 px-5 py-2 font-semibold text-slate-950" onClick={()=>onAnswer(chosen.sort((a,b)=>a-b))}>Submit targets</button></div>;
  }
  if(kind === "match_mismatch") return <div className="flex min-h-[350px] flex-col items-center justify-center"><h2 className={title}>{round.prompt}</h2><div className="mb-8 flex gap-8 text-3xl font-mono"><span className="rounded-xl bg-white/5 p-6">{String(round.stimulusA)}</span><span className="rounded-xl bg-white/5 p-6">{String(round.stimulusB)}</span></div><div className="flex gap-4"><button className={btn} onClick={()=>onAnswer(true)}>Match</button><button className={btn} onClick={()=>onAnswer(false)}>Mismatch</button></div></div>;
  if(kind === "reaction_time") return <div className="flex min-h-[350px] flex-col items-center justify-center"><h2 className={title}>{round.prompt}</h2><button disabled={!ready} className={`h-44 w-44 rounded-full text-lg font-bold transition ${ready?"animate-pulse bg-emerald-400 text-slate-950":"bg-white/10 text-slate-500"}`} onClick={()=>{if(!ready){onAnswer({reactionMs:-1});return;}const ms=Math.round(performance.now()-(window.__gameReactionStart||performance.now()));setReaction(ms);onAnswer({reactionMs:ms});}}>{ready?"TARGET · TAP":"WAIT"}</button>{reaction!==null&&<p className="mt-4">{reaction} ms</p>}</div>;
  if(kind === "go_no_go") {const stimuli=round.stimuli as string[];return <div className="flex min-h-[350px] flex-col items-center justify-center"><p className="mb-4 text-xs uppercase tracking-widest text-slate-400">Tap only for: {String(round.goStimulus)}</p><div className="flex h-40 w-64 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-4xl font-bold">{shown>=0?stimuli[shown]:"Ready"}</div><p className="mt-3 text-sm text-slate-400">{Math.min(shown+1,stimuli.length)} / {stimuli.length}</p>{shown>=0&&<button className="mt-5 rounded-xl bg-cyan-300 px-7 py-3 font-semibold text-slate-950" onClick={()=>{if(!pressRef.current.includes(shown))pressRef.current.push(shown);}}>Tap</button>}</div>; }

  const choices=round.choices as string[];
  const heading = kind === "number_series" ? (round.sequence as number[]).join(", ")+", ?" : kind === "pattern_completion" ? (round.pattern as string[]).join(" ")+"  ?" : kind === "rule_switching" ? `${String(round.instruction)} · ${String(round.stimulus)}` : kind === "spatial_rotation" ? (round.shape as string[]).join("\n") : kind === "rapid_classification" ? String(round.stimulus) : kind === "coding_decoding" ? `${String(round.instruction)} · ${String(round.encoded)}` : String(round.prompt);
  return <div className="mx-auto flex min-h-[350px] max-w-2xl flex-col justify-center"><p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{label}</p><h2 className={title}>{String(round.prompt)}</h2><div className="mb-6 whitespace-pre-line text-center text-2xl font-semibold">{heading}</div><div className="grid gap-3 sm:grid-cols-2">{choices.map((option,i)=><button key={`${option}-${i}`} className={btn} onClick={()=>onAnswer(i)}>{option}</button>)}</div></div>;
}

declare global { interface Window { __gameReactionStart?: number } }
