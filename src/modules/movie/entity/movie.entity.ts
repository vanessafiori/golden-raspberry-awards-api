import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'movie' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'year' })
  year: number;

  @Column({ name: 'title', unique: true })
  title: string;

  @Column({ name: 'studio' })
  studio: string;

  @Column({ name: 'producer' })
  producer: string;

  @Column({ name: 'winner', default: false })
  winner: boolean;
}
