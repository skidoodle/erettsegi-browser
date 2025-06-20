import { type NextRequest, NextResponse } from "next/server";
import { Agent, fetch } from "undici";

const insecureAgent = new Agent({
	connect: {
		rejectUnauthorized: false,
	},
});

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

		if (url.hostname !== "dload-oktatas.educatio.hu") {
			return NextResponse.json({ error: "Érvénytelen link" }, { status: 400 });
		}

		const externalResponse = await fetch(link, {
			method: "GET",
			dispatcher: insecureAgent,
		});

		if (!externalResponse.ok) {
			return NextResponse.json(
				{ error: "Hiba történt a külső forrás lekérése során." },
				{ status: externalResponse.status },
			);
		}

		const body = await externalResponse.arrayBuffer();

		const contentType = externalResponse.headers.get("content-type");
		const headers = new Headers();
		headers.set("Cache-Control", "s-maxage=31536000, stale-while-revalidate");

		if (contentType) {
			headers.set("Content-Type", contentType);
			if (contentType === "application/pdf") {
				const filename = url.pathname.split("/").pop() ?? "document.pdf";
				headers.set("Content-Disposition", `inline; filename="${filename}"`);
			}
		}

		return new Response(body, {
			status: 200,
			headers: headers,
		});
	} catch (e: unknown) {
		console.error("Proxy Error:", e);
		if (e instanceof Error) {
			return NextResponse.json(
				{ error: "Internal Server Error", message: e.message },
				{ status: 500 },
			);
		}
		return NextResponse.json(
			{ error: "An unexpected internal error occurred" },
			{ status: 500 },
		);
	}
}
