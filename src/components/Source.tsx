import { VscGithubInverted } from 'react-icons/vsc'
import { Button } from '@nextui-org/button'

export const Source = () => {
  return (
    <Button
      aria-label='Source Code'
      size='sm'
      onClick={() =>
        window.open('https://github.com/skidoodle/erettsegi-browser')
      }
    >
      <VscGithubInverted size={20} />
    </Button>
  )
}
