import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BookSale } from './bookSale'
import { BookCategory } from './bookCategory'

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

  @OneToMany(() => BookSale, (bs) => bs.book_id)
  book_sales!: BookSale[]

  @OneToMany(() => BookCategory, (bc) => bc.book_id)
  book_categories!: BookCategory[]
}
