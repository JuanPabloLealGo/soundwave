export const capitalizeFirstLetter = (str: string) => {
  return `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`
}

export const convertMsToMinSec = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return {
    minutes: minutes,
    seconds: seconds.toString().padStart(2, '0')
  }
}

export const getList = (numberOfItems: number) => Array.from(Array(numberOfItems))