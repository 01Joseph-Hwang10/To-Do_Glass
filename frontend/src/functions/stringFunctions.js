

export const capitalize = (string) => {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
  }



export const stripPort = (url) => {
  const urlSplitByColon = url.split(':')
  const portStrippedUrl = [urlSplitByColon[0],urlSplitByColon[1]].join(':')
  return String(portStrippedUrl)
}
