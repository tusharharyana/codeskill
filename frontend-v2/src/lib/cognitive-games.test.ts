import { describe, expect, it } from "@jest/globals";
import {
  COGNITIVE_GAMES,
  GAME_CHALLENGES,
  evaluateChoice,
  evaluateGrid,
  evaluateMotion,
  type ChoiceChallenge,
  type GridChallenge,
  type MotionChallenge,
} from "./cognitive-games";

describe("cognitive game challenges", () => {
  it("provides the five games in the reference set with playable rounds", () => {
    expect(COGNITIVE_GAMES.map((game) => game.id)).toEqual([
      "deductive", "switch", "grid", "inductive", "motion",
    ]);
    for (const game of COGNITIVE_GAMES) {
      expect(GAME_CHALLENGES[game.id]).toHaveLength(game.rounds);
    }
  });

  it("checks choice, ordered grid recall, and final motion lane answers", () => {
    expect(evaluateChoice(GAME_CHALLENGES.inductive[0] as ChoiceChallenge, 2)).toBe(true);
    expect(evaluateGrid(GAME_CHALLENGES.grid[0] as GridChallenge, [0, 4, 8])).toBe(true);
    expect(evaluateGrid(GAME_CHALLENGES.grid[0] as GridChallenge, [4, 0, 8])).toBe(false);
    expect(evaluateMotion(GAME_CHALLENGES.motion[0] as MotionChallenge, 2)).toBe(true);
  });
});
