export declare const GAME_KINDS: readonly ["grid", "motion", "choice", "sequence_memory", "target_detection", "match_mismatch", "number_series", "pattern_completion", "rule_switching", "spatial_rotation", "rapid_classification", "coding_decoding", "reaction_time", "go_no_go", "path_tracking"];
export type GameKind = typeof GAME_KINDS[number];
type ObjectValue = Record<string, any>;
export declare function validateGameRound(round: ObjectValue): string | undefined;
export declare function scoreGameRound(round: ObjectValue, response: any): number;
export {};
