import { DataSource } from 'typeorm'
import { closeDataSource, initDataSource } from '../../common/db'
import { Book } from './entities/book'

const solve = async () => {
  let ds: DataSource | null = null

  try {
    ds = await initDataSource({ schema: 'sqlab' })

    const res = await ds.createQueryBuilder(Book, 'b').getMany()

    console.log(res)
  } catch (e) {
    console.error(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

solve()
