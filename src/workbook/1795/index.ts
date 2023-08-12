import { DataSource } from 'typeorm'
import { closeDataSource, initDataSource } from '../../common/db'
import { Products1795 } from './entity'

const solve = async () => {
  let ds: DataSource | null = null

  try {
    ds = await initDataSource()

    // 発行したいクエリ↓
    // SELECT product_id, 'store1' AS store, store1 AS price
    // FROM Products
    // WHERE store1 IS NOT NULL
    // UNION
    // SELECT product_id, 'store2' AS store, store2 AS price
    // FROM Products
    // WHERE store2 IS NOT NULL
    // UNION
    // SELECT product_id, 'store3' AS store, store3 AS price
    // FROM Products
    // WHERE store3 IS NOT NULL;

    const queries = [
      ds
        .createQueryBuilder(Products1795, 'p')
        .select('p.product_id', 'product_id')
        .addSelect('store1', 'store')
        // .addSelect('"store1" as store')
        .addSelect('p.store1', 'price')
        .where('p.store1 IS NOT NULL')
        .getQuery(),
      ds
        .createQueryBuilder(Products1795, 'p')
        .select('p.product_id', 'product_id')
        .addSelect('store2', 'store')
        .addSelect('p.store2', 'price')
        .where('p.store2 IS NOT NULL')
        .getQuery(),
      ds
        .createQueryBuilder(Products1795, 'p')
        .select('p.product_id', 'product_id')
        .addSelect('store3', 'store')
        .addSelect('p.store3', 'price')
        .where('p.store3 IS NOT NULL')
        .getQuery(),
    ]

    const unionQuery = queries.join(' UNION ')

    console.log(unionQuery)

    // const query = ds.createQueryBuilder().select('product_id,store,price').from(unionQuery, '')
    // console.log(query.getQuery())

    const query = await ds.query(unionQuery)

    console.log(query)

    // const q = ds.createQueryBuilder().select('uq.product_id, uq.store, uq.price').from(unionQuery, 'uq')
    // console.log(q.getQuery())
    // console.log(t)

    return

    // console.log(res)
  } catch (e) {
    console.log(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

solve()
