import { AppDataSource, closeDataSource, initDataSource } from '../../common/db'
import { Prices1251, UnitsSold1251 } from './entity'

const solve = async () => {
  try {
    await initDataSource()

    // 発行したいクエリ↓
    // SELECT p.product_id, round(SUM(p.price*u.units)/sum(u.units),2) as average_price
    // FROM Prices p
    // INNER JOIN UnitsSold u
    // ON p.product_id = u.product_id and
    // u.purchase_date BETWEEN p.Start_date and p.end_date
    // GROUP BY p.product_id

    const res = await AppDataSource.createQueryBuilder()
      .select('p.product_id', 'product_id')
      .addSelect('ROUND(SUM(p.price*u.units)*1.0/SUM(u.units),2)')
      .from(Prices1251, 'p')
      .innerJoin(UnitsSold1251, 'u', 'p.product_id = u.product_id')
      .where('u.purchase_date BETWEEN p.start_date AND p.end_date')
      .groupBy('p.product_id')
      .getRawMany()

    console.log(res)
  } catch (e) {
    console.log(e)
  } finally {
    await closeDataSource()
  }
}

solve()
