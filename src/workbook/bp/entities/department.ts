import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Office } from './office'

@Entity({ name: 'department' })
export class Department {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  office_code!: number

  @Column()
  type!: string

  @ManyToOne(() => Office, (office) => office.id)
  @JoinColumn({ name: 'office_code' })
  company!: Office
}
