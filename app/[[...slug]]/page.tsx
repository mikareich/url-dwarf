import Form from '@/components/Form'
import Header from '@/components/Header'
import DwarfTable from '@/components/DwarfTable'
import findDwarfBySlug from '@/lib/findDwarfBySlug'
import { redirect, useRouter } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'

type HomeParams = {
  params: {
    slug: string[]
  }
}

export default async function Home({ params }: HomeParams) {
  const { slug } = params

  if (slug) {
    const dwarf = await findDwarfBySlug(slug[0])

    if (!dwarf) redirect('/', RedirectType.replace)

    await dwarf.updateOne({ $inc: { visits: 1 } })
    redirect(dwarf.originalUrl, RedirectType.replace)
  }

  return (
    <div className="container mx-auto pt-[100px] max-w-prose">
      <Header />
      <Form />
      <DwarfTable />
    </div>
  )
}
