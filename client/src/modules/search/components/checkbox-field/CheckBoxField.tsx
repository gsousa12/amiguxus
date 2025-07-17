import { Checkbox } from "@/common/components/ui/checkbox";

export const CheckboxField = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <label className="flex items-center gap-2 text-gray-800">
    <Checkbox checked={checked} onCheckedChange={(val) => onChange(!!val)} />
    {label}
  </label>
);
