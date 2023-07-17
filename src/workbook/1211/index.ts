import { AppDataSource, closeDataSource, initDataSource } from '../../common/db'
import { Queries1211 } from './entity'

const solve = async () => {
  try {
    await initDataSource()

    // 発行したいクエリ↓
    // select query_name,
    // ROUND(AVG(rating / position), 2) AS quality,
    // round(SUM(rating<3)/count(query_name)*100,2) as poor_query_percentage
    // from queries
    // group by query_name;

    const res = await AppDataSource.createQueryBuilder(Queries1211, 'q')
      .select(`q.query_name`, 'query_name')
      .addSelect('ROUND(AVG(q.rating * 1.0 / q.position), 2)', 'quality')
      .addSelect(
        'ROUND(SUM(CASE WHEN q.rating < 3 THEN 1 ELSE 0 END) * 1.0 / COUNT(q.query_name) * 100, 2)',
        'poor_query_percentage'
      )
      .groupBy('q.query_name')
      .getRawMany()

    console.log(res)
  } catch (e) {
    console.log(e)
  } finally {
    await closeDataSource()
  }
}

solve()
