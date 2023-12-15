"use client";

import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  error: string;
}

export const ImageUpload = (props: ImageUploadProps, setImage: any) => {
  const {
    value, // value = url ảnh sau khi component đc render lại
    onChange,
    error,
  } = props;

  //  console.log(value)
  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        //sau tải ảnh lên ấn nút done thì chạy callback trong onUpload,
        // trong callback chạy vào function onchange lấy đc url của ảnh vừa tải lên
        onUpload={(result: any) => onChange(result.info.secure_url)}
        uploadPreset="fzznci3y"
      >
        <div
          className={`
          ${error ? "border-rose-500 border-2 rounded-full" : ""}
            ${value ? "border-none" : "border-2"}
            border-dashed
            border-primary/10 
            rounded-full 
            hover:opacity-75 
            transition 
            flex 
            flex-col 
            space-y-2 
            items-center 
            justify-center
          `}
        >
          <div className="relative h-[100px] w-[100px]">
            {value ? (
              <Image // hiện thị ảnh sau khi có url
                fill
                alt="Upload"
                src={value}
                className="rounded-full object-cover "
              />
            ) : (
              <i
                className={`fa-solid fa-camera-retro ${
                  error ? "text-rose-600" : ""
                } text-xl absolute bottom-[40px] left-[40px]`}
              ></i>
            )}
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};
