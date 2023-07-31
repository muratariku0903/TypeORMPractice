import { AppDataSource, closeDataSource, initDataSource } from '../../common/db'
import { Transactions1587, Users1587 } from './entity'

const solve = async () => {
  try {
    await initDataSource()

    const res = await AppDataSource.createQueryBuilder()
      .select('u.name', 'name')
      .addSelect('SUM(t.amount)', 'balance')
      .from(Transactions1587, 't')
      .leftJoin(Users1587, 'u', 't.account = u.account')
      .groupBy('t.account')
      .addGroupBy('u.name')
      .having('SUM(t.amount) > 10000')
      .getRawMany()

    console.log(res)
  } catch (e) {
    console.log(e)
  } finally {
    await closeDataSource()
  }
}

solve()
