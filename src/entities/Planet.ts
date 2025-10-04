import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  BaseEntity
} from 'typeorm';
import { Users } from './Users';

@Entity()
export class Planet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  diameter: string;

  @Column({ nullable: true })
  rotation_period: string;

  @Column({ nullable: true })
  orbital_period: string;

  @Column({ nullable: true })
  gravity: string;

  @Column({ nullable: true })
  population: string;

  @Column({ nullable: true })
  climate: string;

  @Column({ nullable: true })
  terrain: string;

  @Column({ nullable: true })
  surface_water: string;

  @Column({ nullable: true })
  url: string;

  // Relación Many-to-Many con Users (usuarios que lo tienen como favorito)
  @ManyToMany(() => Users, user => user.favorite_planets)
  favorited_by: Users[];
}