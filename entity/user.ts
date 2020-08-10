import {Entity, OneToMany, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import Adapters from "next-auth/adapters"

import Page from '@/entity/page';

const {schema} = Adapters.TypeORM.Models.User

export const UserSchema = {
  ...schema,
  relations: {
    pages: {
      target: "Page",
      type: "one-to-many",
      cascade: true,
    }   
  }
}


@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: true})
  name?: string

  @Column({unique: true, nullable: true})
  email?: string

  @Column({type: 'datetime', nullable: true})
  emailVerified?: Date;

  @Column({nullable: true})
  image?: string

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(type => Page, page => page.user)
  pages!: Page[];
}