import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { File } from './File';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  secret: string;
  @ManyToMany(() => File)
  // what is @JoinTable?
  @JoinTable()
  files: Promise<File[]>;
}
