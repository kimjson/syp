import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";

import User from "@/entity/user";

@Entity()
export default class Page extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    url!: string;

    @Column("text", {nullable: true})
    description?: string;

    @Column({nullable: true})
    date?: Date;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne(() => User, user => user.pages)
    @JoinColumn({name : 'userId', referencedColumnName: 'id'})
    user!: any;

    @Column({default: false})
    isRead!: boolean;
}
