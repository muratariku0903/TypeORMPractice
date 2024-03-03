import { DataSource } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { Office } from '../entities/office'
import { Department } from '../entities/department'
import { PostalCodeLocationMapping } from '../entities/postal_code_location_mapping'

type FetchOfficeWithDepartmentsByPostalCodeResponse = {
  office: Office
  departments: Department[]
}

const fetchOfficeWithDepartmentsByPostalCode = async (
  postalCode: string
): Promise<FetchOfficeWithDepartmentsByPostalCodeResponse> => {
  let ds: DataSource | null = null

  try {
    ds = await initDataSource({ schema: 'bp' })

    const mappingRepository = ds.getRepository(PostalCodeLocationMapping)
    const mapping = await mappingRepository.findOne({ where: { postal_code: postalCode } })
    if (!mapping) {
      throw new Error('not found mapping')
    }

    const officeRepository = ds.getRepository(Office)
    const office = await officeRepository.findOne({ where: { id: mapping.office_code } })
    if (!office) {
      throw new Error('not found office')
    }

    const departmentRepository = ds.getRepository(Department)
    const departments = await departmentRepository.find({ where: { office_code: office.id } })

    console.log({ office, departments })

    return { office, departments }
  } catch (e) {
    console.error(e)
    throw new Error(JSON.stringify(e))
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

const postalCode = '0000000'
fetchOfficeWithDepartmentsByPostalCode(postalCode)
