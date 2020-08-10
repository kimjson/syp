import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";

import User from '@/entity/user';

@Entity()
export default class Page extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title?: string;

    @Column()
    url?: string;
    @Column("text")
    description?: string;

    @Column()
    date?: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(type => User, user => user.pages)
    user!: any;
}
