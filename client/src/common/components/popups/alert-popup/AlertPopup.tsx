import { DogSVG } from "@/common/assets/sgv/DogSgv";
import React from "react";

export interface AlertPopUpProps {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

export const AlertPopUp: React.FC<AlertPopUpProps> = ({
  open,
  title,
  description,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 flex flex-col items-center relative">
        <div className="flex flex-col items-center gap-2">
          <DogSVG />
          <span className="text-rose-500 font-bold text-lg mt-2">{title}</span>
        </div>
        <p className="text-center text-gray-600 text-sm mt-4 mb-6">
          {description}
        </p>
        <button
          className="w-full bg-rose-500 hover:bg-rose-600 hover:cursor-pointer text-white font-semibold py-2 rounded-lg transition"
          onClick={onClose}
        >
          Ok
        </button>
      </div>
    </div>
  );
};
