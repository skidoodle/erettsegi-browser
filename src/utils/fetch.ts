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
		const url = `/erettsegi/${selectedSubject}/${selectedYear}/${selectedPeriod}/${selectedLevel}`;

		const response = await fetch(url);
		const data = await response.json();

		if (response.ok && data.found) {
			const links = data.links;

			if (links.utZipUrl && links.flZipUrl) {
				dispatch({ type: "SET_FL_ZIP_LINK", payload: links.flZipUrl });
				dispatch({ type: "SET_UT_ZIP_LINK", payload: links.utZipUrl });
			}

			if (links.utPdfUrl && links.flPdfUrl) {
				dispatch({ type: "SET_FL_PDF_LINK", payload: links.flPdfUrl });
				dispatch({ type: "SET_UT_PDF_LINK", payload: links.utPdfUrl });
			}

			if (links.flMp3Url) {
				dispatch({ type: "SET_FL_MP3_LINK", payload: links.flMp3Url });
			}
		} else {
			console.log("Incomplete selection or not found:", data);
		}
	} catch (error) {
		console.error("API Error", error);
	}
};
