import { cn } from "@/utils/cn"; // Sesuaikan path ini
import Image from "next/image";
import { ChangeEvent, DragEvent, useState } from "react";
import { CiSaveUp2 } from "react-icons/ci";

interface PropTypes {
  name: string;
  isDropable?: boolean;
  className?: string;
  onChange?: (file: File | null) => void;
}

const InputFile = (props: PropTypes) => {
  const { className, isDropable = false, name, onChange } = props;
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation(); 

    if (!isDropable) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedImage(file);
      if (onChange) onChange(file);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedImage(file);
      if (onChange) onChange(file);
    }
  };

  return (
    <label
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn(
        "flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100",
        className,
      )}
    >
      {uploadedImage ? (
        <div className="flex w-full flex-col items-center justify-center p-5">
          <div className="relative mb-2 h-32 w-32">
            {" "}
            <Image
              fill
              src={URL.createObjectURL(uploadedImage)}
              alt="preview"
              className="rounded-md object-contain" 
            />
          </div>
          <p className="max-w-[200px] truncate text-center text-sm font-semibold text-gray-500">
            {uploadedImage.name}
          </p>
          <p className="mt-2 text-xs text-primary">Click or Drop to replace</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-5">
          <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
          <p className="text-center text-sm font-semibold text-gray-500">
            {isDropable
              ? "Drag and drop or click to upload file here"
              : "Click to upload file here"}
          </p>
        </div>
      )}

      <input
        name={name}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleOnChange}
      />
    </label>
  );
};

export default InputFile;
