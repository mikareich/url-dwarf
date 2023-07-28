import dbConnect from './dbConnection'
import Dwarf from './dwarf.model'
import findDwarfBySlug from './findDwarfBySlug'

export default async function generateShortSlug(length: number = 5) {
  while (true) {
    const slug = Math.random()
      .toString(36)
      .substring(2, length + 2)

    // check if the slug is already in the database
    const dwarf = await findDwarfBySlug(slug)

    // if it isn't, return the slug
    if (!dwarf) return slug
  }
}
