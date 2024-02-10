import { DataSource } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { EmailHistory } from '../entities/email_history'
import { EmailHistoryItem } from '../entities/email_history_item'

type UpdateEmailHistoryItemParams = {
  target_email: string
  mail_status: string
}

type UpdateEmailHistoryParams = {
  mail_number: string
  mail_type: string
  title: string
  body: string
  mail_status: string
  update_emails: UpdateEmailHistoryItemParams[]
}

const updateEmailHistory = async (params: UpdateEmailHistoryParams) => {
  let ds: DataSource | null = null

  const { mail_number, mail_type, title, body, mail_status, update_emails } = params

  try {
    ds = await initDataSource({ schema: 'bp' })

    // email_historyを更新
    const emailHistoryRepository = ds.getRepository(EmailHistory)
    await emailHistoryRepository.update(mail_number, {
      mail_type,
      title,
      body,
      mail_status,
    })

    // email_history_itemを更新
    const emailHistoryItemRepository = ds.getRepository(EmailHistoryItem)

    // 一旦全ての宛先のステータスを論理削除する
    await emailHistoryItemRepository
      .createQueryBuilder()
      .update()
      .set({ delete_flg: true })
      .where({ mail_number })
      .execute()

    // 送られてきたリクエストで再び宛先レコード群を更新
    const upsertParams = []
    for (const item of update_emails) {
      upsertParams.push({
        mail_number,
        ...item,
        delete_flg: false,
      })
    }
    console.log(upsertParams)
    // upsertの第二引数に指定するのはユニーク制約になっているカラム、今回の場合は「mail_number」と「target_email」になる。
    await emailHistoryItemRepository.upsert(upsertParams, ['mail_number', 'target_email'])
  } catch (e) {
    console.error(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

const params: UpdateEmailHistoryParams = {
  mail_number: '20240210-7874',
  mail_type: 'MANUAL',
  title: 'test title',
  body: 'test body',
  mail_status: 'CANCEL',
  update_emails: [
    {
      target_email: 'masa@gmail.com',
      mail_status: 'COMPLETE',
    },
    {
      target_email: 'ren@gmail.com',
      mail_status: 'COMPLETE',
    },
    {
      target_email: 'kei@gmail.com',
      mail_status: 'COMPLETE',
    },
    // {
    //   target_email: 'ken@gmail.com',
    //   mail_status: 'BEFORE_SENDING',
    // },
  ],
}
updateEmailHistory(params)
