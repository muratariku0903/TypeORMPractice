import { EntityManager } from 'typeorm'
import { BasicInformation, BasicInformationType } from '../entities/basic_information'

// チケットを更新
type UpdateParams = {
  ticket_number: number
  basic_information_type: BasicInformationType
  name?: string
  address?: string
}
export const update = async (entityManger: EntityManager, params: UpdateParams): Promise<void> => {
  try {
    const repository = entityManger.getRepository(BasicInformation)
    await repository.update(
      { ticket_number: params.ticket_number, basic_information_type: params.basic_information_type },
      params
    )
  } catch (error) {
    console.log(`error at ${update.name}, error : ${error}`)
    throw error
  }
}
