import { AppDataSource, closeDataSource, initDataSource } from '../../common/db'
import { View } from './entity'

const solve = async () => {
  try {
    await initDataSource()

    const res = await AppDataSource.createQueryBuilder(View, 'views').getRawMany<View>()    // const res = await AppDataSource.getRepository<View>(View).createQueryBuilder().select().execute()
    console.log(res)
  } catch (e) {
    console.log(e)
  } finally {
    await closeDataSource()
  }
}

solve()
