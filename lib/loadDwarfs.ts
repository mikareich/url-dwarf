import dbConnect from './dbConnection'
import Dwarf, { DwarfType } from './dwarf.model'

export async function loadDwarfs() {
  await dbConnect()

  const dwarfs = await Dwarf.find().sort({ protocolRelativeUrl: 'asc' })

  return dwarfs as DwarfType[]
}
