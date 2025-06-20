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
			return NextResponse.json(
				{ error: "Hiányzó paraméter: link" },
				{ status: 400 },
			);
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

		if (e instanceof Error) {
			const cause = e.cause as { code?: unknown } | undefined;
			return NextResponse.json(
				{
					error: "Internal Server Error",
					message: e.message,
					cause: cause?.code ? String(cause.code) : undefined,
					stack: process.env.NODE_ENV === "development" ? e.stack : undefined,
				},
				{ status: 500 },
			);
		}

		return NextResponse.json(
			{
				error: "Internal Server Error",
				message: "An unexpected error occurred",
				details: String(e),
			},
			{ status: 500 },
		);
	}
}
