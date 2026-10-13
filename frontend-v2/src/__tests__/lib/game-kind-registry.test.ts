import { GAME_KIND_IDS, GAME_KIND_REGISTRY, scoreGameResponse, validateGameRound } from '../../lib/game-kind-registry';

describe('extensible cognitive game registry', () => {
  it('includes all requested kinds with valid JSON examples', () => {
    expect(GAME_KIND_IDS).toHaveLength(15);
    for (const kind of GAME_KIND_IDS) {
      expect(GAME_KIND_REGISTRY[kind].label).toBeTruthy();
      expect(validateGameRound(GAME_KIND_REGISTRY[kind].example)).toEqual([]);
    }
  });
  it('continues to accept legacy grid, motion and choice round data', () => {
    expect(validateGameRound({kind:'grid',prompt:'old grid',cells:[0,4,8]})).toEqual([]);
    expect(validateGameRound({kind:'motion',prompt:'old motion',path:[0,2,1]})).toEqual([]);
    expect(validateGameRound({kind:'choice',prompt:'old choice',choices:['A','B'],answer:1})).toEqual([]);
  });
  it('validates per-kind payload and scores structured responses', () => {
    expect(validateGameRound({kind:'target_detection',prompt:'find',target:'x',items:['o']})).not.toEqual([]);
    expect(scoreGameResponse({kind:'path_tracking',path:[0,3,6]},[0,3,6])).toBe(1);
    expect(scoreGameResponse({kind:'match_mismatch',isMatch:false},false)).toBe(1);
  });

  it('scores a correct response for every registered game kind', () => {
    for (const kind of GAME_KIND_IDS) {
      const round = GAME_KIND_REGISTRY[kind].example;
      let response: number | number[] | string[] | boolean | { reactionMs:number };
      switch (kind) {
        case 'grid': response = round.cells as number[]; break;
        case 'motion': response = (round.path as number[]).at(-1)!; break;
        case 'choice': case 'number_series': case 'pattern_completion': case 'rule_switching': case 'spatial_rotation': case 'rapid_classification': case 'coding_decoding': response = round.answer as number; break;
        case 'sequence_memory': response = round.sequence as string[]; break;
        case 'target_detection': response = (round.items as string[]).flatMap((item,index)=>item===round.target?[index]:[]); break;
        case 'match_mismatch': response = round.isMatch as boolean; break;
        case 'reaction_time': response = { reactionMs: 300 }; break;
        case 'go_no_go': response = (round.stimuli as string[]).flatMap((item,index)=>item===round.goStimulus?[index]:[]); break;
        case 'path_tracking': response = round.path as number[]; break;
      }
      expect(scoreGameResponse(round, response!)).toBe(1);
    }
  });
});
