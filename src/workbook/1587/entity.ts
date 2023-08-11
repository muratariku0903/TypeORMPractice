import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'

@Entity({ name: 'users1587' })
export class Users1587 {
  @PrimaryColumn()
  account!: number

  @Column()
  name!: string

  @OneToMany(() => Transactions1587, (transaction) => transaction.account)
  transactions!: Transactions1587[]
}
@Entity({ name: 'transactions1587' })
export class Transactions1587 {
  @PrimaryColumn()
  trans_id!: number

  @Column()
  account!: number

  @Column()
  amount!: number

  @Column()
  transacted_on!: Date

  // 外部キーを定義
  @ManyToOne(() => Users1587, (user) => user.transactions)
  @JoinColumn({ name: 'account' })
  user!: Users1587
}
