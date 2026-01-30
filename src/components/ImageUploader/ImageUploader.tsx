import { useRef } from "react";
import { AddButton } from "@/components/AddButton";
import { EditButton } from "@/components/EditButton";
import ImgIcon from "@public/icons/img.svg";

interface ImageUploaderProps {
  imageUrl: string | null;
  onImageChange: (file: File) => void;
}

export default function ImageUploader({ imageUrl, onImageChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const englishOnly = /^[a-zA-Z0-9._-]+$/;
    if (!englishOnly.test(file.name)) {
      alert("이미지 파일 이름은 영어로만 이루어져야 합니다.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    onImageChange(file);
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      {imageUrl ? (
        <div className="relative w-full xl:w-[384px] h-[311px] rounded-[24px] overflow-hidden">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
          <div className="absolute bottom-4 right-4">
            <EditButton onClick={handleClick} />
          </div>
        </div>
      ) : (
        <div
          className="relative w-full xl:w-[384px] h-[311px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-[24px] flex items-center justify-center cursor-pointer"
          onClick={handleClick}
        >
          <ImgIcon className="w-16 h-16" />
          <div className="absolute bottom-4 right-4">
            <AddButton
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
