import { BsSunFill, BsMoonFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/button'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggle = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <Button aria-label="Switch Theme" size="sm" onClick={() => toggle()}>
      {theme === 'light' ? (
        <BsMoonFill style={{ fill: 'black' }} size={20} />
      ) : (
        <BsSunFill size={20} />
      )}
    </Button>
  )
}
