"use client";

import { Button } from "@heroui/button";
import { VscGithubInverted } from "react-icons/vsc";

export const Source = () => {
	return (
		<Button
			aria-label="Source Code"
			size="sm"
			onPress={() =>
				window.open("https://github.com/skidoodle/erettsegi-browser")
			}
		>
			<VscGithubInverted size={20} />
		</Button>
	);
};
