export const GAME_KINDS = [
  'grid', 'motion', 'choice', 'sequence_memory', 'target_detection', 'match_mismatch',
  'number_series', 'pattern_completion', 'rule_switching', 'spatial_rotation',
  'rapid_classification', 'coding_decoding', 'reaction_time', 'go_no_go', 'path_tracking',
] as const;
export type GameKind = typeof GAME_KINDS[number];
type ObjectValue = Record<string, any>;
const nonEmpty = (value: any) => typeof value === 'string' && value.trim().length > 0;
const stringList = (value: any, min = 2) => Array.isArray(value) && value.length >= min && value.every(nonEmpty);
const numbersIn = (value: any, min: number, max: number) => Array.isArray(value) && value.length > 0 && value.every((n) => Number.isInteger(n) && n >= min && n <= max);
const choicesValid = (round: ObjectValue) => stringList(round.choices) && Number.isInteger(round.answer) && round.answer >= 0 && round.answer < round.choices.length;

export function validateGameRound(round: ObjectValue): string | undefined {
  if (!round || !GAME_KINDS.includes(round.kind)) return `kind must be one of ${GAME_KINDS.join(', ')}`;
  if (!nonEmpty(round.prompt)) return 'prompt must be a non-empty string';
  let valid = false;
  switch (round.kind as GameKind) {
    case 'grid': valid = numbersIn(round.cells, 0, 8); break;
    case 'motion': valid = numbersIn(round.path, 0, 3); break;
    case 'choice': valid = choicesValid(round); break;
    case 'sequence_memory': valid = stringList(round.sequence) && stringList(round.choices) && round.sequence.every((x: string) => round.choices.includes(x)); break;
    case 'target_detection': valid = nonEmpty(round.target) && stringList(round.items) && round.items.includes(round.target); break;
    case 'match_mismatch': valid = nonEmpty(round.stimulusA) && nonEmpty(round.stimulusB) && typeof round.isMatch === 'boolean'; break;
    case 'number_series': valid = Array.isArray(round.sequence) && round.sequence.length >= 2 && round.sequence.every(Number.isFinite) && choicesValid(round); break;
    case 'pattern_completion': valid = stringList(round.pattern) && choicesValid(round); break;
    case 'rule_switching': valid = nonEmpty(round.instruction) && nonEmpty(round.stimulus) && choicesValid(round); break;
    case 'spatial_rotation': valid = Array.isArray(round.shape) && round.shape.length > 0 && round.shape.every(nonEmpty) && choicesValid(round); break;
    case 'rapid_classification': valid = nonEmpty(round.stimulus) && choicesValid(round); break;
    case 'coding_decoding': valid = nonEmpty(round.instruction) && nonEmpty(round.encoded) && choicesValid(round); break;
    case 'reaction_time': valid = Number.isInteger(round.targetDelayMs) && round.targetDelayMs >= 250 && round.targetDelayMs <= 5000 && Number.isInteger(round.maxResponseMs) && round.maxResponseMs >= 100 && round.maxResponseMs <= 5000; break;
    case 'go_no_go': valid = stringList(round.stimuli) && nonEmpty(round.goStimulus) && round.stimuli.includes(round.goStimulus); break;
    case 'path_tracking': valid = numbersIn(round.path, 0, 8); break;
  }
  return valid ? undefined : `invalid ${round.kind} round configuration`;
}

const sameSequence = (expected: any[], answer: any) => Array.isArray(answer) && expected.length === answer.length && expected.every((v, i) => v === answer[i]);
export function scoreGameRound(round: ObjectValue, response: any): number {
  switch (round.kind as GameKind) {
    case 'grid': case 'sequence_memory': return sameSequence(round.kind === 'grid' ? round.cells : round.sequence, response) ? 1 : 0;
    case 'motion': return response === round.path.at(-1) ? 1 : 0;
    case 'choice': case 'number_series': case 'pattern_completion': case 'rule_switching': case 'spatial_rotation': case 'rapid_classification': case 'coding_decoding': return response === round.answer ? 1 : 0;
    case 'target_detection': return sameSequence(round.items.flatMap((x: string, i: number) => x === round.target ? [i] : []), response) ? 1 : 0;
    case 'match_mismatch': return response === round.isMatch ? 1 : 0;
    case 'reaction_time': return response && response.reactionMs > 0 && response.reactionMs <= round.maxResponseMs ? 1 : 0;
    case 'go_no_go': return sameSequence(round.stimuli.flatMap((x: string, i: number) => x === round.goStimulus ? [i] : []), response) ? 1 : 0;
    case 'path_tracking': return sameSequence(round.path, response) ? 1 : 0;
    default: return 0;
  }
}
