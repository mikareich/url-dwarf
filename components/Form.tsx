'use client'

import { useState, useEffect } from 'react'

import createDwarfFromForm from '@/lib/dwarf.action'
import { DwarfType } from '@/lib/dwarf.model'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { protocolRelativeUrl } from '@/lib/handleUrl'

export default function Form() {
  const [hostUrl, setHostUrl] = useState('')
  const [shortUrl, setShortUrl] = useState<string>()
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    setHostUrl(window.location.origin)
  }, [])

  const handleSubmit = async (data: FormData) => {
    try {
      const newShortUrl = await createDwarfFromForm(data, hostUrl)
      setShortUrl(newShortUrl)
      setErrorMessage('')

      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        setShortUrl(undefined)
        setErrorMessage(error.message)
      }
    }
  }

  return (
    <>
      <form className="flex mb-5" action={handleSubmit}>
        <label htmlFor="url" className="block w-full mr-4">
          <span>Enter a Url you want to shorten:</span>
          <input
            type="text"
            name="url"
            id="url"
            className="block w-full px-4 py-2 border border-gray-900"
            placeholder="https://google.com"
          />
        </label>

        <button
          className="bg-gray-900 border border-gray-900 text-gray-100 px-4 py-2 w-min h-min self-end font-bold uppercase"
          type="submit"
        >
          Dwarf
        </button>
      </form>

      {errorMessage && (
        <div className="p-4 bg-red-500 text-white w-full mb-10">
          {errorMessage}
        </div>
      )}

      {shortUrl && (
        <div className="p-4 bg-blue-500 text-white w-full mb-10">
          New dwarf succsessfully created at{' '}
          <Link href={shortUrl} className="link">
            {protocolRelativeUrl(shortUrl)}
          </Link>
        </div>
      )}
    </>
  )
}
