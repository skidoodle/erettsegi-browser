"use client";

import { Button } from "@heroui/react";
import { VscGithubInverted } from "react-icons/vsc";

export function Source() {
	return (
		<Button
			isIconOnly
			aria-label="Source Code"
			className="bg-gray-200 dark:bg-[#27272a] hover:bg-gray-300 dark:hover:bg-[#3f3f46] text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 rounded-xl w-10 h-10 shadow-sm transition-colors"
			onPress={() =>
				window.open("https://github.com/skidoodle/erettsegi-browser")
			}
		>
			<VscGithubInverted size={18} />
		</Button>
	);
}
