export const TextField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-2">
    <p className="text-sm font-medium text-gray-800">{label}</p>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border px-3 py-2 text-sm"
      placeholder={`Digite ${label.toLowerCase()}`}
    />
  </div>
);
