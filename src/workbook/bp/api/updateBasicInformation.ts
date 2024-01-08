import { DataSource } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { updateBasicInformationUsecase } from '../usecase/basicInformationUsecase'
import { BasicInformationType } from '../entities/basic_information'

type UpdateBasicInformationParams = {
  ticketNumber: number
  type: BasicInformationType
  name?: string
  address?: string
}

const updateBasicInformation = async (params: UpdateBasicInformationParams): Promise<void> => {
  let ds: DataSource | null = null

  try {
    ds = await initDataSource({ schema: 'bp' })

    await updateBasicInformationUsecase(ds, params)
  } catch (error) {
    console.log(error)
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

const params: UpdateBasicInformationParams = {
  ticketNumber: 1,
  type: BasicInformationType.RECEIPT,
  name: 'test',
}
updateBasicInformation(params)
