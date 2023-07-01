import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: string

  @Column({ unique: true })
  url!: string

  @Column()
  title!: string

  @Column('text')
  content!: string

  @Column('varchar', { nullable: true })
  note!: string | null

  @Column({ default: 0 })
  start!: number

  @Column()
  created!: Date
}
