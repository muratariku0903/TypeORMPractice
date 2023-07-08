import { AppDataSource, closeDataSource, initDataSource } from '../../common/db'
import { View } from './entity'

const solve = async () => {
  try {
    await initDataSource()

    const res = await AppDataSource.createQueryBuilder(View, 'view').where('view.author_id = view.viewer_id').orderBy('view_author_id').getMany()
    // const res = await AppDataSource.createQueryBuilder(View, 'views').getRawMany<View>()

    console.log(res)
  } catch (e) {
    console.log(e)
  } finally {
    await closeDataSource()
  }
}

solve()
