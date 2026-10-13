import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('cognitive_games')
export class CognitiveGame {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true, length: 64 }) slug: string;
  @Column({ length: 120 }) title: string;
  @Column({ name: 'short_description', type: 'text', default: '' }) shortDescription: string;
  @Column({ type: 'text', default: '' }) description: string;
  @Column({ length: 32, default: 'cyan' }) color: string;
  @Column({ length: 16, default: '✦' }) icon: string;
  @Column({ name: 'duration_seconds', type: 'int', default: 120 }) durationSeconds: number;
  @Column({ type: 'jsonb', default: [] }) rounds: any[];
  @Column({ name: 'is_published', default: false }) isPublished: boolean;
  @Column({ name: 'is_deleted', default: false }) isDeleted: boolean;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
