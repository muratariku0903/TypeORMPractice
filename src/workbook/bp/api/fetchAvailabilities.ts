import { DataSource } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { Availability } from '../entities/availability'

type FetchAvailabilityPerMonthParam = {
  officeCode: number
  startDate: string
  endDate: string
}

const fetchAvailabilitiesPerMonth = async (param: FetchAvailabilityPerMonthParam) => {
  let ds: DataSource | null = null
  const { officeCode, startDate, endDate } = param

  try {
    ds = await initDataSource({ schema: 'bp' })

    const res = await ds
      .createQueryBuilder(Availability, 'availability')
      .where('availability.office_code = :officeCode', { officeCode })
      .andWhere('availability.date >= :startDate', { startDate })
      .andWhere('availability.date <= :endDate', { endDate })
      .getMany()

    console.log(res)
  } catch (e) {
    console.error(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

const param: FetchAvailabilityPerMonthParam = {
  officeCode: 1,
  startDate: '2023-05-01',
  endDate: '2023-05-31',
}
fetchAvailabilitiesPerMonth(param)
