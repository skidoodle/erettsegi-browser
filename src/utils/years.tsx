import { useEffect } from 'react'

export function useAvailableYears(
  setYears: React.Dispatch<React.SetStateAction<string[]>>
) {
  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const availableYears: string[] = []
    for (let year = currentYear; year >= 2013; year--) {
      availableYears.push(year.toString())
    }
    setYears(availableYears)
  }, [setYears])
}
