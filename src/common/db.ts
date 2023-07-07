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
}

const AppDataSource = new DataSource(dbConfig)

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
  } finally {
    console.info(`${initDataSource.name} end`)
    console.log('hello')
  }
}

export const closeDataSource = async () => {
  // conso
}
