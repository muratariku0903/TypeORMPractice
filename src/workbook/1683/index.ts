import { AppDataSource, closeDataSource, initDataSource } from '../../common/db'
import { Tweets1683 } from './entity'

const solve = async () => {
  try {
    await initDataSource()

    // 発行したいクエリ↓
    // select tweet_id from Tweets where length(content) > 15;

    const res = await AppDataSource.createQueryBuilder()
      .select('t.tweet_id', 'tweet_id')
      .from(Tweets1683, 't')
      .where('LENGTH(t.content) > 15')
      .getRawMany()

    console.log(res)
  } catch (e) {
    console.log(e)
  } finally {
    await closeDataSource()
  }
}

solve()
