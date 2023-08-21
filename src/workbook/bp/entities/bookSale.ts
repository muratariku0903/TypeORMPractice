import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from './book'
import { Store } from './store'

@Entity({ name: 'book_sales' })
export class BookSale {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  book_id!: number

  @Column()
  store_id!: number

  @Column()
  price!: number

  @Column()
  stock!: number

  @Column()
  figure!: number

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  book!: Book

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store_id' })
  store!: Store
}
