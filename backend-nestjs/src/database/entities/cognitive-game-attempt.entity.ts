import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('cognitive_game_attempts')
@Index(['userId', 'gameId', 'createdAt'])
export class CognitiveGameAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'game_id', type: 'varchar', length: 64 })
  gameId: string;

  @Column({ type: 'int' })
  score: number;

  @Column({ name: 'total_rounds', type: 'int' })
  totalRounds: number;

  @Column({ name: 'correct_rounds', type: 'int' })
  correctRounds: number;

  @Column({ name: 'duration_seconds', type: 'int' })
  durationSeconds: number;

  @Column({ type: 'jsonb', default: [] })
  responses: unknown[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
