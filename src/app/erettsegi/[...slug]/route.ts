import { type NextRequest, NextResponse } from "next/server";
import { parseSegments } from "@/utils/edu";
import { subjects } from "@/utils/subjects";

const LABELS = {
	periods: { tavasz: "Tavasz", osz: "Ősz" } as Record<string, string>,
	levels: { kozep: "Közép", emelt: "Emelt" } as Record<string, string>,
};

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	try {
		const { slug } = await params;
		const query = parseSegments(slug);

		const { subject, year, period, level } = query;

		const isComplete = subject && year && period && level;

		if (isComplete) {
			const protocol =
				req.headers.get("x-forwarded-proto") === "https" ? "https" : "http";
			const host = req.headers.get("host");

			const proxyBase = `${protocol}://${host}/proxy/${subject.slug}/${year}/${period}/${level}`;
			const makeLink = (type: string) => `${proxyBase}/${type}`;

			return NextResponse.json({
				found: true,
				meta: {
					subject: subject.label,
					year,
					period: LABELS.periods[period] ?? period,
					level: LABELS.levels[level] ?? level,
				},
				links: {
					flPdfUrl: makeLink("feladat"),
					utPdfUrl: makeLink("utmutato"),
					flZipUrl: ["inf", "infoism", "digkult"].includes(subject.value)
						? makeLink("forras")
						: undefined,
					utZipUrl: ["inf", "infoism", "digkult"].includes(subject.value)
						? makeLink("megoldas")
						: undefined,
					flMp3Url: ["angol", "nemet"].includes(subject.value)
						? makeLink("hang")
						: undefined,
				},
			});
		}

		const suggestions = {
			found: false,
			message: "Missing parameters",
			currentSelection: {
				subject: subject?.label || null,
				year: year || null,
				period: period ? (LABELS.periods[period] ?? period) : null,
				level: level ? (LABELS.levels[level] ?? level) : null,
			},
			options: {
				subjects: !subject ? subjects.map((s) => s.slug) : undefined,
				years: !year ? "2013 - 2024" : undefined,
				periods: !period ? Object.values(LABELS.periods) : undefined,
				levels: !level ? Object.values(LABELS.levels) : undefined,
			},
		};

		return NextResponse.json(suggestions);
	} catch (e) {
		console.error(e);
		return NextResponse.json({ error: "Server Error" }, { status: 500 });
	}
}
