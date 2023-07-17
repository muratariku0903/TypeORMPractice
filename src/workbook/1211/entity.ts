import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'queries1211' })
export class Queries1211 {
  /**
   * ! This is a fake attribute
   * This is a workaround for TypeORM's `MissingPrimaryColumnError`
   **/
  @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
  id!: never

  @Column()
  query_name!: string

  @Column()
  result!: string

  @Column()
  position!: number

  @Column()
  rating!: number
}
