import { AppDataSource, closeDataSource, initDataSource } from '../../common/db'
import { Activity1141 } from './entity'

const solve = async () => {
  try {
    await initDataSource()

    const res = await AppDataSource.createQueryBuilder(Activity1141, 'activity').getMany()
    // const res = await AppDataSource.createQueryBuilder(View, 'views').getRawMany<View>()

    console.log(res)
  } catch (e) {
    console.log(e)
  } finally {
    await closeDataSource()
  }
}

solve()
