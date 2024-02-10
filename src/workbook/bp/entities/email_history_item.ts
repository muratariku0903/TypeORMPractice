import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { EmailHistory } from './email_history'

@Entity({ name: 'email_history_item' })
export class EmailHistoryItem {
  @PrimaryColumn()
  mail_number!: string

  @PrimaryColumn()
  target_email!: string

  @Column()
  mail_status!: string

  @Column()
  delete_flg!: boolean

  @ManyToOne(() => EmailHistory, (emailHistory) => emailHistory.mail_number)
  @JoinColumn({ name: 'mail_number' })
  emailHistory!: EmailHistory
}
