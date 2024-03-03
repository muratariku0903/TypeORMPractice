import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Office } from './office'

@Entity({ name: 'company' })
export class Company {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @OneToMany(() => Office, (office) => office.company_code)
  offices!: Office[]
}
