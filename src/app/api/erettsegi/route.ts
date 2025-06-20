import { type NextRequest, NextResponse } from "next/server";
import { subjects } from "@/utils/subjects";

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = req.nextUrl;
		const vizsgatargy = searchParams.get("vizsgatargy");
		const ev = searchParams.get("ev");
		const idoszak = searchParams.get("idoszak");
		const szint = searchParams.get("szint");

		if (!vizsgatargy || !ev || !idoszak || !szint) {
			const missingParams = [];
			if (!vizsgatargy) missingParams.push("vizsgatargy");
			if (!ev) missingParams.push("ev");
			if (!idoszak) missingParams.push("idoszak");
			if (!szint) missingParams.push("szint");

			return NextResponse.json(
				{ error: `Hiányzó paraméterek: ${missingParams.join(", ")}` },
				{ status: 400 },
			);
		}

		if (parseInt(ev, 10) <= 2012) {
			return NextResponse.json({ error: "Érvénytelen év" }, { status: 400 });
		}

		const validSubjects = subjects.map((subject) => subject.value);
		if (!validSubjects.includes(vizsgatargy)) {
			return NextResponse.json(
				{ error: "Érvénytelen vizsgatárgy" },
				{ status: 400 },
			);
		}

		let honap: string;
		switch (idoszak) {
			case "osz":
				honap = "okt";
				break;
			case "tavasz":
				honap = "maj";
				break;
			default:
				return NextResponse.json(
					{ error: "Érvénytelen időszak" },
					{ status: 400 },
				);
		}

		let prefix: string;
		switch (szint) {
			case "emelt":
				prefix = `e_${vizsgatargy}`;
				break;
			case "kozep":
				prefix = `k_${vizsgatargy}`;
				break;
			default:
				return NextResponse.json(
					{ error: "Érvénytelen szint" },
					{ status: 400 },
				);
		}

		const protocol =
			req.headers.get("x-forwarded-proto") === "https" ? "https" : "http";
		const host = req.headers.get("host");
		const baseUrl = `https://dload-oktatas.educatio.hu/erettsegi/feladatok_${ev}${idoszak}_${szint}/`;
		const proxiedUrl = `${protocol}://${host}/api/proxy?link=${encodeURI(baseUrl)}`;

		const shortev = ev.slice(-2);
		const feladat = "fl";
		const utmutato = "ut";
		const forras = "for";
		const megoldas = "meg";

		let flPdfUrl: string | undefined,
			utPdfUrl: string | undefined,
			flZipUrl: string | undefined,
			utZipUrl: string | undefined,
			flMp3Url: string | undefined;

		switch (vizsgatargy) {
			case "inf":
			case "infoism":
			case "digkult":
				flZipUrl = `${baseUrl}${prefix}${forras}_${shortev}${honap}_${feladat}.zip`;
				flPdfUrl = `${proxiedUrl}${prefix}_${shortev}${honap}_${feladat}.pdf`;
				utZipUrl = `${baseUrl}${prefix}${megoldas}_${shortev}${honap}_${utmutato}.zip`;
				utPdfUrl = `${proxiedUrl}${prefix}_${shortev}${honap}_${utmutato}.pdf`;
				break;
			case "angol":
			case "nemet":
				flPdfUrl = `${proxiedUrl}${prefix}_${shortev}${honap}_${feladat}.pdf`;
				utPdfUrl = `${proxiedUrl}${prefix}_${shortev}${honap}_${utmutato}.pdf`;
				flMp3Url = `${baseUrl}${prefix}_${shortev}${honap}_${feladat}.mp3`;
				break;
			default:
				flPdfUrl = `${proxiedUrl}${prefix}_${shortev}${honap}_${feladat}.pdf`;
				utPdfUrl = `${proxiedUrl}${prefix}_${shortev}${honap}_${utmutato}.pdf`;
				break;
		}

		return NextResponse.json(
			{ flPdfUrl, utPdfUrl, flZipUrl, utZipUrl, flMp3Url },
			{
				status: 200,
				headers: { "Cache-Control": "s-maxage=31536000" },
			},
		);
	} catch (e: unknown) {
		console.error("An unexpected error occurred in the API route:", e);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
