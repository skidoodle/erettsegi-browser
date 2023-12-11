import { Button } from '@nextui-org/react'

export const PdfButton: React.FC<{ label: string; link: string }> = ({
  label,
  link,
}) => (
  <Button
    isDisabled={!link}
    className='w-24 mt-3 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2'
    onClick={link ? () => window.open(link) : () => {}}
  >
    {label}
  </Button>
)

export const ZipButton: React.FC<{ label: string; link: string }> = ({
  label,
  link,
}) => (
  <Button
    isDisabled={!link}
    className='w-24 mt-3 text-sm bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-2'
    onClick={link ? () => window.open(link) : () => {}}
  >
    {label}
  </Button>
)
