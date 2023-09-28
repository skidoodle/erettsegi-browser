import { useState, useEffect } from 'react'
import { Footer } from '@/components/Footer'
import { subjects } from '@/utils/subjects'
import { useYears } from '@/utils/years'
import {
  Select,
  SelectItem,
  Button,
  ButtonGroup,
  Divider,
} from '@nextui-org/react'

export default function Home() {
  const [flPdfLink, setflPdfLink] = useState<string>('')
  const [utPdfLink, setutPdfLink] = useState<string>('')
  const [flZipLink, setflZipLink] = useState<string>('')
  const [utZipLink, setutZipLink] = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [selectedPeriod, setSelectedPeriod] = useState<string>('')
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [years, setYears] = useState<string[]>([])

  useYears(setYears)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `/api/erettsegi?vizsgatargy=${selectedSubject}&ev=${selectedYear}&idoszak=${selectedPeriod}&szint=${selectedLevel}`

        const response = await fetch(url)

        if (response.ok) {
          const data = await response.json()

          if (data.utZipUrl && data.flZipUrl) {
            setflZipLink(data.flZipUrl)
            setutZipLink(data.utZipUrl)
          } else {
            console.error('Nincs érvényes ZIP link a válaszban.')
          }

          if (data.utPdfUrl && data.flPdfUrl) {
            setflPdfLink(data.flPdfUrl)
            setutPdfLink(data.utPdfUrl)
          } else {
            console.error('Nincs érvényes PDF link a válaszban.')
          }
        } else {
          console.error('Hiba történt az API hívás során.')
        }
      } catch (error) {
        console.error('Hiba történt az API hívás során.', error)
      }
    }
    fetchData()
  }, [
    selectedSubject,
    selectedYear,
    selectedPeriod,
    selectedLevel,
    setflPdfLink,
    setutPdfLink,
    setflZipLink,
    setutZipLink,
  ])

  return (
    <main className='dark:bg-[#121212] text-foreground bg-background py-5'>
      <h1 className='text-4xl font-bold text-blue-400 text-center mt-16'>
        Érettségi kereső
      </h1>
      <div className='flex min-h-screen flex-col items-center justify-between'>
        <div className='container mx-auto'>
          <div className='flex flex-col items-center justify-center'>
            <div className='mt-5 mb-3'>
              <Select
                selectionMode='single'
                label='Tárgy'
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className='w-56'
              >
                {subjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className='mb-3'>
              <Select
                selectionMode='single'
                label='Év'
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className='w-56'
              >
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className='mb-3'>
              <Select
                selectionMode='single'
                label='Időszak'
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className='w-56'
              >
                <SelectItem key={'tavasz'} value={'tavasz'}>
                  Tavasz
                </SelectItem>
                <SelectItem key={'osz'} value={'osz'}>
                  Ősz
                </SelectItem>
              </Select>
            </div>
            <div className='mb-3'>
              <Select
                selectionMode='single'
                label='Szint'
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className='w-56'
              >
                <SelectItem key={'kozep'} value={'kozep'}>
                  Közép
                </SelectItem>
                <SelectItem key={'emelt'} value={'emelt'}>
                  Emelt
                </SelectItem>
              </Select>
            </div>

            <div className='space-x-3'>
              <ButtonGroup>
                <Button
                  isDisabled={!flPdfLink}
                  className='w-24 mt-3 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2'
                  onClick={flPdfLink ? () => window.open(flPdfLink) : () => {}}
                >
                  Feladatlap
                </Button>
                <Divider orientation='vertical' />
                <Button
                  isDisabled={!utPdfLink}
                  className='w-24 mt-3 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2'
                  onClick={utPdfLink ? () => window.open(utPdfLink) : () => {}}
                >
                  Útmutató
                </Button>
              </ButtonGroup>
            </div>
            <div className='space-x-3'>
              <ButtonGroup>
                {selectedSubject === 'inf' ||
                selectedSubject === 'infoism' ||
                selectedSubject === 'digkult' ? (
                  <Button
                    isDisabled={!flZipLink}
                    className='w-24 mt-3 text-sm bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-2'
                    onClick={
                      flZipLink ? () => window.open(flZipLink) : () => {}
                    }
                  >
                    Forrás
                  </Button>
                ) : null}
                <Divider orientation='vertical' />
                {selectedSubject === 'inf' ||
                selectedSubject === 'infoism' ||
                selectedSubject === 'digkult' ? (
                  <Button
                    isDisabled={!utZipLink}
                    className='w-24 mt-3 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2'
                    onClick={
                      utZipLink ? () => window.open(utZipLink) : () => {}
                    }
                  >
                    Megoldás
                  </Button>
                ) : null}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
