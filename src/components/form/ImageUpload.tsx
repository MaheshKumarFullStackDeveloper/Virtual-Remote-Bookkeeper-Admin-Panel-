"use client";
import React, { useState } from "react";
import FileInput from "./input/FileInput";
import Label from "./Label";
import { useUploadImageMutation } from "@/app/store/api";
import toast, { LoaderIcon } from "react-hot-toast";


export default function ImageUpload() {


  const [uploadImage] = useUploadImageMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setIsLoading(true);
    if (file) {


      // Validate image type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml', 'image/webp', 'image/svg'];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PNG, JPG, JPEG, GIF, SVG, and WEBP formats are allowed", { position: 'bottom-center' });
        setIsLoading(false);
        return;
      }

      // Validate image size (in bytes)
      const maxSizeInBytes = 150 * 1024; // 150KB
      if (file.size > maxSizeInBytes) {
        toast.error("Image size must be less than 150KB", { position: 'bottom-center' });
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("images", file);
      console.log("Selected file:", file.name);
      try {
        const result = await uploadImage(formData).unwrap();
        if (result.success) {
          toast.success("Image Added successfully ", { position: 'bottom-center' });


        }
      } catch (error) {
        console.log("Faild to upload Image", error);
        toast.error("Faild to upload Image", { position: 'bottom-center' });
      } finally {

        setIsLoading(false);
      }
    }
  };

  return (

    <div>
      <Label>Upload file  {isLoading ? (<LoaderIcon className="float-left mr-2" />) : ""}
      </Label>
      {isLoading ? "" : (<FileInput onChange={handleFileChange} className="custom-class" />)}

    </div>

  );
}
