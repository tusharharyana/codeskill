import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../common/guards/admin.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { SaveCognitiveGameDto } from './dto/save-cognitive-game.dto';
import { GamesService } from './games.service';

@ApiTags('Cognitive Games Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin/games')
export class GamesAdminController {
  constructor(private readonly games: GamesService) {}
  @Get() list() { return this.games.listAdmin(); }
  @Get('attempts') attempts(@Query('gameId') gameId?: string, @Query('studentId') studentId?: string) { return this.games.listAdminAttempts(gameId, studentId); }
  @Post() create(@Body() dto: SaveCognitiveGameDto) { return this.games.createGame(dto); }
  @Put(':id') update(@Param('id') id: string, @Body() dto: Partial<SaveCognitiveGameDto>) { return this.games.updateGame(id, dto); }
  @Delete(':id') delete(@Param('id') id: string) { return this.games.deleteGame(id); }
}
