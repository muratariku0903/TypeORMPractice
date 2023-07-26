import { AppDataSource, closeDataSource, initDataSource } from '../../common/db'
import { Products1795 } from './entity'

const solve = async () => {
  try {
    await initDataSource()

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
      `(${AppDataSource.createQueryBuilder(Products1795, 'p')
        // .select('p.product_id AS product_id')
        .select('p.product_id', 'product_id')
        .addSelect('store1', 'store')
        .addSelect('p.store1', 'price')
        .where('p.store1 IS NOT NULL')
        // .getQuery()})`,
        .getQuery()}) AS Q1`,
      `(${AppDataSource.createQueryBuilder(Products1795, 'p')
        .select('p.product_id', 'product_id')
        .addSelect('store2', 'store')
        .addSelect('p.store2', 'price')
        .where('p.store2 IS NOT NULL')
        // .getQuery()})`,
        .getQuery()}) AS Q2`,
      `(${AppDataSource.createQueryBuilder(Products1795, 'p')
        .select('p.product_id', 'product_id')
        .addSelect('store3', 'store')
        .addSelect('p.store3', 'price')
        .where('p.store3 IS NOT NULL')
        // .getQuery()})`,
        .getQuery()}) AS Q3`,
    ]

    const unionQuery = queries.join(' UNION ')
    console.log(unionQuery)

    const res = await AppDataSource.createQueryBuilder()
      .select('product_id, store, price')
      .from(unionQuery, 'uq')
      // .addFrom(`(${store2Query})`, 'q2')
      // .addFrom(`(${store3Query})`, 'q3')
      // // .where('1=0')
      // .orWhere('product_id = q1.product_id')
      // .orWhere('product_id = q2.product_id')
      // .orWhere('product_id = q3.product_id')
      .getRawMany()

    console.log(res)
  } catch (e) {
    console.log(e)
  } finally {
    await closeDataSource()
  }
}

solve()
