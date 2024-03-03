import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Availability } from './availability'
import { Holiday } from './holiday'
import { Company } from './company'

@Entity({ name: 'offices' })
export class Office {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  company_code!: number

  @ManyToOne(() => Company, (company) => company.id)
  @JoinColumn({ name: 'company_code' })
  company!: Company

  @OneToMany(() => Availability, (availability) => availability.office_code)
  availabilities!: Availability[]

  @OneToMany(() => Holiday, (holiday) => holiday.office_code)
  holidays!: Holiday[]
}
