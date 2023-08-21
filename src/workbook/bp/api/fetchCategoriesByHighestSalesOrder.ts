import { DataSource } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { BookSale } from '../entities/bookSale'
import { BookCategory } from '../entities/bookCategory'
import { Category } from '../entities/category'

const fetchCategoriesByHighestSalesOrder = async (limit?: number) => {
  let ds: DataSource | null = null

  try {
    ds = await initDataSource({ schema: 'sqlab' })

    const res = await ds
      .createQueryBuilder(BookSale, 'bs')
      .select('c.name', 'name')
      .addSelect('SUM(bs.price * bs.figure)', 'sales')
      .leftJoin(BookCategory, 'bc', 'bs.book_id = bc.book_id')
      .leftJoin(Category, 'c', 'bc.category_id = c.id')
      .groupBy('bc.category_id')
      .addGroupBy('c.name')
      .orderBy('sales', 'DESC')
      .limit(limit)
      .getRawMany()

    console.log(res)
  } catch (e) {
    console.error(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

fetchCategoriesByHighestSalesOrder(3)
