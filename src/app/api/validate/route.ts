import { type NextRequest, NextResponse } from "next/server";
import { Agent, fetch } from "undici";

const insecureAgent = new Agent({
	connect: {
		rejectUnauthorized: false,
	},
});

const ALLOWED_HOSTS = [
	"localhost:3000",
	"erettsegi.albert.lol",
	"dload-oktatas.educatio.hu",
];

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = req.nextUrl;
		const link = searchParams.get("link");

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
		} catch (_error) {
			return NextResponse.json(
				{ error: "Érvénytelen link formátum" },
				{ status: 400 },
			);
		}

		if (!ALLOWED_HOSTS.includes(url.host)) {
			return NextResponse.json({ error: "Érvénytelen link" }, { status: 400 });
		}

		const response = await fetch(link, {
			method: "HEAD",
			dispatcher: insecureAgent,
		});

		return NextResponse.json({ status: response.status }, { status: 200 });
	} catch (e: unknown) {
		console.error("Validation Error:", e);

		const errorResponse = {
			error: "Internal Server Error",
			message: e instanceof Error ? e.message : "An unexpected error occurred",
			...(process.env.NODE_ENV === "development" &&
				e instanceof Error && { stack: e.stack }),
		};

		return NextResponse.json(errorResponse, { status: 500 });
	}
}
