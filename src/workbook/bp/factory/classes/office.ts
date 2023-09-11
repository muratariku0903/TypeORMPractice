export class Office {
  officeCode: string
  holidayWeeks: number[]

  constructor({
    officeCode,
    holidayWeeks,
  }: {
    officeCode: Office['officeCode']
    holidayWeeks: Office['holidayWeeks']
  }) {
    this.officeCode = officeCode
    this.holidayWeeks = holidayWeeks
  }

  public getTimeCategories(date: Date) {
    const isHoliday = this.isHoliday(date)

    return [
      { value: '09:00-12:00', active: !isHoliday, isHoliday: false },
      { value: '13:00-15:00', active: !isHoliday, isHoliday: false },
      { value: '15:00-17:00', active: !isHoliday, isHoliday: false },
      { value: '17:00-19:00', active: !isHoliday, isHoliday: false },
      { value: '09:00-12:00', active: isHoliday, isHoliday: true },
      { value: '13:00-17:00', active: isHoliday, isHoliday: true },
    ]
  }

  public isHoliday(date: Date): boolean {
    return this.holidayWeeks.includes(date.getDay())
  }
}

export const offices: Office[] = [new Office({ officeCode: '00000001', holidayWeeks: [0, 1] })]
