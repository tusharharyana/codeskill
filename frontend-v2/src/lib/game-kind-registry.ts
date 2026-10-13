export const GAME_KIND_IDS = [
  "grid", "motion", "choice", "sequence_memory", "target_detection", "match_mismatch",
  "number_series", "pattern_completion", "rule_switching", "spatial_rotation",
  "rapid_classification", "coding_decoding", "reaction_time", "go_no_go", "path_tracking",
] as const;

export type GameKind = typeof GAME_KIND_IDS[number];
export type AnyRound = Record<string, unknown> & { kind: GameKind; prompt: string };
export type RoundResponse = number | number[] | string[] | boolean | { reactionMs: number };
export type GameKindDefinition = {
  label: string;
  description: string;
  example: AnyRound;
  validate: (round: Record<string, unknown>) => string[];
  score: (round: Record<string, unknown>, response: RoundResponse) => number;
};

const str = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const strings = (v: unknown, min = 2) => Array.isArray(v) && v.length >= min && v.every(str);
const ints = (v: unknown, min: number, max: number) => Array.isArray(v) && v.length > 0 && v.every((x) => Number.isInteger(x) && x >= min && x <= max);
const indexValid = (r: Record<string, unknown>) => strings(r.choices) && Number.isInteger(r.answer) && Number(r.answer) >= 0 && Number(r.answer) < (r.choices as unknown[]).length;
const equalSequence = (expected: unknown[], answer: RoundResponse) => Array.isArray(answer) && answer.length === expected.length && expected.every((x, i) => x === answer[i]);
const choiceScore = (r: Record<string, unknown>, answer: RoundResponse) => answer === r.answer ? 1 : 0;
const promptRequired = (r: Record<string, unknown>) => str(r.prompt) ? [] : ["prompt must be a non-empty string"];
const choiceErrors = (r: Record<string, unknown>) => indexValid(r) ? [] : ["choices must contain at least two strings and answer must be a valid zero-based index"];
const def = (label: string, description: string, example: AnyRound, validate: GameKindDefinition["validate"], score: GameKindDefinition["score"] = choiceScore): GameKindDefinition => ({ label, description, example, validate: (r) => [...promptRequired(r), ...validate(r)], score });

export const GAME_KIND_REGISTRY: Record<GameKind, GameKindDefinition> = {
  grid: def("Grid", "Recall a sequence of highlighted grid tiles.", {kind:"grid",prompt:"Repeat the lit tiles.",cells:[0,4,8]}, r => ints(r.cells,0,8) ? [] : ["cells must be a non-empty array of tile indexes 0–8"], (r,a)=>equalSequence(r.cells as number[],a)?1:0),
  motion: def("Motion", "Track a marker as it moves between lanes.", {kind:"motion",prompt:"Which lane does the marker finish in?",path:[0,2,1]}, r => ints(r.path,0,3)?[]:["path must be a non-empty array of lane indexes 0–3"], (r,a)=>a===((r.path as number[]).at(-1))?1:0),
  choice: def("Choice", "Select one answer from a set of options.", {kind:"choice",prompt:"Choose the correct answer.",choices:["A","B"],answer:1},choiceErrors),
  sequence_memory: def("Sequence memory", "Watch and reproduce an ordered sequence of tokens.", {kind:"sequence_memory",prompt:"Repeat the sequence.",sequence:["red","blue","green"],choices:["red","blue","green","yellow"]},r=>strings(r.sequence,2)&&strings(r.choices,2)&& (r.sequence as string[]).every(x=>(r.choices as string[]).includes(x))?[]:["sequence and choices must be string arrays; choices must include every sequence item"],(r,a)=>equalSequence(r.sequence as string[],a)?1:0),
  target_detection: def("Target detection", "Find every occurrence of the target among distractors.", {kind:"target_detection",prompt:"Select every target.",target:"X",items:["O","X","X","O"]},r=>str(r.target)&&strings(r.items,2)&&(r.items as string[]).includes(r.target as string)?[]:["target must appear in an items array of at least two strings"],(r,a)=>equalSequence((r.items as string[]).flatMap((x,i)=>x===r.target?[i]:[]),a)?1:0),
  match_mismatch: def("Match / mismatch", "Judge whether the two presented items match.", {kind:"match_mismatch",prompt:"Do these match?",stimulusA:"ABBA",stimulusB:"ABBA",isMatch:true},r=>str(r.stimulusA)&&str(r.stimulusB)&&typeof r.isMatch==="boolean"?[]:["stimulusA, stimulusB, and boolean isMatch are required"],(r,a)=>a===r.isMatch?1:0),
  number_series: def("Number series", "Infer the rule in a number sequence.", {kind:"number_series",prompt:"What comes next?",sequence:[2,4,8,16],choices:["24","30","32"],answer:2},r=>Array.isArray(r.sequence)&&r.sequence.length>=2&&r.sequence.every(Number.isFinite)?choiceErrors(r):["sequence must contain at least two numbers",...choiceErrors(r)]),
  pattern_completion: def("Pattern completion", "Complete a visual or symbolic pattern.", {kind:"pattern_completion",prompt:"Choose the missing item.",pattern:["●","○","●","○"],choices:["●","○"],answer:0},r=>strings(r.pattern,2)?choiceErrors(r):["pattern must contain at least two strings",...choiceErrors(r)]),
  rule_switching: def("Rule switching", "Apply the stated rule to a stimulus.", {kind:"rule_switching",prompt:"Apply the current rule.",instruction:"Choose odd or even",stimulus:"17",choices:["odd","even"],answer:0},r=>str(r.instruction)&&str(r.stimulus)?choiceErrors(r):["instruction and stimulus are required",...choiceErrors(r)]),
  spatial_rotation: def("Spatial rotation", "Mentally rotate a shape and choose its orientation.", {kind:"spatial_rotation",prompt:"Which option is the shape rotated clockwise?",shape:["■□","■■"],choices:["■□ / ■■","■■ / □■"],answer:1},r=>Array.isArray(r.shape)&&r.shape.length>0&&r.shape.every(str)?choiceErrors(r):["shape must be an array of non-empty display rows",...choiceErrors(r)]),
  rapid_classification: def("Rapid classification", "Classify the stimulus using the listed categories.", {kind:"rapid_classification",prompt:"Classify this item.",stimulus:"pear",choices:["fruit","tool","vehicle"],answer:0},r=>str(r.stimulus)?choiceErrors(r):["stimulus is required",...choiceErrors(r)]),
  coding_decoding: def("Coding / decoding", "Decode a symbol or letter transformation.", {kind:"coding_decoding",prompt:"Decode the message.",instruction:"Each letter moves forward by 1.",encoded:"DBU",choices:["CAT","CAR","BAT"],answer:0},r=>str(r.encoded)&&str(r.instruction)?choiceErrors(r):["encoded text and instruction are required",...choiceErrors(r)]),
  reaction_time: def("Reaction time", "Respond as soon as the target appears.", {kind:"reaction_time",prompt:"Press when the target appears.",targetDelayMs:900,maxResponseMs:1200},r=>Number.isInteger(r.targetDelayMs)&&Number(r.targetDelayMs)>=250&&Number(r.targetDelayMs)<=5000&&Number.isInteger(r.maxResponseMs)&&Number(r.maxResponseMs)>=100&&Number(r.maxResponseMs)<=5000?[]:["targetDelayMs must be 250–5000 and maxResponseMs 100–5000"],(r,a)=>typeof a==="object"&&"reactionMs"in a&&a.reactionMs>0&&a.reactionMs<=Number(r.maxResponseMs)?1:0),
  go_no_go: def("Go / no-go", "Respond to go stimuli and withhold responses to no-go stimuli.", {kind:"go_no_go",prompt:"Tap only when GO appears.",stimuli:["go","stop","go","stop"],goStimulus:"go"},r=>strings(r.stimuli,2)&&str(r.goStimulus)&&(r.stimuli as string[]).includes(r.goStimulus as string)?[]:["stimuli must be strings and contain goStimulus"],(r,a)=>equalSequence((r.stimuli as string[]).flatMap((x,i)=>x===r.goStimulus?[i]:[]),a)?1:0),
  path_tracking: def("Path tracking", "Watch and reproduce the path across a nine-cell grid.", {kind:"path_tracking",prompt:"Trace the marker's path.",path:[0,1,4,7,8]},r=>ints(r.path,0,8)?[]:["path must be a non-empty array of tile indexes 0–8"],(r,a)=>equalSequence(r.path as number[],a)?1:0),
};

export function validateGameRound(round: unknown): string[] {
  if (!round || typeof round !== "object" || Array.isArray(round)) return ["round must be a JSON object"];
  const value = round as Record<string, unknown>;
  if (typeof value.kind !== "string" || !GAME_KIND_IDS.includes(value.kind as GameKind)) return [`kind must be one of: ${GAME_KIND_IDS.join(", ")}`];
  return GAME_KIND_REGISTRY[value.kind as GameKind].validate(value);
}

export function scoreGameResponse(round: Record<string, unknown>, response: RoundResponse): number {
  const kind = round.kind as GameKind;
  return GAME_KIND_REGISTRY[kind]?.score(round, response) ?? 0;
}
