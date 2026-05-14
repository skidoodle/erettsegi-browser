"use client";

import { Select, ListBox } from "@heroui/react";

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
  return (
    <Select
      value={selectedValue}
      onChange={(value) => onSelectionChange(String(value))}
      className={className}
      aria-label={label}
    >
      <Select.Trigger className="group relative w-full h-14 px-3.5 rounded-xl bg-[#27272a] hover:bg-[#3f3f46] data-[open=true]:bg-[#3f3f46] transition-colors outline-none cursor-pointer shadow-sm">
        <div className="relative w-full h-full flex items-center justify-between gap-2">
          <div className="relative flex-1 h-full flex flex-col justify-center overflow-hidden">
            <span
              className={`absolute left-0 transition-all duration-300 ease-out pointer-events-none font-medium text-zinc-400 ${selectedValue
                ? "top-1 text-[11px]"
                : "top-1/2 -translate-y-1/2 text-sm group-data-[open=true]:top-1 group-data-[open=true]:translate-y-0 group-data-[open=true]:text-[11px]"
                }`}
            >
              {label}
            </span>

            <div
              className={`transition-opacity duration-300 w-full mt-4 ${selectedValue
                ? "opacity-100"
                : "opacity-0 group-data-[open=true]:opacity-100"
                }`}
            >
              <Select.Value className="text-sm font-semibold text-zinc-100 block w-full truncate text-left" />
            </div>
          </div>

          <Select.Indicator className="text-zinc-400 group-hover:text-zinc-300 group-data-[open=true]:text-zinc-300 group-data-[open=true]:rotate-180 transition-all duration-300 shrink-0" />
        </div>
      </Select.Trigger>

      <Select.Popover className="w-[--trigger-width] bg-[#18181b] border border-[#27272a] rounded-xl shadow-xl mt-1 z-50">
        <ListBox
          items={items}
          selectionMode="single"
          aria-label={`${label} options`}
          className="max-h-75 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-zinc-700"
        >
          {(item) => (
            <ListBox.Item
              id={item.value}
              textValue={item.label}
              className="flex items-center justify-between px-3 py-2.5 text-sm rounded-lg cursor-pointer text-zinc-300 hover:bg-[#27272a] hover:text-white focus:bg-[#27272a] focus:text-white outline-none transition-colors mb-0.5 last:mb-0"
            >
              <span className="font-medium">{item.label}</span>
              <ListBox.ItemIndicator className="text-blue-500" />
            </ListBox.Item>
          )}
        </ListBox>
      </Select.Popover>
    </Select>
  );
}
