import { Office, offices } from './classes/office'
import { MS_PER_DATE } from './common/const'
import { createFile, formatDate } from './common/functions'

type Holiday = {
  office_code: string
  date: string
}

const createMockData = (start: Date, end: Date, offices: Office[]): Holiday[] => {
  const startMs = start.getTime()
  const endMs = end.getTime()
  const res: Holiday[] = []

  for (const office of offices) {
    for (let ms = startMs; ms <= endMs; ms += MS_PER_DATE) {
      const date = new Date(ms)
      if (office.isHoliday(date)) {
        const holiday: Holiday = {
          office_code: office.officeCode,
          date: formatDate(date),
        }
        res.push(holiday)
      }
    }
  }

  return res
}

const start = new Date('2023-05-01')
const end = new Date('2024-04-30')
const source = createMockData(start, end, offices)
createFile('./src/workbook/bp/factory/output/holidays.csv', source)
