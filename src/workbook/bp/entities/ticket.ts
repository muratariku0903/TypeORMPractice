import { Column, Entity, PrimaryColumn } from 'typeorm'

enum ApplicationType {
  OPEN = 'OPEN',
  RESTART = 'RESTART',
  PAUSE = 'PAUSE',
  CLOSE = 'CLOSE',
}

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryColumn()
  ticket_number!: number

  @Column()
  contract_number!: number

  @Column()
  application_type!: ApplicationType
}
