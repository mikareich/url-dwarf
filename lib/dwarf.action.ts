'use server'

import Dwarf, { DwarfType } from '@/lib/dwarf.model'
import dbConnect from './dbConnection'
import generateShortSlug from './generateShortSlug'
import { formatUrl } from './handleUrl'
export default async function createDwarfFromForm(
  data: FormData,
  hostUrl: string,
) /* : Promise<DwarfType> */ {
  // conenct to the database
  await dbConnect()

  // check if url is valid
  const originalUrl = formatUrl(data.get('url') as string)

  // check if the url is already in the database
  const protocolRelativeUrl = originalUrl.replace(/^https?:\/\//, '')
  let dwarf = await Dwarf.findOne({ protocolRelativeUrl })

  // if it is, return the dwarf
  if (dwarf) return dwarf

  // if it isn't, create a new dwarf
  const shortSlug = await generateShortSlug()
  const shortUrl = `${hostUrl}/${shortSlug}`
  dwarf = await Dwarf.create({
    originalUrl,
    protocolRelativeUrl,
    shortUrl,
    shortSlug,
    visits: 0,
  })

  // return the new dwarf
  return dwarf.shortUrl
}
