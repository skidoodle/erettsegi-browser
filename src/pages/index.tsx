import { useState, useEffect } from 'react'
import { useAvailableYears } from '@/utils/years'
import { subjects } from '@/utils/subjects'
import Footer from '@/components/Footer'

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

  useAvailableYears(setYears)

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto mt-15">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-3">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-[#181a1b] text-[#efefef] w-56 max-w-lg h-10 px-4 text-sm border border-[#3C4143] rounded-lg focus:outline-none hover:bg-[#3C4143] transition-colors duration-150"
            >
              <option value="">Tárgy</option>
              {subjects.map((subject) => (
                <option key={subject.value} value={subject.value}>
                  {subject.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-[#181a1b] text-[#efefef] w-56 max-w-lg h-10 px-4 text-sm border border-[#3C4143] rounded-lg focus:outline-none hover:bg-[#3C4143] transition-colors duration-150"
            >
              <option value="">Év</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-[#181a1b] text-[#efefef] w-56 max-w-lg h-10 px-4 text-sm border border-[#3C4143] rounded-lg focus:outline-none hover:bg-[#3C4143] transition-colors duration-150"
            >
              <option value="">Időszak</option>
              <option value="tavasz">Tavasz</option>
              <option value="osz">Ősz</option>
            </select>
          </div>
          <div className="mb-3">
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-[#181a1b] text-[#efefef] w-56 max-w-lg h-10 px-4 text-sm border border-[#3C4143] rounded-lg focus:outline-none hover:bg-[#3C4143] transition-colors duration-150"
            >
              <option value="">Szint</option>
              <option value="kozep">Közép</option>
              <option value="emelt">Emelt</option>
            </select>
          </div>

          <div className="space-x-3">
            <button
              className="w-24 mt-3 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={flPdfLink ? () => window.open(flPdfLink) : () => {}}
            >
              Feladatlap
            </button>
            <button
              className="w-24 mt-3 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={utPdfLink ? () => window.open(utPdfLink) : () => {}}
            >
              Útmutató
            </button>
          </div>
          <div className="space-x-3">
            {selectedSubject === 'inf' || selectedSubject === 'infoism' ? (
              <button
                className="w-24 mt-3 text-sm bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
                onClick={flZipLink ? () => window.open(flZipLink) : () => {}}
              >
                Forrás
              </button>
            ) : null}
            {selectedSubject === 'inf' || selectedSubject === 'infoism' ? (
              <button
                className="w-24 mt-3 text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={utZipLink ? () => window.open(utZipLink) : () => {}}
              >
                Megoldás
              </button>
            ) : null}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
