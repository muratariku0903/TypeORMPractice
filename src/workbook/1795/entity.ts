import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'products1795' })
export class Products1795 {
  @PrimaryColumn()
  product_id!: number

  @Column()
  store1!: number

  @Column()
  store2!: number

  @Column()
  store3!: number
}
