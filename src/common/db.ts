import { join } from 'path'
import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'passw0rd',
  database: 'test',
  schema: 'public',
  entities: [join(__dirname, '../**/entity.ts'), join(__dirname, '../**/entities/**.ts')],
  logging: true,
}

export const initDataSource = async (param?: DataCustomSourceParam): Promise<DataSource> => {
  console.info(`${initDataSource.name} start`)

  let ds
  let config = dbConfig
  if (param) {
    if (param.schema) {
      config = { ...config, schema: param.schema }
    }

    ds = new DataSource(config)
  }

  if (!ds) {
    throw new Error('Failed DataSource instanced.')
  }

  try {
    if (!ds.isInitialized) {
      await ds.initialize()
    }

    if (!ds.isInitialized) {
      throw new Error('DataSource initialize failed.')
    }

    return ds
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    console.info(`${initDataSource.name} end`)
  }
}

export const closeDataSource = async (ds: DataSource): Promise<void> => {
  console.info(`${closeDataSource.name} start`)

  try {
    if (ds.isInitialized) {
      await ds.destroy()
    }
  } catch (e) {
    console.warn(`DataSource close failed. because: ${e}`)
    throw e
  } finally {
    console.info(`${closeDataSource.name} end`)
  }
}

type DataCustomSourceParam = {
  schema?: string
}
