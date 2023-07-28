import isValidUrl from 'is-url'

const protocolRegex = /^(\w+):\/\//

// append http:// if no protocol is provided and test it
export const formatUrl = (url: string) => {
  // check if url has a protocol and test it
  if (protocolRegex.test(url)) {
    // check if protocol is http or https
    const protocol = url.match(protocolRegex)![1]
    if (protocol !== 'http' && protocol !== 'https')
      throw new Error('Invalid protocol')
  }

  // append http:// if no protocol is provided and test it
  url = `http://${url}`
  if (!isValidUrl(url)) throw new Error('Invalid Url')

  return url
}

export const protocolRelativeUrl = (url: string) => {
  return protocolRegex.test(url) ? url.replace(protocolRegex, '') : url
}
