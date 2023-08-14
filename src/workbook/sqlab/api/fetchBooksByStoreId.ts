import { DataSource } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { Book } from '../entities/book'
import { BookSale } from '../entities/bookSale'
import { Store } from '../entities/store'

const fetchBooksByStoreId = async (storeId: number) => {
  let ds: DataSource | null = null

  try {
    ds = await initDataSource({ schema: 'sqlab' })

    const subQuery = ds
      .createQueryBuilder(BookSale, 'bs')
      .select('DISTINCT bs.book_id')
      .innerJoin(Store, 's', 'bs.store_id = s.id')
      .where(`s.id != ${storeId}`)
      .getQuery()

    const res = await ds.createQueryBuilder(Book, 'b').where(`b.id not in (${subQuery})`).select('b.name').getRawMany()

    console.log(res)
  } catch (e) {
    console.error(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

fetchBooksByStoreId(3)
