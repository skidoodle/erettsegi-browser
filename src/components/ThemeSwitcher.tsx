"use client";

import { Button } from "@heroui/button";
import { useTheme } from "next-themes";
import { VscColorMode } from "react-icons/vsc";

export const ThemeSwitcher = () => {
	const { theme, setTheme } = useTheme();

	const toggle = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<Button aria-label="Switch Theme" size="sm" onPress={() => toggle()}>
			{theme === "light" ? (
				<VscColorMode style={{ fill: "black" }} size={20} />
			) : (
				<VscColorMode size={20} key={"dark"} />
			)}
		</Button>
	);
};
