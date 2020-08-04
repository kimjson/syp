import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export default class Page extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    url?: string;

    @Column()
    title?: string;

    @Column("text")
    description?: string;

    @Column()
    date!: Date;

    @CreateDateColumn()
    createdAt!: Date;

}
