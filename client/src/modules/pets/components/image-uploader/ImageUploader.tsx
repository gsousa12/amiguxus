import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";

interface ImageUploaderProps {
  value: File[];
  onChange: (files: File[]) => void;
}

export const ImageUploader = ({ value = [], onChange }: ImageUploaderProps) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentFiles = value || [];
      const newFiles = acceptedFiles.slice(0, 3 - currentFiles.length);
      onChange([...currentFiles, ...newFiles]);
    },
    [onChange, value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".gif", ".jpeg", ".jpg"] },
    maxFiles: 3,
  });

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = value.filter((_, index) => index !== indexToRemove);
    onChange(updatedFiles);
  };

  useEffect(() => {
    const newPreviews = value?.map((file) => URL.createObjectURL(file)) || [];
    setPreviews(newPreviews);
    return () => newPreviews.forEach((url) => URL.revokeObjectURL(url));
  }, [value]);

  return (
    <div>
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${
          isDragActive
            ? "border-rose-500 bg-rose-50"
            : "border-rose-300 hover:border-rose-400 hover:bg-rose-50"
        }`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="w-10 h-10 text-rose-500 mb-2" />
        <p className="text-sm text-center text-gray-600">
          {isDragActive
            ? "Solte as fotos aqui!"
            : "Arraste e solte as fotos ou clique para selecionar"}
        </p>
        <p className="text-xs text-gray-500">
          Até 3 fotos (PNG, JPG, GIF até 5MB)
        </p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-rose-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
