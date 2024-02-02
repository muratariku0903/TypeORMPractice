import { DataSource, SelectQueryBuilder } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { EmailHistory } from '../entities/email_history'
import { EmailHistoryItem } from '../entities/email_history_item'

type FetchEmailHistoryParams = {
  collectByTitle: boolean
}

const fetchEmailHistory = async (params: FetchEmailHistoryParams) => {
  let ds: DataSource | null = null
  const { collectByTitle } = params

  try {
    ds = await initDataSource({ schema: 'bp' })

    const selection = [
      'eh.mail_type as mail_type',
      'eh.mail_status as mail_status',
      'eh.title as title',
      `${collectByTitle ? 'count(distinct ehi.target_email)' : '1'} as sending_count`, // sending_countは集約した件数
    ]

    let query: SelectQueryBuilder<EmailHistory> = ds
      .createQueryBuilder(EmailHistory, 'eh')
      .innerJoin(EmailHistoryItem, 'ehi', 'eh.mail_number = ehi.mail_number')

    // 件名で集約があった場合は「件名・メール種別・ステータス」にて集約
    // その場合は、メールNoは送信日時が一番若いものを取得する
    // メール番号でグループ化しなかったら集約した際に表示する表示最初のメール番号はどれなんだろうか？
    // もし、同様のメール内容を2回に分けてグループ送信した場合、1回目のメール送信履歴しか表示されないけどそれで問題ないのでしょうか？
    // 例えば、
    // メール番号:AAA 件名:テスト ステータス：BEFORE 種別: MANUAL 集約件数:3
    // メール番号:BBB 件名:テスト ステータス：BEFORE 種別: MANUAL 集約件数:2
    // という履歴が存在していたとしても、集約した結果、AAAのものしか表示されません。
    // メールNo.で集約したいけどな。処理的に。
    if (collectByTitle) {
      query = query
        .select(['eh.mail_number as mail_number', ...selection])
        .groupBy('eh.title')
        .addGroupBy('eh.mail_type')
        .addGroupBy('eh.mail_status')
    } else {
      query = query
        .select([
          'eh.mail_number as mail_number',
          'eh.scheduled_send_datetime as scheduled_send_datetime',
          ...selection,
        ])
        .groupBy('eh.mail_number')
    }

    const res = await query.orderBy('eh.scheduled_send_datetime', 'DESC').getRawMany()

    console.log(res)
    console.log(res.length)
  } catch (e) {
    console.error(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

const params: FetchEmailHistoryParams = { collectByTitle: false }
fetchEmailHistory(params)

// import { DataSource, SelectQueryBuilder } from 'typeorm'
// import { closeDataSource, initDataSource } from '../../../common/db'
// import { EmailHistory } from '../entities/email_history'
// import { EmailHistoryItem } from '../entities/email_history_item'

// type FetchEmailHistoryParams = {
//   collectByTitle: boolean
// }

// const fetchEmailHistory = async (params: FetchEmailHistoryParams) => {
//   let ds: DataSource | null = null
//   const { collectByTitle } = params

//   try {
//     ds = await initDataSource({ schema: 'bp' })

//     const selection = [
//       'eh.mail_type as mail_type',
//       'eh.mail_status as mail_status',
//       'eh.title as title',
//       'count(distinct ehi.target_email) as sending_count',
//     ]

//     let query: SelectQueryBuilder<EmailHistory> = ds
//       .createQueryBuilder(EmailHistory, 'eh')
//       .innerJoin(EmailHistoryItem, 'ehi', 'eh.mail_number = ehi.mail_number')

//     // 件名で集約があった場合は「件名・メール種別・ステータス」にて集約
//     // その場合は、メールNoは送信日時が一番若いものを取得する
//     // メール番号でグループ化しなかったら集約した際に表示する表示最初のメール番号はどれなんだろうか？
//     // もし、同様のメール内容を2回に分けてグループ送信した場合、1回目のメール送信履歴しか表示されないけどそれで問題ないのでしょうか？
//     // 例えば、
//     // メール番号:AAA 件名:テスト ステータス：BEFORE 種別: MANUAL 集約件数:3
//     // メール番号:BBB 件名:テスト ステータス：BEFORE 種別: MANUAL 集約件数:2
//     // という履歴が存在していたとしても、集約した結果、AAAのものしか表示されません。
//     // メールNo.で集約したいけどな。処理的に。
//     if (collectByTitle) {
//       query = query
//         .select(['eh.mail_number as mail_number', ...selection])
//         .groupBy('eh.title')
//         .addGroupBy('eh.mail_type')
//         .addGroupBy('eh.mail_status')
//     } else {
//       query = query
//         .select([
//           'eh.mail_number as mail_number',
//           'eh.scheduled_send_datetime as scheduled_send_datetime',
//           ...selection,
//         ])
//         .groupBy('eh.mail_number')
//         .addGroupBy('ehi.target_email')
//     }

//     const res = await query.orderBy('eh.scheduled_send_datetime', 'DESC').getRawMany()

//     console.log(res)
//     console.log(res.length)
//   } catch (e) {
//     console.error(e)
//   } finally {
//     if (ds) {
//       await closeDataSource(ds)
//     }
//   }
// }

// const params: FetchEmailHistoryParams = { collectByTitle: false }
// fetchEmailHistory(params)
