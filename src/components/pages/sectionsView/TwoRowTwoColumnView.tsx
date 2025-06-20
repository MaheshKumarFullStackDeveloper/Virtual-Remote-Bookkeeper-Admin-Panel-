"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type TwoRowTwoColumn = {
  mainHeading: string;
  heading1: string;
  buttonText1: string;
  buttonUrl1: string;
  description1: string;
  heading2: string;
  buttonText2: string;
  buttonUrl2: string;
  description2: string;
  heading3: string;
  buttonText3: string;
  buttonUrl3: string;
  description3: string;
  heading4: string;
  buttonText4: string;
  buttonUrl4: string;
  description4: string;
};



export default function TwoRowTwoColumnView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<TwoRowTwoColumn | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes


  return (<>

    <div className="my-5 md:my-8 lg:my-5 max-w-[1370px] bg-black w-full m-auto p-5  px-1 md:px-16">
      <h2 className="text-[#DAA520] mt-5 ">{contentData?.mainHeading}</h2>

      <div className="grid  grid-cols-1  min-[460px]:grid-cols-2  md:grid-cols-2  gap-3 max-w-[1370px] w-full m-auto p-1 md:p-2">

        <div className=" p-2 ">
          <h4 className="text-white text-left font-dm">  {contentData?.heading1}
          </h4>
          <p className=" font-dm"> {contentData?.description1}</p>
          <Link href={contentData?.buttonUrl1 || '#'}>

            <Button
              size="lg"
              variant="default"
              className="bg-[#DAA520] hover:bg-[#DAA520] cursor-alias transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  text-black mt-10 px-14 ml-3 mb-6 text-[16px]"
            >
              {contentData?.buttonText1} <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>


        <div className=" p-2 ">
          <h4 className="text-white text-left font-dm">  {contentData?.heading2}
          </h4>
          <p className=" font-dm"> {contentData?.description2}</p>
          <Link href={contentData?.buttonUrl2 || '#'}>

            <Button
              size="lg"
              variant="default"
              className="bg-[#DAA520] hover:bg-[#DAA520] cursor-alias transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  text-black mt-10 px-14 ml-3 mb-6 text-[16px]"
            >
              {contentData?.buttonText2} <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>


        <div className=" p-2 ">
          <h4 className="text-white text-left font-dm">  {contentData?.heading3}
          </h4>
          <p className=" font-dm"> {contentData?.description3}</p>
          <Link href={contentData?.buttonUrl3 || '#'}>

            <Button
              size="lg"
              variant="default"
              className="bg-[#DAA520] hover:bg-[#DAA520] cursor-alias transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  text-black mt-10 px-14 ml-3 mb-6 text-[16px]"
            >
              {contentData?.buttonText3} <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>


        <div className=" p-2 ">
          <h4 className="text-white text-left font-dm">  {contentData?.heading4}
          </h4>
          <p className=" font-dm"> {contentData?.description4}</p>
          <Link href={contentData?.buttonUrl4 || '#'}>

            <Button
              size="lg"
              variant="default"
              className="bg-[#DAA520] hover:bg-[#DAA520] cursor-alias transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  text-black mt-10 px-14 ml-3 mb-6 text-[16px]"
            >
              {contentData?.buttonText4} <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>


      </div>
    </div>

  </>)

}