import { Brackets, DataSource, IsNull } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { Ticket } from '../entities/ticket'
import { BasicInformation } from '../entities/basic_information'
import { Client } from 'pg'
import QueryStream from 'pg-query-stream'
import { stringify } from 'csv-stringify'
import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { pipeline, Transform } from 'stream'
import { promisify } from 'util'

const pipelineAsync = promisify(pipeline)
const s3Client = new S3Client({ region: 'ap-northeast-1' })

const dbClient = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'passw0rd',
  database: 'test',
})

const uploadParams = {
  Bucket: 'murata-test-0406',
  Key: 'test.csv',
  ContentType: 'text/csv',
}

const excute = async () => {
  let ds: DataSource | null = null

  try {
    ds = await initDataSource({ schema: 'bp' })

    await dbClient.connect()

    const queryBuilder = ds
      .createQueryBuilder(Ticket, 'ticket')
      .select(['ticket.ticket_number as ticket_number', 'ticket.contract_number as contract_number'])
    const [query, parameters] = queryBuilder.getQueryAndParameters()

    const queryStream = new QueryStream(query, parameters)
    const stream = dbClient.query(queryStream)

    // CSV変換ストリーム
    const csvTransformer = stringify({
      header: true,
      columns: ['ticket_number', 'contract_number'],
    })

    // S3アップロードストリーム
    const upload = new Upload({
      client: s3Client,
      params: {
        ...uploadParams,
        Body: csvTransformer,
      },
      partSize: 10 * 1024 * 1024, // 10MBパートサイズ
      leavePartsOnError: false,
    })

    await pipelineAsync(
      stream,
      new Transform({
        objectMode: true,
        transform: (row, _, callback) => {
          console.log(row)

          callback(null, {
            ticket_number: row.ticket_number,
            contract_number: row.contract_number,
          })
        },
      }),
      csvTransformer
    )

    await upload.done()
    console.log('Upload completed')
    dbClient.end()
    // stream.on('data', (row) => {
    //   console.log(row)
    // })

    // stream.on('end', () => {
    //   console.log('Stream ended')
    //   dbClient.end()
    // })
  } catch (e) {
    console.error(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

excute()
