import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Availability } from './availability'
import { Holiday } from './holiday'

@Entity({ name: 'offices' })
export class Office {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @OneToMany(() => Availability, (availability) => availability.office_code)
  availabilities!: Availability[]

  @OneToMany(() => Holiday, (holiday) => holiday.office_code)
  holidays!: Holiday[]
}
