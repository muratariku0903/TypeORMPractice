import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'prices1251' })
export class Prices1251 {
  /**
   * ! This is a fake attribute
   * This is a workaround for TypeORM's `MissingPrimaryColumnError`
   **/
  @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
  id!: never

  @Column()
  product_id!: number

  @Column()
  start_date!: Date

  @Column()
  end_date!: Date

  @Column()
  price!: number
}

@Entity({ name: 'unitssold1251' })
export class UnitsSold1251 {
  /**
   * ! This is a fake attribute
   * This is a workaround for TypeORM's `MissingPrimaryColumnError`
   **/
  @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
  id!: never

  @Column()
  product_id!: number

  @Column()
  units!: number

  @Column()
  purchase_date!: Date
}
