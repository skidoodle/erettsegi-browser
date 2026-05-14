"use client";

import { ButtonGroup, Separator } from "@heroui/react";
import { useContext, useEffect, useCallback } from "react";
import { Resource } from "@/components/Resources";
import { Footer } from "@/components/Footer";
import { Selector, periodItems, levelItems } from "@/components/Selectors";
import { AppContext } from "@/ctx/app";
import { fetchData } from "@/utils/fetch";
import { subjects } from "@/utils/subjects";
import useYears from "@/hooks/useYears";

export default function Home() {
	const { state, dispatch } = useContext(AppContext);
	const {
		flPdfLink,
		utPdfLink,
		flZipLink,
		utZipLink,
		flMp3Link,
		selectedSubject,
		selectedYear,
		selectedPeriod,
		selectedLevel,
		years,
	} = state;

	const setYearsCallback = useCallback(
		(newYears: string[]) => {
			dispatch({ type: "SET_YEARS", payload: newYears });
		},
		[dispatch],
	);

	useYears(setYearsCallback);

	useEffect(() => {
		if (selectedLevel && selectedPeriod && selectedSubject && selectedYear) {
			void fetchData(
				selectedSubject,
				selectedYear,
				selectedPeriod,
				selectedLevel,
				dispatch,
			);
		}
	}, [selectedLevel, selectedPeriod, selectedSubject, selectedYear, dispatch]);

	const subjectItems = subjects.map((subject) => ({
		value: subject.value,
		label: subject.label,
	}));
	const yearItems = years.map((year) => ({ value: year, label: year }));

	return (
		<main className="text-foreground bg-gray-50 dark:bg-[#121212] min-h-screen flex flex-col items-center py-10 px-4">
			<h1 className="text-4xl font-bold text-blue-400 text-center mt-12 mb-10 tracking-tight">
				Érettségi kereső
			</h1>

			<div className="w-full max-w-60 flex flex-col items-center gap-2.5">
				<Selector
					label="Tárgy"
					selectedValue={selectedSubject}
					onSelectionChange={(subject) =>
						dispatch({ type: "SET_SELECTED_SUBJECT", payload: subject })
					}
					items={subjectItems}
				/>
				<Selector
					label="Év"
					selectedValue={selectedYear}
					onSelectionChange={(year) =>
						dispatch({ type: "SET_SELECTED_YEAR", payload: year })
					}
					items={yearItems}
				/>
				<Selector
					label="Időszak"
					selectedValue={selectedPeriod}
					onSelectionChange={(period) =>
						dispatch({ type: "SET_SELECTED_PERIOD", payload: period })
					}
					items={periodItems}
				/>
				<Selector
					label="Szint"
					selectedValue={selectedLevel}
					onSelectionChange={(level) =>
						dispatch({ type: "SET_SELECTED_LEVEL", payload: level })
					}
					items={levelItems}
				/>

				<div className="flex flex-col items-center gap-3 mt-4 w-full">
					<ButtonGroup className="w-full">
						<Resource label="Feladatlap" link={flPdfLink} />
						<Separator
							orientation="vertical"
							className="bg-black/20 dark:bg-zinc-700/50 w-px"
						/>
						<Resource label="Útmutató" link={utPdfLink} />
					</ButtonGroup>

					{["inf", "infoism", "digkult"].includes(selectedSubject) && (
						<ButtonGroup className="w-full">
							<Resource label="Forrás" link={flZipLink} />
							<Separator
								orientation="vertical"
								className="bg-black/20 dark:bg-zinc-700/50 w-px"
							/>
							<Resource label="Megoldás" link={utZipLink} />
						</ButtonGroup>
					)}

					{["angol", "nemet"].includes(selectedSubject) && flMp3Link && (
						<div className="w-full flex justify-center">
							<Resource label="Hang" link={flMp3Link} />
						</div>
					)}
				</div>
			</div>

			<Footer />
		</main>
	);
}
