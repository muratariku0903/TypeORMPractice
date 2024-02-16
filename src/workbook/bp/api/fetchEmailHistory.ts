import { DataSource, ObjectLiteral, SelectQueryBuilder } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { EmailHistory } from '../entities/email_history'
import { EmailHistoryItem } from '../entities/email_history_item'

type FetchEmailHistoryParams = {
  offset: number
  limit: number
  title: string | null
  target_email: string | null
  mail_status: string[] | null
  scheduled_send_datetime: string | null
  start_scheduled_date: string | null
  end_scheduled_date: string | null
  collect_by_title: boolean
}

const fetchEmailHistory = async (params: FetchEmailHistoryParams) => {
  let ds: DataSource | null = null
  const { collect_by_title, offset, limit } = params

  try {
    ds = await initDataSource({ schema: 'bp' })

    const selection = [
      'eh.mail_number as mail_number',
      'eh.mail_type as mail_type',
      'eh.scheduled_send_datetime as scheduled_send_datetime',
      'eh.mail_status as mail_status',
      'eh.title as title',
      'eh.body as body',
    ]

    let query: SelectQueryBuilder<EmailHistory | ObjectLiteral>
    let totalCount = 0

    // その場合は、メールNoは送信日時が一番若いものを取得する
    // メール番号でグループ化しなかったら集約した際に表示する表示最初のメール番号はどれなんだろうか？->送信日時が一番若いもの
    // メールNo.で集約したいけどな。処理的に。
    if (collect_by_title) {
      query = ds
        .createQueryBuilder()
        .select()
        .from((sub) => {
          const subQuery = whereQueryBuilder(sub.subQuery(), params)

          // パーティションしてランク付けして最初のレコードを取得
          return subQuery.select([
            // 送信予定日時が同時刻で重複することを想定して、メールNoもランクの評価基準に加える。
            'DENSE_RANK() OVER (PARTITION BY eh.mail_type, eh.mail_status, eh.title ORDER BY eh.scheduled_send_datetime, eh.mail_number) as scheduled_send_datetime_rank',
            'RANK() OVER (PARTITION BY eh.mail_type, eh.mail_status, eh.title ORDER BY eh.scheduled_send_datetime DESC, eh.mail_number DESC) as sending_count',
            ...selection,
          ])
        }, 'sq')
        .where('sq.scheduled_send_datetime_rank = 1')
        .groupBy('sq.mail_number')
        .addGroupBy('sq.mail_type')
        .addGroupBy('sq.mail_status')
        .addGroupBy('sq.scheduled_send_datetime')
        .addGroupBy('sq.title')
        .addGroupBy('sq.body')
        .addGroupBy('sq.scheduled_send_datetime_rank')
        .addGroupBy('sq.sending_count')

      const res = await query.getRawMany()
      totalCount = res.length
    } else {
      query = whereQueryBuilder(ds.createQueryBuilder(), params)
        .select([`'1' as sending_count`, ...selection])
        .groupBy('eh.mail_number')

      totalCount = await query.getCount()
    }

    const res = await query.offset(offset).limit(limit).getRawMany()
    console.log(res)
    console.log(`fetchCount: ${res.length}`)
    console.log(`totalCount: ${totalCount}`)
  } catch (e) {
    console.error(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

const whereQueryBuilder = <T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  params: FetchEmailHistoryParams
): SelectQueryBuilder<EmailHistory> => {
  const { title, target_email, mail_status, scheduled_send_datetime } = params

  // メール件名で曖昧検索
  if (title) {
    query.andWhere('eh.title LIKE :title', { title: `%${title}%` })
  }

  // メールアドレスで曖昧検索
  if (target_email) {
    query.andWhere('ehi.target_email LIKE :target_email', { target_email: `%${target_email}%` })
  }

  // ステータスでIN検索
  if (mail_status && mail_status.length > 0) {
    query.andWhere('eh.mail_status IN (:...mail_status)', { mail_status })
  }

  // 開始時刻
  if (scheduled_send_datetime) {
    query.andWhere('eh.scheduled_send_datetime >= :scheduled_send_datetime', { scheduled_send_datetime })
  }

  // return query
  return query.from(EmailHistory, 'eh').innerJoin(EmailHistoryItem, 'ehi', 'eh.mail_number = ehi.mail_number')
}

const params: FetchEmailHistoryParams = {
  // title: 'title',
  title: null,
  target_email: null,
  // target_email: 'taro@gmail.com',
  mail_status: null,
  // mail_status: ['COMPLETE'],
  // scheduled_send_datetime: null,
  scheduled_send_datetime: null,
  start_scheduled_date: null,
  end_scheduled_date: null,
  // collect_by_title: false,
  collect_by_title: true,
  offset: 0,
  limit: 2,
}
fetchEmailHistory(params)
