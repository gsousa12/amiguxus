import { Input } from "@/common/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

export const PasswordInput = ({
  show,
  toggle,
  register,
  error,
}: {
  show: boolean;
  toggle: () => void;
  register: UseFormRegisterReturn;
  error: boolean;
}) => (
  <div className="relative">
    <Input
      type={show ? "text" : "password"}
      placeholder="●●●●●●"
      {...register}
      className={`${error && "border-rose-500 pr-10"}`}
    />
    <button
      type="button"
      onClick={toggle}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
    >
      {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
    </button>
  </div>
);
