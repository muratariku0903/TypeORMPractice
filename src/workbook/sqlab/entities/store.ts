import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BookSale } from './bookSale'

enum HolidayType {
  MONDAY = '月曜日',
  TUESDAY = '火曜日',
  WEDNESDAY = '水曜日',
  THURSDAY = '木曜日',
  FRIDAY = '金曜日',
  SATURDAY = '土曜日',
  SUNDAY = '日曜日',
  NONE = '年中無休',
  NULL = 'ー',
}

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column({ type: 'enum', enum: HolidayType })
  holiday!: HolidayType

  @OneToMany(() => BookSale, (bs) => bs.store_id)
  book_sales!: BookSale[]
}
