import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  BaseEntity
} from 'typeorm';
import { Users } from './Users';

@Entity()
export class People extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  birth_year: string;

  @Column({ nullable: true })
  eye_color: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  hair_color: string;

  @Column({ nullable: true })
  height: string;

  @Column({ nullable: true })
  mass: string;

  @Column({ nullable: true })
  skin_color: string;

  @Column({ nullable: true })
  homeworld: string;

  @Column({ nullable: true })
  url: string;

  // Relación Many-to-Many con Users (usuarios que lo tienen como favorito)
  @ManyToMany(() => Users, user => user.favorite_people)
  favorited_by: Users[];
}