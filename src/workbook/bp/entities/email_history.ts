import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { EmailHistoryItem } from './email_history_item'

@Entity({ name: 'email_histories' })
export class EmailHistory {
  @PrimaryGeneratedColumn()
  mail_number!: string

  @Column()
  mail_type!: string

  @Column()
  mail_status!: string

  @Column()
  scheduled_send_datetime!: Date

  @Column()
  title!: string

  @Column()
  body!: string

  @OneToMany(() => EmailHistoryItem, (emailHistoryItem) => emailHistoryItem.mail_number)
  availabilities!: EmailHistoryItem[]
}
