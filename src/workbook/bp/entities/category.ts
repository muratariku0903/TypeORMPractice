import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BookSale } from './bookSale'
import { BookCategory } from './bookCategory'

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @OneToMany(() => BookCategory, (bc) => bc.category_id)
  book_categories!: BookCategory[]
}
