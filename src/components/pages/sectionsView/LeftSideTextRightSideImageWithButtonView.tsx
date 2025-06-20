"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type LeftSideTextRightSideImageWithButton = {
  buttonUrl: string;
  buttonText: string;
  heading: string;
  description: string;
  image: string;
  order: string;
};


export default function LeftSideTextRightSideImageWithButtonView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<LeftSideTextRightSideImageWithButton | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes

  const isImageFormat = (imageUrl: string | undefined): boolean => {
    return !!imageUrl && /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(imageUrl);
  };
  return (<>

    <div className="flex flex-col md:flex-row my-5 md:my-14 bg-[#16252D] max-w-[1420px] w-full m-auto p-1 md:p-5">
      <div className="flex-1  py-2 px-5 ">
        <h2 className=" text-[#DAA520] text-left">{contentData?.heading}</h2>
        <ul className="list-disc pl-5 mt-6 text-white">
          <div
            className="text-left p-8 pt-0 singleBlogPage"
            dangerouslySetInnerHTML={{ __html: contentData?.description || "" }} />
        </ul>
        <Link href={contentData?.buttonUrl || '#'}>

          <Button
            size="lg"
            variant="default"
            className="bg-[#DAA520] text-black mt-10 px-10 ml-3 mb-6 text-[16px] hover:bg-[#DAA520]  hover:-translate-y-1 hover:scale-90 hover:backdrop-blur-md"
          >
            {contentData?.buttonText} <ArrowRightIcon className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      <div className="flex-1 p-2   ">
        {isImageFormat(contentData?.image) ? (
          <Image
            src={contentData?.image || "/default-image.png"}
            width={720}
            height={352}
            alt="home-banner"
            className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
          ></Image>
        ) : (<Image
          src="/default-image.png"
          width={720}
          height={352}
          alt="home-banner"
          className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
        ></Image>)}
      </div>
    </div>




  </>)

}