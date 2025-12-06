import { type NextRequest, NextResponse } from "next/server";
import { parseSegments, getExternalUrl, type ResourceSlug } from "@/utils/edu";

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	try {
		const { slug } = await params;

		const { subject, year, period, level, resourceType } = parseSegments(slug);

		if (!subject || !year || !period || !level || !resourceType) {
			return NextResponse.json(
				{ error: "Invalid download link. Missing parameters." },
				{ status: 400 },
			);
		}

		const targetUrl = getExternalUrl(
			subject.value,
			year,
			period,
			level,
			resourceType as ResourceSlug,
		);

		if (!targetUrl) {
			return NextResponse.json(
				{ error: "This file type does not exist for this subject." },
				{ status: 404 },
			);
		}

		const externalResponse = await fetch(targetUrl, { method: "GET" });

		if (!externalResponse.ok) {
			return NextResponse.json(
				{ error: "File not found on external server." },
				{ status: 404 },
			);
		}

		const headers = new Headers(externalResponse.headers);
		headers.set("Cache-Control", "s-maxage=31536000, stale-while-revalidate");

		const filename = targetUrl.split("/").pop() ?? "erettsegi_file";
		headers.set("Content-Disposition", `inline; filename="${filename}"`);

		return new NextResponse(externalResponse.body, { status: 200, headers });
	} catch (e) {
		console.error("Proxy Error", e);
		return NextResponse.json({ error: "Internal Error" }, { status: 500 });
	}
}
