import * as fs from 'fs'
import { format } from '@fast-csv/format'

export const fillZero = (num: number): string => {
  return String(num).padStart(2, '0')
}

export const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${fillZero(date.getMonth() + 1)}-${fillZero(date.getDate())}`
}

export const getExtendFromPath = (path: string): string | null => {
  const extend = path.split('/').reverse()[0].split('.')[1]

  return extend ? extend : null
}

export const getBasePath = (path: string): string => {
  const res = path.split('/').reverse().slice(1).reverse().join('/')

  return res ? res : ''
}

export const createFile = (path: string, source: any[]): void => {
  const extend = getExtendFromPath(path)
  if (!extend) {
    console.error('invalid extend')
    return
  }

  const basePath = getBasePath(path)
  if (!fs.existsSync(basePath)) {
    fs.mkdir(basePath, (err) => {
      if (!err) {
        console.log(`create dir : ${basePath}`)
      } else {
        console.error(`fail create dir : ${basePath}`)
      }
    })
  }

  if (extend === 'csv') {
    const ws = fs.createWriteStream(path)
    const stream = format({ headers: true })
    stream.pipe(ws)
    source.map((row) => {
      stream.write(row, (err) => {
        if (err) {
          console.log(`fail write csv file : ${err}`)
        }
      })
    })
    console.log(`create csv file : ${path}`)
  }
}
