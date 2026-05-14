"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { VscColorMode } from "react-icons/vsc";

export function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button
				isIconOnly
				className="bg-gray-200 dark:bg-[#27272a] rounded-xl w-10 h-10 opacity-0 pointer-events-none"
				aria-hidden="true"
			/>
		);
	}

	return (
		<Button
			isIconOnly
			aria-label="Switch Theme"
			className="bg-gray-200 dark:bg-[#27272a] hover:bg-gray-300 dark:hover:bg-[#3f3f46] text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 rounded-xl w-10 h-10 shadow-sm transition-colors"
			onPress={() => setTheme(theme === "light" ? "dark" : "light")}
		>
			<VscColorMode size={18} />
		</Button>
	);
}
