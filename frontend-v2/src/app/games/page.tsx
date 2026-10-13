"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Grid2X2, MoveUpRight, Repeat2, Waves } from "lucide-react";
import type { CognitiveGameId } from "@/lib/cognitive-games";
import { cognitiveGamesAPI } from "@/config/api";

const GAME_ICONS = {
  deductive: BrainCircuit,
  switch: Repeat2,
  grid: Grid2X2,
  inductive: Waves,
  motion: MoveUpRight,
} satisfies Record<CognitiveGameId, typeof BrainCircuit>;

const GAME_COLORS: Record<string, string> = {
  violet: "border-violet-300/20 bg-violet-300/10 text-violet-200",
  cyan: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
  emerald: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
  amber: "border-amber-300/20 bg-amber-300/10 text-amber-200",
  rose: "border-rose-300/20 bg-rose-300/10 text-rose-200",
};

export default function CognitiveGamesPage() {
  const [bestScores, setBestScores] = useState<Record<string, number>>({});
  const [games, setGames] = useState<Array<{ id: string; title: string; shortDescription: string; description: string; duration: string; rounds: number; color: string; icon: string }>>([]);

  useEffect(() => {
    let active = true;
    cognitiveGamesAPI.listPublished().then((response) => {
      const payload = response.data as { data?: unknown } | unknown;
      const records = payload && typeof payload === "object" && "data" in payload ? payload.data : payload;
      if (active && Array.isArray(records)) setGames(records.map((game: { slug:string; title:string; shortDescription:string; description:string; durationSeconds:number; rounds:unknown[]; color:string; icon:string }) => ({ ...game, id: game.slug, duration: `${Math.ceil(game.durationSeconds / 60)} min`, rounds: game.rounds.length })));
    }).catch((error) => console.error("Could not load games", error));
    let scores: Record<string, number> = {};
    try {
      scores = JSON.parse(localStorage.getItem("codeskill_cognitive_games") || "{}");
    } catch {
      scores = {};
    }
    const localLoad = window.setTimeout(() => {
      if (active) setBestScores(scores);
    }, 0);
    if (localStorage.getItem("codeskill_token")) {
      cognitiveGamesAPI.getMyAttempts()
        .then((response) => {
          if (active) setBestScores((previous) => ({ ...previous, ...response.data.bestScores }));
        })
        .catch((error) => console.error("Could not load cognitive game history", error));
    }
    return () => { active = false; window.clearTimeout(localLoad); };
  }, []);

  return (
    <main className="min-h-screen bg-[#080b14] px-4 pb-20 pt-28 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center sm:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Practice · Think · Improve</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Cognitive Ability Games</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">Sharpen logic, focus, memory, pattern recognition, and mental flexibility with short interactive challenges.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => {
            const Icon = GAME_ICONS[game.id as CognitiveGameId] || BrainCircuit;
            return (
              <article key={game.id} className="group flex min-h-[290px] flex-col rounded-3xl border border-white/10 bg-gradient-to-br from-[#141a2b] to-[#0d1220] p-6 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-black/30">
                <div className="flex items-start justify-between">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${GAME_COLORS[game.color]}`}><Icon className="h-7 w-7" /></div>
                  <span className="text-xs font-mono text-slate-500">0{index + 1}</span>
                </div>
                <h2 className="mt-6 text-xl font-semibold">{game.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{game.shortDescription}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="text-xs text-slate-500">{game.rounds} rounds <span className="mx-1.5 text-slate-700">·</span> {game.duration}{bestScores[game.id] !== undefined && <span className="ml-2 text-cyan-200">Best {bestScores[game.id]}%</span>}</div>
                  <Link href={`/games/${game.id}`} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Play <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-8 text-center text-xs text-slate-600">Scores are for practice and do not affect your assessment results.</p>
      </div>
    </main>
  );
}
