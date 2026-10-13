"use client";

import { useState } from "react";
import { CheckCircle2, Download } from "lucide-react";

type ContestResultsData = {
  title: string;
  slug: string;
  startTime: string;
  endTime: string;
  totalProblems: number;
  participants: Array<{
    rank: number;
    name: string;
    email: string;
    uid: string;
    status: string;
    solved: number;
    submissions: number;
    warnings: number;
    submittedAt: string | null;
  }>;
};

export function ContestResultsExcelButton({ contest }: { contest: ContestResultsData }) {
  const [generating, setGenerating] = useState(false);
  const [complete, setComplete] = useState(false);

  const download = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      const XLSX = await import("xlsx");
      const workbook = XLSX.utils.book_new();
      const summary = XLSX.utils.aoa_to_sheet([
        ["CodeSkill Contest Results"],
        ["Contest", contest.title],
        ["Contest ID", contest.slug],
        ["Start time", new Date(contest.startTime).toLocaleString()],
        ["End time", new Date(contest.endTime).toLocaleString()],
        ["Problems", contest.totalProblems],
        ["Participants", contest.participants.length],
        ["Generated", new Date().toLocaleString()],
      ]);
      summary["!cols"] = [{ wch: 18 }, { wch: 42 }];
      summary["!merges"] = [XLSX.utils.decode_range("A1:B1")];
      const leaderboard = XLSX.utils.aoa_to_sheet([
        ["Rank", "Student", "UID", "Email", "Status", "Solved", "Total Problems", "Submissions", "Warnings", "Submitted At"],
        ...contest.participants.map((student) => [
          student.rank, student.name, student.uid, student.email, student.status,
          student.solved, contest.totalProblems, student.submissions, student.warnings,
          student.submittedAt ? new Date(student.submittedAt).toLocaleString() : "Not submitted",
        ]),
      ]);
      leaderboard["!cols"] = [
        { wch: 8 }, { wch: 25 }, { wch: 16 }, { wch: 30 }, { wch: 16 },
        { wch: 10 }, { wch: 15 }, { wch: 14 }, { wch: 11 }, { wch: 22 },
      ];
      XLSX.utils.book_append_sheet(workbook, summary, "Summary");
      XLSX.utils.book_append_sheet(workbook, leaderboard, "Leaderboard");
      XLSX.writeFile(workbook, `CodeSkill-${contest.slug}-results.xlsx`, { compression: true });
      setComplete(true);
      window.setTimeout(() => setComplete(false), 3000);
    } finally {
      setGenerating(false);
    }
  };

  return <button onClick={download} disabled={generating} className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60">
    {complete ? <CheckCircle2 className="h-4 w-4" /> : <Download className="h-4 w-4" />}
    {generating ? "Preparing Excel..." : complete ? "Excel downloaded" : "Download Excel"}
  </button>;
}
