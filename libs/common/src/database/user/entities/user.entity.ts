import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class users {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column('varchar')
  Uid: string;

  @Column('varchar')
  FirstName: string;

  @Column('varchar')
  LastName: string;

  @Column('varchar')
  Username: string;

  @Column('varchar')
  Email: string;

  @Column('varchar')
  Password: string;

  @CreateDateColumn()
  DateCreated: Date;

  @Column('varchar')
  Role: string;
}
