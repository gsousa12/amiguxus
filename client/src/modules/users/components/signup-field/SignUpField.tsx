import { Label } from "@/common/components/ui/label";

export const SignUpField = ({
  label,
  error,
  children,
  className = "",
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`relative ${className}`}>
    <Label>{label}</Label>
    {children}
    {error && (
      <p className="absolute -bottom-5 text-xs text-rose-500">{error}</p>
    )}
  </div>
);
