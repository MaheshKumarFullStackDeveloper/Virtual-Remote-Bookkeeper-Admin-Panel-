"use client";
import { useDeleteImageByIdMutation, useGetImagesQuery } from "@/app/store/api";
import Pagination from "@/components/tables/Pagination";
import { ImageDetails } from "@/lib/types/types";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ThreeColumnImageGrid() {


  const [deleteImageById] = useDeleteImageByIdMutation()
  const [images, setImages] = useState<ImageDetails[]>([])
  const [currentPagen, setCurrentPagen] = useState<number>(1)
  const [toFrom, setToFrom] = useState<string>("")
  const [totalPage, setTotalPage] = useState<number>(1)
  const limit = 50;
  const { data: apiResponse = {} } = useGetImagesQuery({ page: currentPagen, limit: limit })

  useEffect(() => {
    if (apiResponse.success) {
      setImages(apiResponse.data.images)
      setTotalPage(apiResponse.data.totalPages)

      const from = (currentPagen - 1) * limit + 1;
      const toimg = Math.min(currentPagen * limit, apiResponse.data.totalImages);


      setToFrom(`Total images : ${apiResponse.data.totalImages}, show ${from} to ${toimg} `);
    }

  }, [apiResponse, currentPagen, toFrom, limit])

  const handleDeleteImage = async (imageId: string) => {
    try {

      const result = await deleteImageById(imageId).unwrap();

      if (result.success) {
        toast.success("Delete image successfully", { position: 'bottom-center' })
        console.log("This is delete result", result)
      }

    } catch (error) {
      console.log("Error on login", error)
      toast.error("Image not Deleted ", { position: 'bottom-center' });
    } finally {

    }
  }
  const handlePageChange = (page: number) => {
    setCurrentPagen(page);
  };

  return (
    <>


      {images && images.length > 0 ? (<>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {images.map((img) => (
            <div key={img._id} className=" relative">
              <Link target="blank" href={img.image.toString()} className="cursor-pointer re">
                <Image
                  src={img.image.toString()}

                  alt=" grid"
                  className="mb-4 h-[338px] w-full object-cover group-hover:scale-105 rounded-md transition-shadow duration-300 hover:shadow-2xl bg-white border-0"

                  width={338}
                  height={192}
                /></Link>
              <Trash2 onClick={() => handleDeleteImage(img._id)} className="absolute cursor-pointer top-1 right-1 rounded-lg bg-gradient-to-b from-red-400 to-red-600 shadow-lg shadow-red-500/50 px-2 py-1 text-2xl font-bold text-white flex flex-col transform hover:scale-105 active:translate-y-1 " />
            </div>
          ))}
        </div>
        <div className="px-6 py-5 flex flex-row w-[100%] relative">
          <div className="basis-1/2">
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{toFrom}</h3> </div>
          <div className="basis-1/2 text-right"><Pagination currentPage={currentPagen} totalPages={totalPage} onPageChange={handlePageChange} /></div>
        </div>


      </>
      ) : (<h2> Not Uploaded Image</h2>)}



    </>
  );
}
