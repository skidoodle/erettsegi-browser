"use client";

import { Button } from "@heroui/button";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function NotFound() {
	return (
		<main className="dark:bg-[#121212] text-foreground bg-background py-5">
			<div className="flex min-h-screen flex-col items-center justify-center">
				<h1 className="text-7xl font-bold text-blue-400">404</h1>
				<div className="mt-5 mb-3 text-center">
					<p className="text-2xl font-semibold text-gray-600">
						Az keresett oldal nem található.
					</p>
					<Link href="/" className="mt-8 inline-block">
						<Button color="primary">Vissza a főoldalra</Button>
					</Link>
				</div>
			</div>
			<Footer />
		</main>
	);
}
