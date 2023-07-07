import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'views' })
export class View {
  @PrimaryColumn()
  article_id!: number
  @Column()
  author_id!: number
  @Column()
  viewer_id!: number
  @Column('date')
  view_date!: Date
}
