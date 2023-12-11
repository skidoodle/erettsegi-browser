export interface SelectorProps {
  years: string[]
  subjects: { label: string; value: string }[]
  selectedSubject: string
  selectedYear: string
  selectedPeriod: string
  selectedLevel: string
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>
  setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>
  setSelectedLevel: React.Dispatch<React.SetStateAction<string>>
}
