import { DataSource } from 'typeorm'
import { closeDataSource, initDataSource } from '../../../common/db'
import { Office } from '../entities/office'
import { Department } from '../entities/department'
import { PostalCodeLocationMapping } from '../entities/postal_code_location_mapping'
import { Company } from '../entities/company'

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

type FetchOfficesResponse = {
  postal_code: string
  company_code: string
  company_name: string
  office_code: string
  office_name: string
  department_code: string
  department_name: string
  department_type: string
}[]

const fetchOffices = async (): Promise<FetchOfficesResponse> => {
  let ds: DataSource | null = null

  try {
    ds = await initDataSource({ schema: 'bp' })

    const res = await ds
      .createQueryBuilder()
      .select([
        'pclm.postal_code as postal_code',
        'company.id as company_code',
        'company.name as company_name',
        'office.id as office_code',
        'office.name as office_name',
        'department.id as department_code',
        'department.name as department_name',
        'department.type as department_type',
      ])
      .from(Company, 'company')
      .innerJoin(Office, 'office', 'company.id = office.company_code')
      .innerJoin(PostalCodeLocationMapping, 'pclm', 'pclm.office_code = office.id')
      .innerJoin(Department, 'department', 'department.office_code = office.id')
      .orderBy('company.id')
      // .orderBy('office.id')
      // .orderBy('department.type')
      .getRawMany()

    console.log(res)

    return res
  } catch (e) {
    console.error(e)
    throw new Error(JSON.stringify(e))
  } finally {
    if (ds) {
      await closeDataSource(ds)
    }
  }
}

// const postalCode = '0000000'
// fetchOfficeWithDepartmentsByPostalCode(postalCode)
fetchOffices()
