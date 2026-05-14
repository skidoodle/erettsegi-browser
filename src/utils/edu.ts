import {
	subjects,
	resourceMap,
	type Subject,
	type ResourceSlug,
} from "@/utils/subjects";

export type { ResourceSlug };

export type Period = "tavasz" | "osz";
export type Level = "kozep" | "emelt";

interface ParsedQuery {
	subject?: Subject;
	year?: string;
	period?: Period;
	level?: Level;
	resourceType?: ResourceSlug;
}

export function parseSegments(segments: string[]): ParsedQuery {
	const result: ParsedQuery = {};

	for (const segment of segments) {
		const lower = segment.toLowerCase();

		if (/^20[1-2][0-9]$/.test(lower)) {
			result.year = lower;
			continue;
		}

		if (lower === "kozep" || lower === "emelt") {
			result.level = lower as Level;
			continue;
		}

		if (lower === "tavasz" || lower === "osz") {
			result.period = lower as Period;
			continue;
		}

		if (Object.keys(resourceMap).includes(lower)) {
			result.resourceType = lower as ResourceSlug;
			continue;
		}

		const foundSubject = subjects.find(
			(s) => s.slug === lower || s.aliases.includes(lower),
		);
		if (foundSubject) {
			result.subject = foundSubject;
		}
	}

	return result;
}

export function getExternalUrl(
	subjectCode: string,
	year: string,
	period: string,
	level: string,
	typeSlug: ResourceSlug,
): string | null {
	const typeCode = resourceMap[typeSlug];
	if (!typeCode) return null;

	const month = period === "osz" ? "okt" : "maj";
	const prefix = level === "emelt" ? `e_${subjectCode}` : `k_${subjectCode}`;
	const shortYear = year.slice(-2);

	const baseUrl = `https://dload-oktatas.educatio.hu/erettsegi/feladatok_${year}${period}_${level}/`;
	let filename = "";

	switch (typeCode) {
		case "fl":
			filename = `${prefix}_${shortYear}${month}_fl.pdf`;
			break;
		case "ut":
			filename = `${prefix}_${shortYear}${month}_ut.pdf`;
			break;
		case "for":
			if (!["inf", "infoism", "digkult"].includes(subjectCode)) return null;
			filename = `${prefix}for_${shortYear}${month}_fl.zip`;
			break;
		case "meg":
			if (!["inf", "infoism", "digkult"].includes(subjectCode)) return null;
			filename = `${prefix}meg_${shortYear}${month}_ut.zip`;
			break;
		case "hang":
			if (!["angol", "nemet"].includes(subjectCode)) return null;
			filename = `${prefix}_${shortYear}${month}_fl.mp3`;
			break;
	}

	return filename ? `${baseUrl}${filename}` : null;
}
