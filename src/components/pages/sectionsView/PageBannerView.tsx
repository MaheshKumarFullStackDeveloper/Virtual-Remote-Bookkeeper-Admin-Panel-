"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};


type PageBanner = {
  topHeading: string;
  mainHeading1: string;
  mainHeading2: string;
  mainHeading3: string;
  bottomHeading: string;
  buttonText: string;
  buttonUrl: string;
  leftImage: string;
  leftImageText: string;
  rightImage: string;
  order: string;
};



export default function PageBannerView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<PageBanner | null>(null);

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
    <div className="bg-[rgb(42,108,101)] w-[100%] p-4 m-auto h-[850px] ">
      <div className="flex flex-col sm:flex-row max-w-[1370px] w-full m-auto  ">
        <div className="flex-[1.2] float-left lg:ml-16 md:ml-5 sm:ml-1">
          <p className="leading-9 font-normal text-[25px] text-white font-Roboto mt-[50px]">
            {contentData?.topHeading}
          </p>

          <span
            className={`text-[#DAA520] border-b-[5px] text-left border-solid border-[#DAA520] rounded-[10px] capitalize -tracking-normal font-medium   text-[40px] sm:text-[40px] md:text-[55px] lg:text-[75px] leading-[55px] sm:leading-[55px] md:leading-[70px] lg:leading-[92px] `}
          >{contentData?.mainHeading1} </span>
          <span
            className={`text-white capitalize tracking-normal text-left outline-none font-medium  text-[40px] sm:text-[40px] md:text-[55px] lg:text-[75px] leading-[55px] sm:leading-[55px] md:leading-[70px] lg:leading-[92px]  `}
          >{contentData?.mainHeading2}
          </span>
          <br />
          <span
            className={`text-white capitalize text-left font-medium text-[40px] sm:text-[40px] md:text-[55px] lg:text-[75px] leading-[55px] sm:leading-[55px] md:leading-[70px] lg:leading-[92px] `}
          >{contentData?.mainHeading3} </span>
          <p className="leading-6 font-normal text-[19px] text-white font-sans mt-[20px]">
            {contentData?.bottomHeading}
          </p>
          <p className="mt-[30px]">
            <Link href={contentData?.buttonUrl || "#"} >
              <Button
                size="default"
                variant="default"
                className=" text-white font-Roboto font-[500] text-[20px] bg-[#daa521] rounded-[1px] pt-[9px] mt-[-8px] tb-[17px] px-[60px] h-[51px] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-black hover:text-white  no-underline "
              >{contentData?.buttonText} </Button>
            </Link>
          </p>
          <div className="flex flex-col md:flex-row w-full m-auto  ">
            <div className="flex-1 mt-[30px] ">
              {isImageFormat(contentData?.rightImage) ? (
                <Image
                  src={contentData?.leftImage || "/default-image.png"}
                  width={300}
                  height={80}
                  alt="home-banner"
                  className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
                ></Image>) : (<Image
                  src="/default-image.png"
                  width={300}
                  height={80}
                  alt="home-banner"
                  className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
                ></Image>)}

            </div>
            <div className="flex-1 ">

              <p className="leading-8 mt-10 font-normal text-[23px] text-white font-Roboto">
                {contentData?.leftImageText}
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 hidden md:block">


          {isImageFormat(contentData?.rightImage) ? (
            <Image
              src={contentData?.rightImage || "/default-image.png"}
              width={523}
              height={750}
              alt="home-banner"
              className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
            ></Image>) : (<Image
              src="/default-image.png"
              width={325}
              height={352}
              alt="home-banner"
              className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
            ></Image>)}
        </div>
      </div>
    </div>
  </>)

}