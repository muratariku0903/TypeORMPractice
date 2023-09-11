import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Office } from './office'

@Entity({ name: 'holidays' })
export class Holiday {
  @PrimaryColumn()
  office_code!: number

  @PrimaryColumn()
  date!: string

  @ManyToOne(() => Office)
  @JoinColumn({ name: 'office_code' })
  office!: Office
}
