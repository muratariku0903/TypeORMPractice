import { Office, offices } from './classes/office'
import { MS_PER_DATE } from './common/const'
import { createFile, formatDate } from './common/functions'

type Availability = {
  office_code: string
  date: string
  time_category: string
  is_holiday: boolean
  active_flg: boolean
  register_count: number
  max_register_count: number
}

const createMockData = (start: Date, end: Date, offices: Office[]): Availability[] => {
  const startMs = start.getTime()
  const endMs = end.getTime()
  const res: Availability[] = []

  for (const office of offices) {
    for (let ms = startMs; ms <= endMs; ms += MS_PER_DATE) {
      const date = new Date(ms)
      const categories = office.getTimeCategories(date)
      for (const category of categories) {
        const registerCnt = Math.floor(Math.random() * 5)
        const maxRegisterCnt = registerCnt + Math.floor(Math.random() * 4)
        const availability: Availability = {
          office_code: office.officeCode,
          date: formatDate(date),
          time_category: category.value,
          is_holiday: category.isHoliday,
          active_flg: category.active,
          register_count: registerCnt,
          max_register_count: maxRegisterCnt,
        }
        res.push(availability)
      }
    }
  }

  return res
}

const start = new Date('2023-05-01')
const end = new Date('2024-04-30')
const source = createMockData(start, end, offices)
createFile('./src/workbook/bp/factory/output/availabilities.csv', source)
