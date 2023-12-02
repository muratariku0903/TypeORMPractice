import { DataSource } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { Ticket } from '../entities/ticket'
import { BasicInformation } from '../entities/basic_information'

const fetchTicket = async (ticketNumber: number) => {
  let ds: DataSource | null = null

  try {
    ds = await initDataSource({ schema: 'bp' })

    const ticket = await ds
      .createQueryBuilder(Ticket, 'ticket')
      .where('ticket.ticket_number = :ticketNumber', { ticketNumber })
      .getOne()

    console.log(ticket)

    if (!ticket) {
      throw new Error('Fail fetch ticket.')
    }

    const contractNumber = ticket.contract_number
    const relatedTickets = await ds
      .createQueryBuilder(Ticket, 'ticket')
      .where('ticket.contract_number = :contractNumber', { contractNumber })
      .andWhere('ticket.ticket_number != :ticketNumber', { ticketNumber })
      .getMany()

    console.log(relatedTickets)

    const basicInfos = await ds
      .createQueryBuilder(BasicInformation, 'basicInformation')
      .where('basicInformation.ticket_number = :ticketNumber', { ticketNumber })
      .getMany()

    console.log(basicInfos)
  } catch (e) {
    console.error(e)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

fetchTicket(1)
