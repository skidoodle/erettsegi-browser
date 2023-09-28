import { VscColorMode } from 'react-icons/vsc'
import { Button } from '@nextui-org/button'
import { useTheme } from 'next-themes'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const toggle = () => {
    switch (theme) {
      case 'dark':
        setTheme('light')
        break
      case 'light':
        setTheme('dark')
        break
      default:
        break
    }
  }

  return (
    <Button aria-label='Switch Theme' size='sm' onClick={() => toggle()}>
      {theme === 'light' ? (
        <VscColorMode style={{ fill: 'black' }} size={20} />
      ) : (
        <VscColorMode size={20} key={'dark'} />
      )}
    </Button>
  )
}
