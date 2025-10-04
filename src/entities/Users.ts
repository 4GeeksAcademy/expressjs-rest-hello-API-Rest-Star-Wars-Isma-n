import {
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  ManyToMany, 
  BaseEntity, 
  JoinTable 
} from 'typeorm';
import { People } from '../entities/People';
import { Planet } from '../entities/Planet';

@Entity()
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToMany(() => People, people => people.favorited_by)
  @JoinTable({
    name: 'user_favorite_people',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'people_id', referencedColumnName: 'id' }
  })
  favorite_people: People[];

  @ManyToMany(() => Planet, planet => planet.favorited_by)
  @JoinTable({
    name: 'user_favorite_planets',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'planet_id', referencedColumnName: 'id' }
  })
  favorite_planets: Planet[];
}