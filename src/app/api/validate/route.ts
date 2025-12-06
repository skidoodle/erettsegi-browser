import { type NextRequest, NextResponse } from "next/server";

const ALLOWED_HOSTS = [
	"localhost:3000",
	"erettsegi.albert.lol",
	"dload-oktatas.educatio.hu",
];

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = req.nextUrl;
		let link = searchParams.get("link");

		if (!link) {
			return NextResponse.json({
				parameters: {
					link: {
						type: "string",
						required: true,
						allowed_hosts: ALLOWED_HOSTS,
					},
				},
				example: `/api/validate?link=https://dload-oktatas.educatio.hu/erettsegi/feladatok_2023tavasz_kozep/k_mat_23maj_fl.pdf`,
			});
		}

		let url: URL;
		try {
			url = new URL(link);
		} catch {
			return NextResponse.json(
				{ error: "Érvénytelen link formátum" },
				{ status: 400 },
			);
		}

        if (url.pathname === "/api/proxy" && url.searchParams.has("link")) {
			const realTarget = url.searchParams.get("link");
			if (realTarget) {
				try {
					const realUrl = new URL(realTarget);
					link = realTarget;
					url = realUrl;
				} catch {}
			}
		}

		if (!ALLOWED_HOSTS.includes(url.host)) {
			return NextResponse.json({ error: "Érvénytelen link" }, { status: 400 });
		}

		const response = await fetch(link, {
			method: "HEAD",
		});

		return NextResponse.json({ status: response.status }, { status: 200 });
	} catch (error) {
		console.error("Validation Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
