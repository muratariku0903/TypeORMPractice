import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Office } from './office'
import dayjs from 'dayjs'

@Entity({ name: 'availabilities' })
export class Availability {
  @PrimaryColumn()
  office_code!: number

  @PrimaryColumn('date', {
    transformer: {
      from(value: string): string {
        return dayjs(value).format('YYYY-MM-DD')
      },
      to(value: string): string {
        return value
      },
    },
  })
  date!: string

  @PrimaryColumn()
  time_category!: string

  @PrimaryColumn()
  is_holiday!: boolean

  @Column()
  active_flg!: boolean

  @Column()
  register_count!: number

  @Column()
  max_register_count!: number

  @ManyToOne(() => Office, (office) => office.id)
  @JoinColumn({ name: 'office_code' })
  office!: Office
}
