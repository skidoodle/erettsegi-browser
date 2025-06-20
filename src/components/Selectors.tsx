"use client";

import { Select, SelectItem } from "@heroui/react";

interface SelectorItem {
	value: string;
	label: string;
}

interface SelectorProps {
	label: string;
	selectedValue: string;
	onSelectionChange: (value: string) => void;
	items: SelectorItem[];
	className?: string;
}

export const periodItems = [
	{ value: "tavasz", label: "Tavasz" },
	{ value: "osz", label: "Ősz" },
];

export const levelItems = [
	{ value: "kozep", label: "Közép" },
	{ value: "emelt", label: "Emelt" },
];

export function Selector({
	label,
	selectedValue,
	onSelectionChange,
	items,
	className = "w-56",
}: SelectorProps) {
	return (
		<Select
			selectionMode="single"
			disallowEmptySelection={true}
			label={label}
			selectedKeys={selectedValue ? [selectedValue] : []}
			onSelectionChange={(keys) => {
				const key = Array.from(keys)[0];
				if (key) {
					onSelectionChange(String(key));
				}
			}}
			className={className}
		>
			{items.map((item) => (
				<SelectItem key={item.value}>{item.label}</SelectItem>
			))}
		</Select>
	);
}
