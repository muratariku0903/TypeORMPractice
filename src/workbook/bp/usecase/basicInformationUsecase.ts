import { DataSource } from 'typeorm'
import { update } from '../repository/basicInformationRepo'
import { BasicInformationType } from '../entities/basic_information'

type NewType = {
  ticketNumber: number
  type: BasicInformationType
  name?: string
  address?: string
}

type UpdateBasicInformationParams = NewType

export const updateBasicInformationUsecase = async (
  ds: DataSource,
  params: UpdateBasicInformationParams
): Promise<void> => {
  try {
    await ds.transaction(async (entityManger) => {
      await update(entityManger, {
        ticket_number: params.ticketNumber,
        basic_information_type: params.type,
        name: params.name,
        address: params.address,
      })
    })
  } catch (error) {
    console.log(`error at ${updateBasicInformationUsecase.name}, error : ${JSON.stringify(error)}`)
    throw error
  }
}
