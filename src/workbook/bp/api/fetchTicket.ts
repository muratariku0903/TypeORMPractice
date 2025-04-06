import { Brackets, DataSource, IsNull } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { Ticket } from '../entities/ticket'
import { BasicInformation } from '../entities/basic_information'

const fetchTicket = async (ticketNumber: number) => {
  let ds: DataSource | null = null

  try {
    ds = await initDataSource({ schema: 'bp' })

    const ticket = await ds
      .createQueryBuilder(Ticket, 'ticket')
      .where('ticket.contract_number = :contractNumber', { contractNumber: ticketNumber })
      .andWhere(
        new Brackets((qb) => {
          qb.where('ticket.application_type in (:...applicationType)', { applicationType: ['RESTART'] })
          qb.orWhere('ticket.application_type IS NULL')
        })
      )
      .andWhere('ticket.status in (:...status)', { status: ['COMPLETE'] })
      // .andWhere('ticket.application_type in (:...applicationType)', { applicationType: [IsNull().value] })
      .getRawMany()

    // queryBuilder.where(
    //   new Brackets((qb) => {
    //     // IDに対する検索条件を追加
    //     if (nonNullIds.length > 0) {
    //       qb.where('user.id IN (:...ids)', { ids: nonNullIds })
    //     }

    //     // `NULL`が含まれている場合は `OR` で `IS NULL` を追加
    //     if (hasNull) {
    //       qb.orWhere('user.id IS NULL')
    //     }
    //   })
    // )

    console.log(ticket)

    if (!ticket) {
      throw new Error('Fail fetch ticket.')
    }

    // const contractNumber = ticket.contract_number
    // const relatedTickets = await ds
    //   .createQueryBuilder(Ticket, 'ticket')
    //   .where('ticket.contract_number = :contractNumber', { contractNumber })
    //   .andWhere('ticket.ticket_number != :ticketNumber', { ticketNumber })
    //   .getMany()

    // console.log(relatedTickets)

    // const basicInfos = await ds
    //   .createQueryBuilder(BasicInformation, 'basicInformation')
    //   .where('basicInformation.ticket_number = :ticketNumber', { ticketNumber })
    //   .getMany()

    // console.log(basicInfos)
  } catch (e) {
    console.error(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

fetchTicket(10)
