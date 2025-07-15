import { X } from "lucide-react";

export const AppliedFiltersBar = ({
  applied,
  onRemove,
}: {
  applied: { key: string; label: string }[];
  onRemove: (key: string) => void;
}) =>
  applied.length ? (
    <div className="mb-6 flex flex-wrap gap-2">
      {applied.map(({ key, label }) => (
        <span
          key={key}
          className="flex items-center gap-1 rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-500"
        >
          {label}
          <button
            onClick={() => onRemove(key)}
            className="ml-1 rounded-full p-0.5 hover:bg-rose-200"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
    </div>
  ) : null;
