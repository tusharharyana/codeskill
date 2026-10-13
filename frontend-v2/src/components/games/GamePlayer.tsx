"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock3, RotateCcw, Sparkles, X } from "lucide-react";
import {
  COGNITIVE_GAMES,
  GAME_CHALLENGES,
  evaluateChoice,
  evaluateGrid,
  evaluateMotion,
  type Challenge,
} from "@/lib/cognitive-games";
import { cognitiveGamesAPI } from "@/config/api";
import GameKindRound from "@/components/games/GameKindRound";
import { scoreGameResponse, type RoundResponse } from "@/lib/game-kind-registry";

type Mode = "intro" | "stimulus" | "answer" | "custom" | "feedback" | "complete";
type ManagedGame = { slug: string; title: string; description: string; durationSeconds: number; rounds: Challenge[]; icon: string; color: string };

export default function GamePlayer({ gameId }: { gameId: string }) {
  const [managedGame, setManagedGame] = useState<ManagedGame | null>(null);
  const [gameLoadState, setGameLoadState] = useState<"loading" | "ready" | "missing">("loading");
  const staticGame = COGNITIVE_GAMES.find((item) => item.id === gameId);
  const game = useMemo(() => managedGame ? { ...managedGame, id: managedGame.slug } : staticGame, [managedGame, staticGame]);
  const [mode, setMode] = useState<Mode>("intro");
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [correctRounds, setCorrectRounds] = useState(0);
  const [responses, setResponses] = useState<RoundResponse[]>([]);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [highlightedCell, setHighlightedCell] = useState(-1);
  const [motionLane, setMotionLane] = useState(-1);
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const savedRef = useRef(false);
  const challenges: Challenge[] = managedGame?.rounds || (staticGame ? GAME_CHALLENGES[staticGame.id] : []);
  const gameDurationSeconds = managedGame?.durationSeconds ?? 90;
  const current = challenges[round];

  useEffect(() => {
    let active = true;
    cognitiveGamesAPI.getPublished(gameId).then((response) => { if (active) { setManagedGame(response.data); setGameLoadState("ready"); } }).catch(() => { if (active) setGameLoadState("missing"); });
    return () => { active = false; };
  }, [gameId]);

  useEffect(() => {
    if (!game) return;
    let timer: number;
    try {
      const saved = JSON.parse(localStorage.getItem("codeskill_cognitive_games") || "{}");
      timer = window.setTimeout(() => setBestScore(typeof saved[game.id] === "number" ? saved[game.id] : null), 0);
    } catch {
      timer = window.setTimeout(() => setBestScore(null), 0);
    }
    return () => window.clearTimeout(timer);
  }, [game]);

  useEffect(() => {
    if (mode === "intro" || mode === "complete") return;
    const timer = window.setInterval(() => {
      setSecondsLeft((remaining) => {
        if (remaining <= 1) {
          setMode("complete");
          return 0;
        }
        return remaining - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode]);

  useEffect(() => {
    if (mode !== "stimulus" || !current) return;
    if (current.kind === "grid") {
      let shown = 0;
      const timer = window.setInterval(() => {
        shown += 1;
        if (shown >= current.cells.length) {
          window.clearInterval(timer);
          window.setTimeout(() => {
            setHighlightedCell(-1);
            setMode("answer");
          }, 500);
        } else {
          setHighlightedCell(current.cells[shown]);
        }
      }, 650);
      return () => window.clearInterval(timer);
    }
    if (current.kind === "motion") {
      let shown = 0;
      const timer = window.setInterval(() => {
        shown += 1;
        if (shown >= current.path.length) {
          window.clearInterval(timer);
          window.setTimeout(() => {
            setMotionLane(-1);
            setMode("answer");
          }, 350);
        } else {
          setMotionLane(current.path[shown]);
        }
      }, 420);
      return () => window.clearInterval(timer);
    }
  }, [mode, current]);

  useEffect(() => {
    if (mode !== "complete" || !game || savedRef.current) return;
    savedRef.current = true;
    const score = Math.round((correctRounds / challenges.length) * 100);
    const storageKey = "codeskill_cognitive_games";
    let stored: Record<string, number> = {};
    try {
      stored = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      stored = {};
    }
    const nextBest = Math.max(stored[game.id] || 0, score);
    localStorage.setItem(storageKey, JSON.stringify({ ...stored, [game.id]: nextBest }));
    setBestScore(nextBest);
    if (localStorage.getItem("codeskill_token")) {
      cognitiveGamesAPI.submitAttempt({
        gameId: game.id,
        score,
        totalRounds: challenges.length,
        correctRounds,
        durationSeconds: gameDurationSeconds - secondsLeft,
        responses,
      }).catch((error) => console.error("Could not save game attempt", error));
    }
  }, [mode, game, correctRounds, challenges.length, secondsLeft, gameDurationSeconds, responses]);

  const beginRound = (roundIndex = 0) => {
    setSelected([]);
    setHighlightedCell(-1);
    setMotionLane(-1);
    const challenge = challenges[roundIndex];
    setHighlightedCell(challenge.kind === "grid" ? challenge.cells[0] : -1);
    setMotionLane(challenge.kind === "motion" ? challenge.path[0] : -1);
    setMode(challenge.kind === "choice" ? "answer" : challenge.kind === "grid" || challenge.kind === "motion" ? "stimulus" : "custom");
  };

  const beginGame = () => {
    setRound(0);
    setCorrectRounds(0);
    setResponses([]);
    setSecondsLeft(gameDurationSeconds);
    savedRef.current = false;
    beginRound(0);
  };

  const submitAnswer = useCallback((isCorrect: boolean, response?: RoundResponse) => {
    setLastCorrect(isCorrect);
    if (isCorrect) setCorrectRounds((value) => value + 1);
    if (response !== undefined) setResponses((previous) => [...previous, response]);
    setMode("feedback");
  }, []);

  const submitNewKindAnswer = useCallback((response: RoundResponse) => {
    if (!current) return;
    submitAnswer(scoreGameResponse(current as unknown as Record<string, unknown>, response) > 0, response);
  }, [current, submitAnswer]);

  const nextRound = () => {
    const next = round + 1;
    if (next >= challenges.length) {
      setMode("complete");
      return;
    }
    setRound(next);
    beginRound(next);
  };

  const score = Math.round((correctRounds / challenges.length) * 100);

  if (!game && gameLoadState === "loading") {
    return <main className="mx-auto max-w-3xl px-6 py-24 text-center"><h1 className="text-2xl font-semibold">Loading game…</h1></main>;
  }

  if (!game || !current) {
    return <main className="mx-auto max-w-3xl px-6 py-24 text-center"><h1 className="text-2xl font-semibold">Game not found</h1><Link href="/games" className="mt-4 inline-block text-primary">Back to cognitive games</Link></main>;
  }

  return (
    <main className="min-h-screen bg-[#080b14] text-white px-4 pb-16 pt-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/games" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><ArrowLeft className="h-4 w-4" /> All cognitive games</Link>
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">Cognitive ability games</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{game.title}</h1>
          </div>
          {mode !== "intro" && mode !== "complete" && <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-mono text-sm"><Clock3 className="h-4 w-4 text-cyan-300" />{Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, "0")}</div>}
        </header>

        {mode !== "intro" && <div className="mb-6 flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 transition-all" style={{ width: `${mode === "complete" ? 100 : ((round + (mode === "feedback" ? 1 : 0)) / challenges.length) * 100}%` }} /></div><span className="text-xs text-slate-400">{Math.min(round + (mode === "feedback" ? 1 : 0), challenges.length)} / {challenges.length}</span></div>}

        <section className="min-h-[410px] rounded-3xl border border-white/10 bg-gradient-to-br from-[#12182a] to-[#0d1220] p-6 shadow-2xl shadow-black/30 sm:p-10">
          {mode === "custom" && <GameKindRound key={`${round}-${current.kind}`} round={current as unknown as import("@/lib/game-kind-registry").AnyRound} onAnswer={submitNewKindAnswer} />}
          {mode === "intro" && <div className="flex min-h-[350px] flex-col items-center justify-center text-center"><div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-300/20 bg-cyan-300/10 text-4xl text-cyan-200">{game.icon}</div><p className="max-w-xl text-slate-300">{game.description}</p><div className="my-7 flex items-center gap-5 text-xs text-slate-400"><span>{challenges.length} rounds</span><span>{Math.ceil(gameDurationSeconds / 60)} minutes</span>{bestScore !== null && <span>Best {bestScore}%</span>}</div><button onClick={beginGame} className="rounded-xl bg-cyan-300 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200">Start challenge <ArrowRight className="ml-2 inline h-4 w-4" /></button></div>}

          {mode === "stimulus" && current.kind === "grid" && <div className="flex min-h-[350px] flex-col items-center justify-center text-center"><h2 className="mb-8 text-xl font-medium">Watch the sequence</h2><div className="grid grid-cols-3 gap-3">{Array.from({ length: 9 }, (_, cell) => <div key={cell} className={`h-20 w-20 rounded-2xl border transition-all sm:h-24 sm:w-24 ${highlightedCell === cell ? "scale-105 border-cyan-200 bg-cyan-300 shadow-[0_0_35px_rgba(103,232,249,.55)]" : "border-white/10 bg-white/5"}`} />)}</div><p className="mt-6 text-sm text-slate-400">Remember the order, then tap the same tiles.</p></div>}

          {mode === "stimulus" && current.kind === "motion" && <div className="flex min-h-[350px] flex-col items-center justify-center text-center"><h2 className="mb-9 text-xl font-medium">Track the bright marker</h2><div className="grid grid-cols-4 gap-3">{[0, 1, 2, 3].map((lane) => <div key={lane} className="flex h-40 w-14 items-end justify-center rounded-full border border-white/10 bg-white/5 p-2 sm:w-20">{motionLane === lane && <div className="mb-4 h-8 w-8 animate-bounce rounded-full bg-rose-300 shadow-[0_0_28px_rgba(253,164,175,.8)]" />}</div>)}</div><p className="mt-6 text-sm text-slate-400">Follow its jumps. The lane will disappear before you answer.</p></div>}

          {mode === "answer" && current.kind === "choice" && <div className="mx-auto flex min-h-[350px] max-w-2xl flex-col justify-center"><p className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{current.instruction || `Round ${round + 1}`}</p><h2 className="mb-8 text-center text-xl font-medium leading-relaxed sm:text-2xl">{current.prompt}</h2><div className="grid gap-3 sm:grid-cols-2">{current.choices.map((choice, index) => <button key={choice} onClick={() => submitAnswer(evaluateChoice(current, index), index)} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm transition hover:border-cyan-300/50 hover:bg-cyan-300/10">{choice}</button>)}</div></div>}

          {mode === "answer" && current.kind === "grid" && <div className="flex min-h-[350px] flex-col items-center justify-center"><h2 className="mb-3 text-center text-xl font-medium">{current.prompt}</h2><p className="mb-6 text-sm text-slate-400">Tap {current.cells.length} tiles in the remembered order.</p><div className="grid grid-cols-3 gap-3">{Array.from({ length: 9 }, (_, cell) => <button key={cell} onClick={() => setSelected((previous) => previous.length < current.cells.length ? [...previous, cell] : previous)} aria-label={`Grid tile ${cell + 1}${selected.includes(cell) ? `, selected position ${selected.indexOf(cell) + 1}` : ""}`} className={`relative h-20 w-20 rounded-2xl border transition sm:h-24 sm:w-24 ${selected.includes(cell) ? "border-cyan-200 bg-cyan-300/20" : "border-white/10 bg-white/5 hover:border-white/30"}`}>{selected.includes(cell) && <span className="font-mono text-lg text-cyan-100">{selected.indexOf(cell) + 1}</span>}</button>)}</div><div className="mt-6 flex gap-3"><button onClick={() => setSelected([])} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300"><RotateCcw className="mr-2 inline h-4 w-4" />Reset</button><button disabled={selected.length !== current.cells.length} onClick={() => submitAnswer(evaluateGrid(current, selected), selected)} className="rounded-xl bg-cyan-300 px-5 py-2 font-semibold text-slate-950 disabled:opacity-40">Check sequence</button></div></div>}

          {mode === "answer" && current.kind === "motion" && <div className="flex min-h-[350px] flex-col items-center justify-center"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-rose-300">Motion round {round + 1}</p><h2 className="mb-8 text-center text-xl font-medium">{current.prompt}</h2><div className="grid grid-cols-4 gap-3">{[0, 1, 2, 3].map((lane) => <button key={lane} onClick={() => submitAnswer(evaluateMotion(current, lane), lane)} className="h-24 w-16 rounded-2xl border border-white/10 bg-white/5 text-sm text-slate-300 transition hover:border-rose-300/50 hover:bg-rose-300/10 sm:w-24">Lane {lane + 1}</button>)}</div></div>}

          {mode === "feedback" && <div className="flex min-h-[350px] flex-col items-center justify-center text-center"><div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-full ${lastCorrect ? "bg-emerald-400/15 text-emerald-300" : "bg-rose-400/15 text-rose-300"}`}>{lastCorrect ? <Check className="h-8 w-8" /> : <X className="h-8 w-8" />}</div><h2 className="text-2xl font-semibold">{lastCorrect ? "That’s right" : "Not quite"}</h2><p className="mt-2 text-slate-400">{correctRounds} correct so far</p><button onClick={nextRound} className="mt-8 rounded-xl bg-cyan-300 px-6 py-3 font-semibold text-slate-950">{round + 1 === challenges.length ? "See results" : "Next round"} <ArrowRight className="ml-2 inline h-4 w-4" /></button></div>}

          {mode === "complete" && <div className="flex min-h-[350px] flex-col items-center justify-center text-center"><Sparkles className="mb-5 h-10 w-10 text-amber-200" /><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Challenge complete</p><div className="mt-3 text-6xl font-semibold tracking-tight">{score}<span className="text-2xl text-slate-400">%</span></div><p className="mt-3 text-slate-300">{correctRounds} of {challenges.length} rounds correct</p>{bestScore !== null && <p className="mt-2 text-sm text-slate-400">Personal best: {bestScore}%</p>}<div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={beginGame} className="rounded-xl bg-cyan-300 px-5 py-3 font-semibold text-slate-950"><RotateCcw className="mr-2 inline h-4 w-4" />Play again</button><Link href="/games" className="rounded-xl border border-white/10 px-5 py-3 font-medium text-white">Choose another game <ArrowRight className="ml-2 inline h-4 w-4" /></Link></div></div>}
        </section>
        <p className="mt-5 text-center text-xs text-slate-500">Practice only · Your score is saved to your profile when you are signed in.</p>
      </div>
    </main>
  );
}
