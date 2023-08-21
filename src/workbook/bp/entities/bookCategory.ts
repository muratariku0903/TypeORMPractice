import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Book } from './book'
import { Category } from './category'

@Entity({ name: 'book_categories' })
export class BookCategory {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  book_id!: number

  @Column()
  category_id!: number

  @ManyToOne(() => Book)
  @JoinColumn({ name: 'book_id' })
  book!: Book

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category!: Category
}
