import React from "react";
import { Sparkles } from "lucide-react";

export interface InitialOption {
  id: string;
  label: string;
}

interface InitialOptionsProps {
  options: InitialOption[];
  onSelect: (option: InitialOption) => void;
}

export const InitialOptions: React.FC<InitialOptionsProps> = ({
  options,
  onSelect,
}) => {
  if (options.length === 0) return null;

  return (
    <div
      className="
        flex
        gap-3
        overflow-x-auto
        pb-2
        -mx-4
        px-4
        scrollbar-hide
      "
    >
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          className="
            min-w-[220px]
            flex-shrink-0
            text-left
            rounded-xl
            border
            border-slate-200
            bg-white
            p-3
            shadow-sm
            transition-all
            hover:shadow-md
            hover:border-slate-300
            active:scale-[0.98]
          "
        >
          {/* Icono */}
          <div className="mb-2 flex items-center gap-1 text-slate-400">
            <Sparkles size={14} />
          </div>

          {/* Texto */}
          <p className="text-sm font-medium text-slate-800 leading-snug line-clamp-2">
            {option.label}
          </p>
        </button>
      ))}
    </div>
  );
};
