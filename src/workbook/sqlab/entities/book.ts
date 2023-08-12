import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  release_year!: number

  @Column()
  total_page!: number

  // @OneToMany(() => Transactions1587, (transaction) => transaction.account)
  // transactions!: Transactions1587[]
}
