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
			return NextResponse.json({ status: 400 });
		}

		const targetUrl = getExternalUrl(
			subject.value,
			year,
			period,
			level,
			resourceType as ResourceSlug,
		);
		if (!targetUrl) return NextResponse.json({ status: 404 });

		const res = await fetch(targetUrl, { method: "HEAD" });
		return NextResponse.json({ status: res.status });
	} catch {
		return NextResponse.json({ status: 500 });
	}
}
