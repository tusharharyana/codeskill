import { GAME_KINDS, scoreGameRound, validateGameRound } from './game-kind-registry';

describe('game kind registry', () => {
  it('accepts and validates examples for all registered kinds', () => {
    expect(GAME_KINDS).toHaveLength(15);
    const cases: Record<string, Record<string, unknown>> = {
      grid:{kind:'grid',prompt:'grid',cells:[0,4]}, motion:{kind:'motion',prompt:'motion',path:[0,2]}, choice:{kind:'choice',prompt:'choice',choices:['a','b'],answer:1},
      sequence_memory:{kind:'sequence_memory',prompt:'sequence',sequence:['a','b'],choices:['a','b','c']}, target_detection:{kind:'target_detection',prompt:'target',target:'x',items:['x','o']},
      match_mismatch:{kind:'match_mismatch',prompt:'match',stimulusA:'a',stimulusB:'a',isMatch:true}, number_series:{kind:'number_series',prompt:'number',sequence:[1,2],choices:['3','4'],answer:0},
      pattern_completion:{kind:'pattern_completion',prompt:'pattern',pattern:['x','y'],choices:['x','y'],answer:0}, rule_switching:{kind:'rule_switching',prompt:'rule',instruction:'even',stimulus:'2',choices:['yes','no'],answer:0},
      spatial_rotation:{kind:'spatial_rotation',prompt:'space',shape:['xx','x '],choices:['left','right'],answer:0}, rapid_classification:{kind:'rapid_classification',prompt:'classify',stimulus:'pear',choices:['fruit','tool'],answer:0},
      coding_decoding:{kind:'coding_decoding',prompt:'decode',instruction:'shift',encoded:'b',choices:['a','c'],answer:0}, reaction_time:{kind:'reaction_time',prompt:'react',targetDelayMs:500,maxResponseMs:1000},
      go_no_go:{kind:'go_no_go',prompt:'go',stimuli:['go','stop'],goStimulus:'go'}, path_tracking:{kind:'path_tracking',prompt:'path',path:[0,1,4]},
    };
    for (const round of Object.values(cases)) expect(validateGameRound(round)).toBeUndefined();
  });

  it('scores recall, detection, inhibition and reaction responses', () => {
    expect(scoreGameRound({kind:'grid',cells:[0,2]},[0,2])).toBe(1);
    expect(scoreGameRound({kind:'target_detection',target:'X',items:['X','O','X']},[0,2])).toBe(1);
    expect(scoreGameRound({kind:'go_no_go',goStimulus:'go',stimuli:['go','stop']},[0])).toBe(1);
    expect(scoreGameRound({kind:'reaction_time',maxResponseMs:500},{reactionMs:350})).toBe(1);
    expect(scoreGameRound({kind:'reaction_time',maxResponseMs:500},{reactionMs:800})).toBe(0);
  });
});
