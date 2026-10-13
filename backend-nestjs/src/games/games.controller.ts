import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateGameAttemptDto } from './dto/create-game-attempt.dto';
import { GamesService } from './games.service';

@ApiTags('Cognitive Games')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('games')
export class GamesController {
  constructor(private readonly games: GamesService) {}

  @Get()
  listPublished() { return this.games.listPublished(); }

  @Get(':slug')
  getPublished(@Param('slug') slug: string) { return this.games.getPublished(slug); }

  @Get('attempts/me')
  @ApiOperation({ summary: 'Get the current user’s cognitive game history' })
  getMyAttempts(@CurrentUser() user: any) {
    return this.games.getMyAttempts(user);
  }

  @Post('attempts')
  @ApiOperation({ summary: 'Save a completed cognitive game attempt' })
  createAttempt(@Body() dto: CreateGameAttemptDto, @CurrentUser() user: any) {
    return this.games.createAttempt(dto, user);
  }
}
