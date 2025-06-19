import { useState } from "react";
import useYears from "@/hooks/useYears";

export const useAppState = () => {
	const [flPdfLink, setflPdfLink] = useState<string>("");
	const [utPdfLink, setutPdfLink] = useState<string>("");
	const [flZipLink, setflZipLink] = useState<string>("");
	const [utZipLink, setutZipLink] = useState<string>("");
	const [flMp3Link, setflMp3Link] = useState<string>("");
	const [selectedSubject, setSelectedSubject] = useState<string>("");
	const [selectedYear, setSelectedYear] = useState<string>("");
	const [selectedPeriod, setSelectedPeriod] = useState<string>("");
	const [selectedLevel, setSelectedLevel] = useState<string>("");
	const [years, setYears] = useState<string[]>([]);

	useYears(setYears);

	return {
		flPdfLink,
		setflPdfLink,
		utPdfLink,
		setutPdfLink,
		flZipLink,
		setflZipLink,
		utZipLink,
		setutZipLink,
		flMp3Link,
		setflMp3Link,
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
	};
};
