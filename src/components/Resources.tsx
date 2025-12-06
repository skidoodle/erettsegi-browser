"use client";

import { Button, type ButtonProps as HeroButtonProps } from "@heroui/react";
import { useCallback, useEffect, useState, memo } from "react";

export interface ResourceProps {
	label: string;
	link: string;
}

type ButtonColor = HeroButtonProps["color"];

const ResourceComponent = ({ label, link }: ResourceProps) => {
	const [status, setStatus] = useState<number>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const checkLinkStatus = useCallback(async (): Promise<void> => {
		if (link) {
			try {
				setIsLoading(true);
				const response = await fetch(`/api/validate?link=${encodeURI(link)}`);
				const data = (await response.json()) as { status: number };
				setStatus(data.status);
			} catch {
				setStatus(500);
			} finally {
				setIsLoading(false);
			}
		} else {
			setStatus(undefined);
		}
	}, [link]);

	useEffect(() => {
		void checkLinkStatus();
	}, [checkLinkStatus]);

	const getColor = useCallback((): ButtonColor => {
		if (isLoading) return "default";
		if (status === 200) return "primary";
		if (status === 404) return "danger";
		return "default";
	}, [isLoading, status]);

	const handleClick = useCallback(() => {
		if (status === 200 && link) {
			window.open(link);
		} else {
			console.error("A hivatkozás nem elérhető.");
		}
	}, [status, link]);

	return (
		<Button
			isDisabled={status !== 200 || !link || isLoading}
			isLoading={isLoading}
			className="w-28 mt-3 text-sm font-bold py-2 px-2"
			color={getColor()}
			onPress={handleClick}
		>
			{label}
		</Button>
	);
};

export const Resource = memo(ResourceComponent);
