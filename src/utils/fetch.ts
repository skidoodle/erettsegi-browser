import type { Dispatch } from "react";

type Action =
	| { type: "SET_FL_ZIP_LINK"; payload: string }
	| { type: "SET_UT_ZIP_LINK"; payload: string }
	| { type: "SET_FL_PDF_LINK"; payload: string }
	| { type: "SET_UT_PDF_LINK"; payload: string }
	| { type: "SET_FL_MP3_LINK"; payload: string };

export const fetchData = async (
	selectedSubject: string,
	selectedYear: string,
	selectedPeriod: string,
	selectedLevel: string,
	dispatch: Dispatch<Action>,
) => {
	try {
		const url = `/api/erettsegi?vizsgatargy=${selectedSubject}&ev=${selectedYear}&idoszak=${selectedPeriod}&szint=${selectedLevel}`;

		const response = await fetch(url);

		if (response.ok) {
			const data = (await response.json()) as {
				flZipUrl?: string;
				utZipUrl?: string;
				flPdfUrl: string;
				utPdfUrl: string;
				flMp3Url?: string;
			};

			if (data.utZipUrl && data.flZipUrl) {
				dispatch({ type: "SET_FL_ZIP_LINK", payload: data.flZipUrl });
				dispatch({ type: "SET_UT_ZIP_LINK", payload: data.utZipUrl });
			}

			if (data.utPdfUrl && data.flPdfUrl) {
				dispatch({ type: "SET_FL_PDF_LINK", payload: data.flPdfUrl });
				dispatch({ type: "SET_UT_PDF_LINK", payload: data.utPdfUrl });
			}

			if (data.flMp3Url) {
				dispatch({ type: "SET_FL_MP3_LINK", payload: data.flMp3Url });
			}
		} else {
			console.error("Hiba történt az API hívás során.");
		}
	} catch (error) {
		console.error("Hiba történt az API hívás során.", error);
	}
};
