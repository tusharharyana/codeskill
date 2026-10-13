jest.mock('@nestjs/typeorm', () => ({ InjectRepository: () => () => undefined }));

import { BadRequestException } from '@nestjs/common';
import { GamesService } from './games.service';

describe('GamesService', () => {
  it('stores a completed score against the signed-in user', async () => {
    const repository: any = {
      create: jest.fn((value) => value),
      save: jest.fn(async (value) => ({ id: 'attempt-1', ...value })),
    };
    const service = new GamesService(repository, { findOne: jest.fn(async () => ({ slug: 'grid', isPublished: true })) } as any);

    const result = await service.createAttempt(
      { gameId: 'grid', score: 75, totalRounds: 4, correctRounds: 3, durationSeconds: 42 },
      { id: 'user-1' },
    );

    expect(result).toMatchObject({ userId: 'user-1', gameId: 'grid', score: 75 });
    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('rejects an impossible correct-round count', async () => {
    const repository: any = { create: jest.fn(), save: jest.fn() };
    const service = new GamesService(repository);

    await expect(
      service.createAttempt(
        { gameId: 'grid', score: 100, totalRounds: 4, correctRounds: 5, durationSeconds: 42 },
        { id: 'user-1' },
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('rejects attempts for unpublished or missing games', async () => {
    const attempts: any = { create: jest.fn(), save: jest.fn() };
    const games: any = { findOne: jest.fn(async () => null) };
    const service = new GamesService(attempts, games);
    await expect(service.createAttempt(
      { gameId: 'not-published', score: 50, totalRounds: 2, correctRounds: 1, durationSeconds: 20 },
      { id: 'student-1' },
    )).rejects.toBeInstanceOf(BadRequestException);
    expect(attempts.save).not.toHaveBeenCalled();
  });

  it('calculates scores from configured rounds when responses are supplied', async () => {
    const attempts: any = {
      create: jest.fn((value) => value),
      save: jest.fn(async (value) => value),
    };
    const rounds = [
      { kind: 'choice', prompt: 'Pick B', choices: ['A', 'B'], answer: 1 },
      { kind: 'reaction_time', prompt: 'Tap quickly', targetDelayMs: 500, maxResponseMs: 700 },
    ];
    const games: any = { findOne: jest.fn(async () => ({ slug: 'test', rounds, isPublished: true })) };
    const service = new GamesService(attempts, games);
    const result = await service.createAttempt({
      gameId: 'test', score: 0, totalRounds: 2, correctRounds: 0, durationSeconds: 20,
      responses: [1, { reactionMs: 350 }],
    }, { id: 'student-2' });
    expect(result).toMatchObject({ userId: 'student-2', score: 100, correctRounds: 2, responses: [1, { reactionMs: 350 }] });
  });
});
