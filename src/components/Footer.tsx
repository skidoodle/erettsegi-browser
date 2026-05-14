"use client";

import { Source } from "@/components/Source";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export function Footer() {
	return (
		<div className="fixed bottom-0 py-5 left-0 right-0 text-center space-x-5">
			<Source />
			<ThemeSwitcher />
		</div>
	);
}
