import { join } from 'path'
import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'passw0rd',
  database: 'test',
  schema: 'public',
  entities: [join(__dirname, '../**/entity.ts')],
}

export const AppDataSource = new DataSource(dbConfig)

export const initDataSource = async () => {
  console.info(`${initDataSource.name} start`)

  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }

    if (!AppDataSource.isInitialized) {
      throw new Error('DataSource initialize failed.')
    }
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    console.info(`${initDataSource.name} end`)
  }
}

export const closeDataSource = async () => {
  console.info(`${closeDataSource.name} start`)

  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy()
    }
  } catch (e) {
    console.warn(`DataSource close failed. because: ${e}`)
    throw e
  } finally {
    console.info(`${closeDataSource.name} end`)
  }
}
