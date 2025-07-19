import { PawPrint } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export const InfoRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof PawPrint;
  label: string;
  value: string | boolean | null;
}) =>
  value ? (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-rose-500" />
      <span className="text-sm font-medium text-gray-800">{label}:</span>
      <span className="text-sm text-gray-700">{value}</span>
    </div>
  ) : (
    <Fragment></Fragment>
  );
