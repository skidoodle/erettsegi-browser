"use client";

import { ButtonGroup, Divider } from "@heroui/react";
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
		<main className="dark:bg-[#121212] text-foreground bg-background py-5">
			<h1 className="text-4xl font-bold text-blue-400 text-center mt-16">
				Érettségi kereső
			</h1>
			<div className="flex min-h-screen flex-col items-center justify-between">
				<div className="container mx-auto">
					<div className="flex flex-col items-center justify-center">
						<div className="mt-5 mb-3">
							<Selector
								label="Tárgy"
								selectedValue={selectedSubject}
								onSelectionChange={(subject) =>
									dispatch({ type: "SET_SELECTED_SUBJECT", payload: subject })
								}
								items={subjectItems}
							/>
						</div>
						<div className="mb-3">
							<Selector
								label="Év"
								selectedValue={selectedYear}
								onSelectionChange={(year) =>
									dispatch({ type: "SET_SELECTED_YEAR", payload: year })
								}
								items={yearItems}
							/>
						</div>
						<div className="mb-3">
							<Selector
								label="Időszak"
								selectedValue={selectedPeriod}
								onSelectionChange={(period) =>
									dispatch({ type: "SET_SELECTED_PERIOD", payload: period })
								}
								items={periodItems}
							/>
						</div>
						<div className="mb-3">
							<Selector
								label="Szint"
								selectedValue={selectedLevel}
								onSelectionChange={(level) =>
									dispatch({ type: "SET_SELECTED_LEVEL", payload: level })
								}
								items={levelItems}
							/>
						</div>
						<div className="space-x-3">
							<ButtonGroup>
								<Resource label="Feladatlap" link={flPdfLink} />
								<Divider orientation="vertical" />
								<Resource label="Útmutató" link={utPdfLink} />
							</ButtonGroup>
						</div>
						{["inf", "infoism", "digkult"].includes(selectedSubject) && (
							<div className="space-x-3">
								<ButtonGroup>
									<Resource label="Forrás" link={flZipLink} />
									<Divider orientation="vertical" />
									<Resource label="Megoldás" link={utZipLink} />
								</ButtonGroup>
							</div>
						)}
						{["angol", "nemet"].includes(selectedSubject) && (
							<div className="space-x-3">
								<Resource label="Hang" link={flMp3Link} />
							</div>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</main>
	);
}
