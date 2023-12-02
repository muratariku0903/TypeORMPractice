import { Column, Entity, PrimaryColumn } from 'typeorm'

export enum BasicInformationType {
  RECEIPT = 'RECEIPT',
  CONTRACT = 'CONTRACT',
}

@Entity({ name: 'basic_information' })
export class BasicInformation {
  @PrimaryColumn()
  ticket_number!: number

  @PrimaryColumn()
  basic_information_type!: BasicInformationType

  @Column()
  name!: string

  @Column()
  address!: string
}
