import {Entity, OneToMany, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import Adapters from "next-auth/adapters"

import Page from '@src/entity/page';
import Collection from '@src/entity/collection';

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


@Entity({name: 'users'})
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({nullable: true})
  name?: string

  @Column({unique: true, nullable: true})
  email?: string

  @Column({name: 'email_verified', type: 'datetime', nullable: true})
  emailVerified?: Date;

  @Column({nullable: true})
  image?: string

  @CreateDateColumn({name: 'created_at'})
  createdAt!: Date;

  @UpdateDateColumn({name: 'updated_at'})
  updatedAt!: Date;

  @OneToMany(() => Page, page => page.user)
  pages?: Page[];
}