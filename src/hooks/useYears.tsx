"use client";

import { useEffect } from "react";

export default function useYears(setYears: (years: string[]) => void) {
	useEffect(() => {
		const currentYear = new Date().getFullYear();
		const availableYears: string[] = [];
		for (let year = currentYear; year >= 2013; year--) {
			availableYears.push(year.toString());
		}
		setYears(availableYears);
	}, [setYears]);
}
