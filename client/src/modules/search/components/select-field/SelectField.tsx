import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";

export const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: any;
  options: Record<string, string>;
  onChange: (v: any) => void;
}) => (
  <div className="space-y-2">
    <p className="text-sm font-medium text-gray-800">{label}</p>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(options).map(([val, lab]) => (
          <SelectItem key={val} value={val}>
            {lab}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
