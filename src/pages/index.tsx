import { useState, useEffect } from 'react'

export default function Home() {
    const [pdfLink, setPdfLink] = useState<string>('')
    const [selectedSubject, setSelectedSubject] = useState<string>('')
    const [selectedYear, setSelectedYear] = useState<string>('')
    const [selectedSeason, setSelectedSeason] = useState<string>('')
    const [selectedLevel, setSelectedLevel] = useState<string>('')
    const [selectedType, setSelectedType] = useState<string>('')

    const subjects = [
        { value: 'k_magyir', label: 'Magyar' },
        { value: 'k_mat', label: 'Matek' },
        { value: 'k_tort', label: 'Történelem' },
        { value: 'k_angol', label: 'Angol' },
        { value: 'k_nemet', label: 'Német' },
        { value: 'k_inf', label: 'Közismereti Informatika' },
        { value: 'k_infoism', label: 'Szakmai Informatika' },
    ]

    const [years, setYears] = useState<string[]>([])

    useEffect(() => {
        const currentYear = new Date().getFullYear()
        const availableYears: string[] = []
        for (let year = currentYear; year >= 2005; year--) {
            availableYears.push(year.toString())
        }
        setYears(availableYears)
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `/api/erettsegi?vizsgatargy=${selectedSubject}&ev=${selectedYear}&evszak=${selectedSeason}&szint=${selectedLevel}&tipus=${selectedType}`
                )

                if (response.ok) {
                    const data = await response.json()
                    if (data.pdfUrl) {
                        setPdfLink(data.pdfUrl)
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
        selectedSeason,
        selectedLevel,
        selectedType,
    ])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="container mx-auto mt-15">
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-3">
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="w-56 max-w-lg h-10 px-4 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none"
                        >
                            <option value="">Tantárgy</option>
                            {subjects.map((subject) => (
                                <option
                                    key={subject.value}
                                    value={subject.value}
                                >
                                    {subject.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="w-56 max-w-lg h-10 px-4 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none"
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
                            value={selectedSeason}
                            onChange={(e) => setSelectedSeason(e.target.value)}
                            className="w-56 max-w-lg h-10 px-4 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none"
                        >
                            <option value="">Évszak</option>
                            <option value="osz">Ősz</option>
                            <option value="tavasz">Tavasz</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="w-56 max-w-lg h-10 px-4 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none"
                        >
                            <option value="">Szint</option>
                            <option value="kozep">Közép</option>
                            <option value="emelt">Emelt</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-56 max-w-lg h-10 px-4 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none"
                        >
                            <option value="">Típus</option>
                            <option value="fl">Feladatlap</option>
                            <option value="ut">Útmutató</option>
                        </select>
                    </div>
                    <button
                        className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={
                            pdfLink ? () => window.open(pdfLink) : () => {}
                        }
                    >
                        Megnyitás
                    </button>
                </div>
            </div>
        </main>
    )
}
