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
