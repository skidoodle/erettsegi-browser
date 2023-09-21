import { RiOpenSourceFill } from 'react-icons/ri'
import { Button } from '@nextui-org/button'

export const Source = () => {
  return (
    <Button
      aria-label="Source Code"
      size="sm"
      onClick={() =>
        window.open('https://github.com/skidoodle/erettsegi-browser')
      }
    >
      <RiOpenSourceFill size={20} />
    </Button>
  )
}
