import { AppDataSource, closeDataSource, initDataSource } from '../../common/db'
import { Activity1141 } from './entity'

const solve = async () => {
  try {
    await initDataSource()

    // 発行したいクエリ↓
    // select activity_date as day, count(distinct user_id) as active_users from Activity group by activity_date having min(activity_date) >= "2019-06-28" AND max(activity_date) <= "2019-07-27";

    const startDate = '2019-06-28'
    const endDate = '2019-07-27'

    const res = await AppDataSource.createQueryBuilder(Activity1141, 'activity')
      .select(`activity.activity_date`, 'day')
      .addSelect('COUNT(DISTINCT activity.user_id)', 'active_users')
      .groupBy('activity.activity_date')
      .having('MIN(activity.activity_date) >= :startDate', { startDate })
      .andHaving('MAX(activity.activity_date) <= :endDate', { endDate })
      .getRawMany()

    console.log(res)
  } catch (e) {
    console.log(e)
  } finally {
    await closeDataSource()
  }
}

solve()
