import mongoose from 'mongoose'

export type DwarfType = {
  originalUrl: string
  protocolRelativeUrl: string
  shortSlug: string
  visits: number
} & mongoose.Document

const DwarfScheme = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  protocolRelativeUrl: {
    type: String,
    required: true,
  },
  shortSlug: {
    type: String,
    required: true,
  },
  visits: {
    type: Number,
    required: true,
    default: 0,
  },
})

const Dwarf =
  mongoose.models.Dwarf<DwarfType> ||
  mongoose.model<DwarfType>('Dwarf', DwarfScheme, 'dwarfs')

export default Dwarf
