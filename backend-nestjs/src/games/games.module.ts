import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CognitiveGameAttempt } from '../database/entities/cognitive-game-attempt.entity';
import { CognitiveGame } from '../database/entities/cognitive-game.entity';
import { GamesController } from './games.controller';
import { GamesAdminController } from './games-admin.controller';
import { GamesService } from './games.service';

@Module({
  imports: [TypeOrmModule.forFeature([CognitiveGameAttempt, CognitiveGame])],
  controllers: [GamesController, GamesAdminController],
  providers: [GamesService],
})
export class GamesModule {}
