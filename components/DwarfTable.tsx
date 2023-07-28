import { protocolRelativeUrl } from '@/lib/handleUrl'
import { loadDwarfs } from '@/lib/loadDwarfs'
import Link from 'next/link'

export default async function DwarfTable() {
  const dwarfs = await loadDwarfs()

  return (
    <table className="w-full border-separate border-spacing-x-2 border-spacing-y-4">
      <thead className="font-bold text-left">
        <tr>
          <th>Original Url</th>
          <th>Short Url</th>
          <th className="text-right">Visits</th>
        </tr>
      </thead>
      <tbody>
        {dwarfs.map((dwarf) => (
          <tr key={dwarf._id}>
            <td>
              <Link href={dwarf.originalUrl} className="link">
                {protocolRelativeUrl(dwarf.originalUrl)}
              </Link>
            </td>
            <td>
              <Link href={dwarf.shortUrl} className="link">
                {protocolRelativeUrl(dwarf.shortUrl)}
              </Link>
            </td>
            <td className="text-right">{dwarf.visits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
