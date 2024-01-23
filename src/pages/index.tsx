import React, { useEffect } from 'react'
import { ButtonGroup, Divider } from '@nextui-org/react'
import { PdfButton, ZipButton } from '@/components/Buttons'
import { Footer } from '@/components/Footer'
import { fetchData } from '@/utils/fetch'
import useYears from '@/hooks/useYears'
import { useAppState } from '@/hooks/useState'
import {
  SubjectSelector,
  YearSelector,
  PeriodSelector,
  LevelSelector,
} from '@/components/Selectors'
import { subjects } from '@/utils/subjects'

export default function Home() {
  const {
    flPdfLink,
    setflPdfLink,
    utPdfLink,
    setutPdfLink,
    flZipLink,
    setflZipLink,
    utZipLink,
    setutZipLink,
    selectedSubject,
    setSelectedSubject,
    selectedYear,
    setSelectedYear,
    selectedPeriod,
    setSelectedPeriod,
    selectedLevel,
    setSelectedLevel,
    years,
    setYears,
  } = useAppState()

  useYears(setYears)

  useEffect(() => {
    if (selectedLevel && selectedPeriod && selectedSubject && selectedYear) {
      void fetchData(
        selectedSubject,
        selectedYear,
        selectedPeriod,
        selectedLevel,
        setflZipLink,
        setutZipLink,
        setflPdfLink,
        setutPdfLink
      )
    }
  }, [selectedLevel, selectedPeriod, selectedSubject, selectedYear])

  return (
    <main className='dark:bg-[#121212] text-foreground bg-background py-5'>
      <h1 className='text-4xl font-bold text-[#4f81fe] text-center mt-16'>
        Érettségi kereső
      </h1>
      <div className='flex min-h-screen flex-col items-center justify-between'>
        <div className='container mx-auto'>
          <div className='flex flex-col items-center justify-center'>
            <div className='mt-5 mb-3'>
              <SubjectSelector
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                subjects={subjects}
              />
            </div>
            <div className='mb-3'>
              <YearSelector
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                years={years}
              />
            </div>
            <div className='mb-3'>
              <PeriodSelector
                selectedPeriod={selectedPeriod}
                setSelectedPeriod={setSelectedPeriod}
              />
            </div>
            <div className='mb-3'>
              <LevelSelector
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
              />
            </div>
            <div className='space-x-3'>
              <ButtonGroup>
                <PdfButton label='Feladatlap' link={flPdfLink} />
                <Divider orientation='vertical' />
                <PdfButton label='Útmutató' link={utPdfLink} />
              </ButtonGroup>
            </div>
            {['inf', 'infoism', 'digkult'].includes(selectedSubject) && (
              <div className='space-x-3'>
                <ButtonGroup>
                  <ZipButton label='Forrás' link={flZipLink} />
                  <Divider orientation='vertical' />
                  <ZipButton label='Megoldás' link={utZipLink} />
                </ButtonGroup>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
