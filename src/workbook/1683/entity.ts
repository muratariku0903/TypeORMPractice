import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'tweets1683' })
export class Tweets1683 {
  @PrimaryColumn()
  id!: number

  @Column()
  content!: string
}
