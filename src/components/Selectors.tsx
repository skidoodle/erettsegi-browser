"use client";

import { Select, ListBox } from "@heroui/react";
import { useState } from "react";

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
	className = "w-full",
}: SelectorProps) {
	const [isOpen, setIsOpen] = useState(false);
	const isActive = selectedValue || isOpen;

	return (
		<Select
			value={selectedValue}
			onChange={(key) => onSelectionChange(String(key))}
			onOpenChange={setIsOpen}
			className={className}
			aria-label={label}
		>
			<Select.Trigger
				className={`group relative w-full h-14 px-3.5 justify-center rounded-xl bg-white dark:bg-[#27272a] hover:bg-gray-100 dark:hover:bg-[#3f3f46] transition-colors outline-none text-left shadow-sm cursor-pointer border border-gray-200 dark:border-transparent focus-within:border-gray-300 dark:focus-within:border-[#3f3f46] ${
					isOpen ? "bg-gray-100 dark:bg-[#3f3f46]" : ""
				}`}
			>
				<div className="flex items-center justify-between w-full h-full">
					<div className="relative w-full h-full flex flex-col justify-center overflow-hidden">
						<span
							className={`absolute left-0 transition-all duration-200 ease-out pointer-events-none font-semibold text-gray-500 dark:text-zinc-400 ${
								isActive
									? "top-0 text-[10px]"
									: "top-1/2 -translate-y-1/2 text-sm"
							}`}
						>
							{label}
						</span>

						<div
							className={`w-full mt-3.5 transition-opacity duration-200 ${
								selectedValue ? "opacity-100" : "opacity-0"
							}`}
						>
							<Select.Value className="text-sm font-semibold text-gray-900 dark:text-zinc-200 truncate leading-tight block w-full" />
						</div>
					</div>

					<Select.Indicator
						className={`text-gray-400 dark:text-zinc-400 group-hover:text-gray-600 dark:group-hover:text-zinc-300 transition-all duration-200 shrink-0 ml-2 ${
							isOpen ? "rotate-180 dark:text-zinc-300" : ""
						}`}
					/>
				</div>
			</Select.Trigger>

			<Select.Popover className="w-(--trigger-width) bg-white dark:bg-[#18181b] border border-gray-200 dark:border-[#27272a] rounded-xl shadow-xl overflow-hidden mt-1 z-50">
				<ListBox
					items={items}
					selectionMode="single"
					aria-label={`${label} options`}
					className="max-h-75 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700"
				>
					{(item) => (
						<ListBox.Item
							id={item.value}
							textValue={item.label}
							className="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-[#27272a] hover:text-gray-900 dark:hover:text-white focus:bg-gray-100 dark:focus:bg-[#27272a] focus:text-gray-900 dark:focus:text-white outline-none transition-colors mb-0.5 last:mb-0"
						>
							<span className="font-medium">{item.label}</span>
							<ListBox.ItemIndicator className="text-blue-600 dark:text-blue-500" />
						</ListBox.Item>
					)}
				</ListBox>
			</Select.Popover>
		</Select>
	);
}
