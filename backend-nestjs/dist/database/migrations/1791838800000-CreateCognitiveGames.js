"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCognitiveGames1791838800000 = void 0;
class CreateCognitiveGames1791838800000 {
    name = 'CreateCognitiveGames1791838800000';
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS cognitive_games (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        slug varchar(64) NOT NULL UNIQUE,
        title varchar(120) NOT NULL,
        short_description text NOT NULL DEFAULT '',
        description text NOT NULL DEFAULT '',
        color varchar(32) NOT NULL DEFAULT 'cyan',
        icon varchar(16) NOT NULL DEFAULT '✦',
        duration_seconds integer NOT NULL DEFAULT 120,
        rounds jsonb NOT NULL DEFAULT '[]'::jsonb,
        is_published boolean NOT NULL DEFAULT false,
        is_deleted boolean NOT NULL DEFAULT false,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `);
        await queryRunner.query('ALTER TABLE cognitive_game_attempts ALTER COLUMN game_id TYPE varchar(64)');
        await queryRunner.query("ALTER TABLE cognitive_game_attempts ADD COLUMN IF NOT EXISTS responses jsonb NOT NULL DEFAULT '[]'::jsonb");
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE cognitive_game_attempts ALTER COLUMN game_id TYPE varchar(32)');
        await queryRunner.query('ALTER TABLE cognitive_game_attempts DROP COLUMN IF EXISTS responses');
        await queryRunner.query('DROP TABLE IF EXISTS cognitive_games');
    }
}
exports.CreateCognitiveGames1791838800000 = CreateCognitiveGames1791838800000;
//# sourceMappingURL=1791838800000-CreateCognitiveGames.js.map