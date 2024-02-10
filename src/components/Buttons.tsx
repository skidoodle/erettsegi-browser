import { Button } from '@nextui-org/react'
import React, { useState, useEffect, useCallback } from 'react'
import type { ButtonProps } from '@/utils/props'
import type { ButtonColor } from '@/utils/types'

const CustomButton: React.FC<ButtonProps> = React.memo(({ label, link }) => {
  const [status, setStatus] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const checkLinkStatus = useCallback(async (): Promise<void> => {
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
  }, [link])

  useEffect(() => {
    void checkLinkStatus()
  }, [checkLinkStatus])

  const getColor = useCallback((): ButtonColor => {
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
  }, [isLoading, status])

  const handleClick = useCallback(() => {
    if (status === 200 && link) {
      window.open(link)
    } else {
      console.error('A hivatkozás nem elérhető.')
    }
  }, [status, link])

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
})

export const PdfButton: React.FC<ButtonProps> = React.memo(
  ({ label, link }) => <CustomButton label={label} link={link} />
)

export const ZipButton: React.FC<ButtonProps> = React.memo(
  ({ label, link }) => <CustomButton label={label} link={link} />
)
