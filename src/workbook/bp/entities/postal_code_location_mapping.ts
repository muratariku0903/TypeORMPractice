import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { Office } from './office'

@Entity({ name: 'postal_code_location_mapping' })
export class PostalCodeLocationMapping {
  @PrimaryColumn()
  postal_code!: string

  @PrimaryColumn()
  office_code!: number

  @OneToOne(() => Office, (office) => office.id)
  @JoinColumn({ name: 'office_code' })
  office!: Office
}
