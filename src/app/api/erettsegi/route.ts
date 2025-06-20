import { type NextRequest, NextResponse } from "next/server";
import { subjects } from "@/utils/subjects";

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = req.nextUrl;
		const vizsgatargy = searchParams.get("vizsgatargy");
		const ev = searchParams.get("ev");
		const idoszak = searchParams.get("idoszak");
		const szint = searchParams.get("szint");

		if (!vizsgatargy && !ev && !idoszak && !szint) {
			const currentYear = new Date().getFullYear();
			return NextResponse.json({
				parameters: {
					vizsgatargy: {
						type: "string",
						required: true,
						values: subjects.map((s) => ({
							value: s.value,
							label: s.label,
						})),
					},
					ev: {
						type: "integer",
						required: true,
						values: `2013 - ${currentYear}`,
					},
					idoszak: {
						type: "string",
						required: true,
						values: ["tavasz", "osz"],
					},
					szint: {
						type: "string",
						required: true,
						values: ["kozep", "emelt"],
					},
				},
				example:
					"/api/erettsegi?vizsgatargy=mat&ev=2023&idoszak=tavasz&szint=kozep",
			});
		}

		if (!vizsgatargy || !ev || !idoszak || !szint) {
			const missingParams = [
				!vizsgatargy && "vizsgatargy",
				!ev && "ev",
				!idoszak && "idoszak",
				!szint && "szint",
			].filter(Boolean);

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

		const honap = idoszak === "osz" ? "okt" : "maj";
		const prefix = szint === "emelt" ? `e_${vizsgatargy}` : `k_${vizsgatargy}`;

		const protocol =
			req.headers.get("x-forwarded-proto") === "https" ? "https" : "http";
		const host = req.headers.get("host");
		const baseUrl = `https://dload-oktatas.educatio.hu/erettsegi/feladatok_${ev}${idoszak}_${szint}/`;
		const proxiedUrl = `${protocol}://${host}/api/proxy?link=${encodeURI(
			baseUrl,
		)}`;

		const shortev = ev.slice(-2);
		const feladat = "fl";
		const utmutato = "ut";
		const forras = "for";
		const megoldas = "meg";

		const urls = {
			flPdfUrl: `${proxiedUrl}${prefix}_${shortev}${honap}_${feladat}.pdf`,
			utPdfUrl: `${proxiedUrl}${prefix}_${shortev}${honap}_${utmutato}.pdf`,
			flZipUrl: ["inf", "infoism", "digkult"].includes(vizsgatargy)
				? `${baseUrl}${prefix}${forras}_${shortev}${honap}_${feladat}.zip`
				: undefined,
			utZipUrl: ["inf", "infoism", "digkult"].includes(vizsgatargy)
				? `${baseUrl}${prefix}${megoldas}_${shortev}${honap}_${utmutato}.zip`
				: undefined,
			flMp3Url: ["angol", "nemet"].includes(vizsgatargy)
				? `${baseUrl}${prefix}_${shortev}${honap}_${feladat}.mp3`
				: undefined,
		};

		return NextResponse.json(urls, {
			status: 200,
			headers: { "Cache-Control": "s-maxage=31536000" },
		});
	} catch (e: unknown) {
		console.error("An unexpected error occurred in the API route:", e);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
