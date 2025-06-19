export const fetchData = async (
	selectedSubject: string,
	selectedYear: string,
	selectedPeriod: string,
	selectedLevel: string,
	setflZipLink: (link: string) => void,
	setutZipLink: (link: string) => void,
	setflPdfLink: (link: string) => void,
	setutPdfLink: (link: string) => void,
	setflMp3Link: (link: string) => void,
) => {
	try {
		const url = `/api/erettsegi?vizsgatargy=${selectedSubject}&ev=${selectedYear}&idoszak=${selectedPeriod}&szint=${selectedLevel}`;

		const response = await fetch(url);

		if (response.ok) {
			const data = (await response.json()) as {
				flZipUrl: string;
				utZipUrl: string;
				flPdfUrl: string;
				utPdfUrl: string;
				flMp3Url: string;
			};

			if (data.utZipUrl && data.flZipUrl) {
				setflZipLink(data.flZipUrl);
				setutZipLink(data.utZipUrl);
			}

			if (data.utPdfUrl && data.flPdfUrl) {
				setflPdfLink(data.flPdfUrl);
				setutPdfLink(data.utPdfUrl);
			}

			if (data.flMp3Url) {
				setflMp3Link(data.flMp3Url);
			}
		} else {
			console.error("Hiba történt az API hívás során.");
		}
	} catch (error) {
		console.error("Hiba történt az API hívás során.", error);
	}
};
