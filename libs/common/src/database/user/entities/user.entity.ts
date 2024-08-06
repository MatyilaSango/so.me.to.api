import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column('varchar')
  Uuid: string;

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

  @UpdateDateColumn()
  DateUpdated: Date;

  @Column('varchar')
  Role: string;
}
