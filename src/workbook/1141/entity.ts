import { Column, Entity, PrimaryColumn } from 'typeorm'

enum ActivityType {
  OPEN_SESSION = 'open_session',
  SCROLL_DOWN = 'scroll_down',
  END_SESSION = 'end_session',
  SEND_MESSAGE = 'send_message',
}

@Entity({ name: 'activity1141' })
export class Activity1141 {
  /**
  * ! This is a fake attribute
  * This is a workaround for TypeORM's `MissingPrimaryColumnError`
  **/
  @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
  id!: never;

  @Column()
  user_id!: number

  @Column()
  session_id!: number

  @Column('date')
  activity_date!: Date

  @Column({ type: 'enum', enum: ActivityType })
  activity_type!: ActivityType
}
