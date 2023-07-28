import dbConnect from './dbConnection'
import Dwarf, { DwarfType } from './dwarf.model'

export default async function findDwarfBySlug(
  slug: string,
): Promise<DwarfType | null> {
  await dbConnect()

  const dwarf = await Dwarf.findOne({ shortSlug: slug })

  return dwarf
}
