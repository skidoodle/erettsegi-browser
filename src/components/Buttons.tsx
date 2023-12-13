import { Button } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import type { ButtonProps } from '@/utils/props'
import type { ButtonColor } from '@/utils/types'

const CustomButton: React.FC<ButtonProps> = ({ label, link }) => {
  const [status, setStatus] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const checkLinkStatus = async (): Promise<void> => {
    if (link) {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/validate?link=${encodeURI(link)}`)
        const data = (await response.json()) as { status: number }
        setStatus(data.status)
      } catch (error) {
        setStatus(500)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    void checkLinkStatus()
  }, [link])

  const getColor = (): ButtonColor => {
    switch (true) {
      case isLoading:
        return 'default'
      case status === 200:
        return 'primary'
      case status === 404:
        return 'danger'
      default:
        return 'default'
    }
  }

  const handleClick = () => {
    if (status === 200 && link) {
      window.open(link)
    } else {
      console.error('A hivatkozás nem elérhető.')
    }
  }

  return (
    <Button
      isDisabled={status !== 200 || !link || isLoading}
      isLoading={isLoading}
      className='w-28 mt-3 text-sm font-bold py-2 px-2'
      color={getColor()}
      onClick={handleClick}
    >
      {label}
    </Button>
  )
}

export const PdfButton: React.FC<ButtonProps> = ({ label, link }) => (
  <CustomButton label={label} link={link} />
)

export const ZipButton: React.FC<ButtonProps> = ({ label, link }) => (
  <CustomButton label={label} link={link} />
)
