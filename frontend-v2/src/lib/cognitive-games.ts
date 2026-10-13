export type CognitiveGameId = "deductive" | "switch" | "grid" | "inductive" | "motion";

export interface ChoiceChallenge {
  kind: "choice";
  prompt: string;
  instruction?: string;
  choices: string[];
  answer: number;
}

export interface GridChallenge {
  kind: "grid";
  prompt: string;
  cells: number[];
}

export interface MotionChallenge {
  kind: "motion";
  prompt: string;
  path: number[];
}

export type Challenge = ChoiceChallenge | GridChallenge | MotionChallenge;

export const COGNITIVE_GAMES: Array<{
  id: CognitiveGameId;
  title: string;
  shortDescription: string;
  description: string;
  duration: string;
  rounds: number;
  color: string;
  icon: string;
}> = [
  { id: "deductive", title: "Deductive Challenge", shortDescription: "Use clues to reach a logical conclusion.", description: "Read the facts, separate what you know from what you assume, and choose the conclusion that must be true.", duration: "3 min", rounds: 5, color: "violet", icon: "∴" },
  { id: "switch", title: "Switch Challenge", shortDescription: "Change rules quickly and stay accurate.", description: "Classify each prompt using the rule shown. The rule changes between number and letter tasks, so reset your focus each round.", duration: "2 min", rounds: 5, color: "cyan", icon: "⇄" },
  { id: "grid", title: "Grid Challenge", shortDescription: "Remember the order of a flashing tile sequence.", description: "Watch the tiles light up, then reproduce their sequence from memory on the grid.", duration: "2 min", rounds: 4, color: "emerald", icon: "▦" },
  { id: "inductive", title: "Inductive Challenge", shortDescription: "Spot a pattern and predict what comes next.", description: "Find the rule behind each number or symbol sequence and select the next item.", duration: "3 min", rounds: 5, color: "amber", icon: "⌁" },
  { id: "motion", title: "Motion Challenge", shortDescription: "Track a moving marker across changing lanes.", description: "Follow the highlighted marker as it jumps between lanes. After the motion stops, identify its final position.", duration: "2 min", rounds: 4, color: "rose", icon: "➜" },
];

export const GAME_CHALLENGES: Record<CognitiveGameId, Challenge[]> = {
  deductive: [
    { kind: "choice", prompt: "All architects are problem solvers. Some problem solvers are musicians. What must be true?", choices: ["All architects are musicians", "Some musicians are architects", "All architects are problem solvers", "No architects are musicians"], answer: 2 },
    { kind: "choice", prompt: "Mira finished before Dev. Dev finished before Lee. Who finished last?", choices: ["Mira", "Dev", "Lee", "Cannot be determined"], answer: 2 },
    { kind: "choice", prompt: "If a badge is blue, its holder can enter the lab. Sam cannot enter the lab. What follows?", choices: ["Sam has a blue badge", "Sam does not have a blue badge", "Sam forgot the badge", "Nothing follows"], answer: 1 },
    { kind: "choice", prompt: "Every red box is heavy. Box A is red. Which conclusion follows?", choices: ["Box A is heavy", "Every heavy box is red", "Box A is the heaviest", "No conclusion"], answer: 0 },
    { kind: "choice", prompt: "A team needs either a designer or an analyst. Jo is neither. What can you conclude?", choices: ["Jo cannot be on the team", "Jo is a designer", "Jo is an analyst", "The team has no analyst"], answer: 0 },
  ],
  switch: [
    { kind: "choice", instruction: "NUMBER RULE · Choose ODD or EVEN", prompt: "17", choices: ["ODD", "EVEN"], answer: 0 },
    { kind: "choice", instruction: "LETTER RULE · Choose VOWEL or CONSONANT", prompt: "M", choices: ["VOWEL", "CONSONANT"], answer: 1 },
    { kind: "choice", instruction: "NUMBER RULE · Choose ODD or EVEN", prompt: "42", choices: ["ODD", "EVEN"], answer: 1 },
    { kind: "choice", instruction: "LETTER RULE · Choose VOWEL or CONSONANT", prompt: "E", choices: ["VOWEL", "CONSONANT"], answer: 0 },
    { kind: "choice", instruction: "NUMBER RULE · Choose ODD or EVEN", prompt: "91", choices: ["ODD", "EVEN"], answer: 0 },
  ],
  grid: [
    { kind: "grid", prompt: "Repeat the highlighted tiles in order.", cells: [0, 4, 8] },
    { kind: "grid", prompt: "Repeat the highlighted tiles in order.", cells: [2, 5, 1, 7] },
    { kind: "grid", prompt: "Repeat the highlighted tiles in order.", cells: [6, 3, 0, 4, 8] },
    { kind: "grid", prompt: "Repeat the highlighted tiles in order.", cells: [1, 8, 5, 2, 6, 0] },
  ],
  inductive: [
    { kind: "choice", prompt: "2, 4, 8, 16, ?", choices: ["18", "24", "32", "64"], answer: 2 },
    { kind: "choice", prompt: "3, 6, 11, 18, ?", choices: ["25", "27", "29", "36"], answer: 1 },
    { kind: "choice", prompt: "A, C, F, J, ?", choices: ["M", "N", "O", "P"], answer: 2 },
    { kind: "choice", prompt: "1, 1, 2, 3, 5, ?", choices: ["7", "8", "9", "10"], answer: 1 },
    { kind: "choice", prompt: "64, 32, 16, 8, ?", choices: ["2", "4", "6", "0"], answer: 1 },
  ],
  motion: [
    { kind: "motion", prompt: "Track the bright marker. Which lane does it finish in?", path: [0, 2, 1, 3, 2] },
    { kind: "motion", prompt: "Keep your eyes on the bright marker. Where does it stop?", path: [3, 1, 0, 2, 1, 3] },
    { kind: "motion", prompt: "Follow the bright marker through each jump. Pick its final lane.", path: [1, 3, 2, 0, 3] },
    { kind: "motion", prompt: "Track the marker as it moves. Which lane is its final position?", path: [2, 0, 3, 1, 0, 2] },
  ],
};

export function evaluateChoice(challenge: ChoiceChallenge, selected: number): boolean {
  return selected === challenge.answer;
}

export function evaluateGrid(challenge: GridChallenge, selected: number[]): boolean {
  return selected.length === challenge.cells.length && challenge.cells.every((cell, index) => selected[index] === cell);
}

export function evaluateMotion(challenge: MotionChallenge, lane: number): boolean {
  return challenge.path.at(-1) === lane;
}
