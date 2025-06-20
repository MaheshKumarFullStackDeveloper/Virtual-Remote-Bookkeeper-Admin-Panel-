"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type LeftSideTextRightSideImage = {
  heading: string;
  description: string;
  image: string;
};
export default function LeftSideTextRightSideImageView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<LeftSideTextRightSideImage | null>(null);

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
    <div className="my-5 md:my-8 lg:my-11 max-w-[1370px] w-full m-auto p-5">
      <h3>{contentData?.heading}</h3>
    </div>
    <div className="flex flex-col md:flex-row my-1 md:my-5  max-w-[1370px] w-full m-auto p-1 md:p-5">
      <div className="flex-1 mt-1 lg:mt-16 text-[18px] text-[#596475] p-5 pr-8 leading-[1.66em] " dangerouslySetInnerHTML={{ __html: contentData?.description || "" }}>

      </div>
      <div className="flex-1 p-2   ">
        {isImageFormat(contentData?.image) ? (
          <Image
            src={contentData?.image || "/default-image.png"}
            width={623}
            height={352}
            alt="home-banner"
            className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
          ></Image>
        ) : (<Image
          src="/default-image.png"
          width={623}
          height={352}
          alt="home-banner"
          className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
        ></Image>)}
      </div>
    </div>
  </>)

}