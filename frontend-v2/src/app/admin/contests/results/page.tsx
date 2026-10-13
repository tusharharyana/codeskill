"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { adminContestsAPI } from "@/config/api";
import { ContestResultsExcelButton } from "@/components/reports/ContestResultsExcelButton";
import { Award, CalendarDays, CheckCircle2, ChevronDown, Search, Trophy, Users } from "lucide-react";

type Participant = { id: string; rank: number; name: string; email: string; uid: string; status: string; startedAt: string | null; submittedAt: string | null; warnings: number; solved: number; submissions: number; };
type ContestResult = { id: string; title: string; slug: string; startTime: string; endTime: string; totalProblems: number; participants: Participant[]; };

export default function ContestResultsPage() {
  const searchParams = useSearchParams();
  const [contests, setContests] = useState<ContestResult[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminContestsAPI.getResults().then((response) => {
      const list: ContestResult[] = response.data?.contests || [];
      setContests(list);
      const requested = searchParams.get("contest");
      if (list.length) setSelectedId(list.some((entry) => entry.id === requested) ? requested! : list[0].id);
    }).catch((error) => console.error("Could not load contest results", error)).finally(() => setLoading(false));
  }, [searchParams]);

  const contest = contests.find((entry) => entry.id === selectedId);
  const participants = useMemo(() => (contest?.participants || []).filter((participant) => {
    const term = search.trim().toLowerCase();
    return !term || [participant.name, participant.email, participant.uid].some((value) => value.toLowerCase().includes(term));
  }), [contest, search]);

  return <div className="mx-auto max-w-7xl p-6 font-sans md:p-8">
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><div className="mb-2 flex items-center gap-2 text-primary"><Trophy className="h-5 w-5" /><span className="text-xs font-bold uppercase tracking-[0.16em]">Contests</span></div><h1 className="text-2xl font-bold text-foreground">Contest Results</h1><p className="mt-1 text-sm text-muted-foreground">Participant results and downloadable Excel workbooks.</p></div>
      <div className="flex flex-col gap-2 sm:items-end"><label className="relative flex h-11 min-w-72 items-center rounded-lg border border-border bg-card px-3 shadow-sm"><span className="sr-only">Select contest</span><select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="h-full w-full appearance-none bg-transparent pr-7 text-sm font-semibold text-foreground outline-none">{contests.map((entry) => <option key={entry.id} value={entry.id}>{entry.title}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted-foreground" /></label>{contest && <ContestResultsExcelButton contest={contest} />}</div>
    </div>
    {loading ? <div className="rounded-xl border border-border bg-card py-16 text-center text-sm text-muted-foreground">Loading contest results...</div> : !contest ? <div className="rounded-xl border border-border bg-card py-16 text-center"><Trophy className="mx-auto mb-3 h-8 w-8 text-muted-foreground" /><p className="font-medium text-foreground">No contests available</p><p className="mt-1 text-sm text-muted-foreground">Create a contest to view participant results here.</p></div> : <>
      <section className="mb-6 grid gap-4 md:grid-cols-3"><div className="rounded-xl border border-border bg-card p-5"><div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"><Users className="h-4 w-4 text-primary" />Participants</div><p className="text-3xl font-bold text-foreground">{contest.participants.length}</p><p className="mt-1 text-xs text-muted-foreground">Registered or started students</p></div><div className="rounded-xl border border-border bg-card p-5"><div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-emerald-500" />Problems</div><p className="text-3xl font-bold text-foreground">{contest.totalProblems}</p><p className="mt-1 text-xs text-muted-foreground">Included in this contest</p></div><div className="rounded-xl border border-border bg-card p-5"><div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground"><CalendarDays className="h-4 w-4 text-primary" />Schedule</div><p className="text-sm font-semibold text-foreground">{new Date(contest.startTime).toLocaleDateString()}</p><p className="mt-1 text-xs text-muted-foreground">Ended {new Date(contest.endTime).toLocaleString()}</p></div></section>
      <section className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"><div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold text-foreground">Student leaderboard</h2><p className="mt-0.5 text-xs text-muted-foreground">Ranked by solved problems, then submission count.</p></div><div className="relative w-full sm:w-72"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students..." className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm text-foreground outline-none focus:border-primary" /></div></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground"><tr><th className="px-5 py-3">Rank</th><th className="px-5 py-3">Student</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-center">Solved</th><th className="px-5 py-3 text-center">Submissions</th><th className="px-5 py-3 text-center">Warnings</th><th className="px-5 py-3">Submitted at</th></tr></thead><tbody className="divide-y divide-border">{participants.length ? participants.map((participant) => <tr key={participant.id} className="hover:bg-muted/30"><td className="px-5 py-4"><span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${participant.rank <= 3 ? "bg-amber-500/15 text-amber-600" : "bg-muted text-muted-foreground"}`}>{participant.rank <= 3 ? <Award className="h-4 w-4" /> : participant.rank}</span></td><td className="px-5 py-4"><p className="font-semibold text-foreground">{participant.name}</p><p className="mt-0.5 text-xs text-muted-foreground">{participant.uid !== "—" ? `${participant.uid} · ` : ""}{participant.email}</p></td><td className="px-5 py-4"><span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{participant.status}</span></td><td className="px-5 py-4 text-center font-semibold text-foreground">{participant.solved}<span className="font-normal text-muted-foreground"> / {contest.totalProblems}</span></td><td className="px-5 py-4 text-center text-foreground">{participant.submissions}</td><td className="px-5 py-4 text-center text-foreground">{participant.warnings}</td><td className="px-5 py-4 text-xs text-muted-foreground">{participant.submittedAt ? new Date(participant.submittedAt).toLocaleString() : "Not submitted"}</td></tr>) : <tr><td colSpan={7} className="px-5 py-16 text-center"><Users className="mx-auto mb-3 h-7 w-7 text-muted-foreground" /><p className="font-medium text-foreground">No students have joined this contest</p><p className="mt-1 text-sm text-muted-foreground">Students will appear here once they register or start an attempt.</p></td></tr>}</tbody></table></div></section>
    </>}
  </div>;
}
