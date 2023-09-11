import { DataSource } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { Availability } from '../entities/availability'
import { Holiday } from '../entities/holiday'

type UpdateAvailabilityParam = {
  office_code: number
  date: string
  is_holiday: boolean
  availabilities: Omit<Availability, 'office' | 'register_count'>[]
}
type UpdateHoliday = Omit<Holiday, 'office'>

// 月毎に空き状況を更新する
const updateAvailabilitiesByMonth = async (params: {
  startDate: string
  endDate: string
  updateAvailabilityParams: UpdateAvailabilityParam[]
}) => {
  let ds: DataSource | null = null
  const { startDate, endDate, updateAvailabilityParams } = params

  try {
    // 営業日か休業日用のレコードかどうかのカラムを設けたほうがいいのかな
    ds = await initDataSource({ schema: 'bp' })

    // 空き状況の更新
    const availabilityRepository = ds.getRepository(Availability)
    const originalAvailabilities = await availabilityRepository
      .createQueryBuilder('availability')
      .where('availability.date >= :startDate', { startDate })
      .andWhere('availability.date <= :endDate', { endDate })
      .getMany()

    // 確かに、active_flgを更新しようとしてもおそらくそのレコード自体がないから、結果的に上書きではなく、レコードが追加されてしまう
    const availabilities: Omit<Availability, 'office'>[] = []
    if (originalAvailabilities.length > 0) {
      for (const param of updateAvailabilityParams) {
        for (const availability of param.availabilities) {
          const targetAvailability = originalAvailabilities.find(
            (availability) =>
              availability.office_code === availability.office_code &&
              availability.date === availability.date &&
              availability.time_category === availability.time_category &&
              availability.active_flg === availability.active_flg
          )
          if (!targetAvailability) {
            throw new Error('not found target item')
          }

          availabilities.push({
            ...availability,
            register_count: targetAvailability.register_count,
          })
        }
      }
    } else {
      for (const param of updateAvailabilityParams) {
        for (const availability of param.availabilities) availabilities.push({ ...availability, register_count: 0 })
      }
    }

    const res = await availabilityRepository.upsert(availabilities, [
      'office_code',
      'date',
      'time_category',
      'is_holiday',
    ])
    console.log(res)

    // 休業日の更新 一番手っ取り早いのが更新期間の全ての休業日を削除して、入れ直すこと
    const holidayRepository = ds.getRepository(Holiday)
    const deleteResult = await holidayRepository
      .createQueryBuilder()
      .delete()
      .from(Holiday)
      .where('date >= :startDate', { startDate })
      .andWhere('date <= :endDate', { endDate })
      .execute()

    console.log(deleteResult)
    const insertHolidays: UpdateHoliday[] = []
    for (const param of updateAvailabilityParams) {
      if (param.is_holiday) {
        insertHolidays.push({ office_code: param.office_code, date: param.date })
      }
    }
    const holidayUpdateResult = await holidayRepository.upsert(insertHolidays, ['office_code', 'date'])
    console.log(holidayUpdateResult)
  } catch (e) {
    console.error(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

// ダミーデータを用意する
const officeCode = 1
const updateAvailabilityParams: UpdateAvailabilityParam[] = [
  {
    office_code: officeCode,
    date: '2023-05-01',
    is_holiday: true,
    availabilities: [
      {
        office_code: officeCode,
        date: '2023-05-01',
        time_category: '09:00-12:00',
        active_flg: false,
        max_register_count: 10,
        is_holiday: false,
      },
      {
        office_code: officeCode,
        date: '2023-05-01',
        time_category: '09:00-12:00',
        active_flg: true,
        max_register_count: 3,
        is_holiday: true,
      },
      {
        office_code: officeCode,
        date: '2023-05-01',
        time_category: '13:00-15:00',
        active_flg: false,
        max_register_count: 10,
        is_holiday: false,
      },
      {
        office_code: officeCode,
        date: '2023-05-01',
        time_category: '13:00-17:00',
        active_flg: true,
        max_register_count: 0,
        is_holiday: true,
      },
      {
        office_code: officeCode,
        date: '2023-05-01',
        time_category: '15:00-17:00',
        active_flg: false,
        max_register_count: 6,
        is_holiday: false,
      },
      {
        office_code: officeCode,
        date: '2023-05-01',
        time_category: '17:00-19:00',
        active_flg: false,
        max_register_count: 4,
        is_holiday: false,
      },
    ],
  },
]
updateAvailabilitiesByMonth({ startDate: '2023-05-01', endDate: '2023-05-31', updateAvailabilityParams })
