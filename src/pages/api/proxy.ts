import type { NextApiRequest, NextApiResponse } from "next";
import { Agent, fetch } from "undici";

const insecureAgent = new Agent({
	connect: {
		rejectUnauthorized: false,
	},
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { link } = req.query as { link: string };
	let missingParam: string | null = null;
	if (!link) {
		missingParam = "link";
	}

	if (missingParam) {
		return res
			.status(400)
			.json({ error: `Hiányzó paraméter: ${missingParam}` });
	}

	const domain = link.split("/")[2];
	if (domain !== "dload-oktatas.educatio.hu") {
		return res.status(400).json({ error: "Érvénytelen link" });
	}

	try {
		res.setHeader("Cache-Control", "s-maxage=31536000");

		const response = await fetch(link, {
			method: "GET",
			dispatcher: insecureAgent,
		});

		const contentType = response.headers.get("content-type");

		if (contentType === "application/pdf") {
			const filename = link.split("/").pop() ?? "document.pdf";
			res.setHeader("Content-Type", contentType);
			res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
		}

		if (response.ok) {
			const arrayBuffer: ArrayBuffer = await response.arrayBuffer();
			const buffer: Buffer = Buffer.from(arrayBuffer);
			res.send(buffer);
		} else {
			res
				.status(response.status)
				.json({ error: "Hiba történt a lekérés során." });
		}
	} catch (e: unknown) {
		if (e instanceof Error) {
			let causeCode: string | undefined;
			if (e.cause && typeof e.cause === "object" && "code" in e.cause) {
				causeCode = String((e.cause as { code: unknown }).code);
			}

			res.status(500).json({
				error: "Internal Server Error",
				message: e.message,
				cause: causeCode,
				stack: process.env.NODE_ENV === "development" ? e.stack : undefined,
			});
		} else {
			res.status(500).json({
				error: "Internal Server Error",
				message: "An unexpected error occurred",
				details: String(e),
			});
		}
	}
}
