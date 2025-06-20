"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type OneRowTwoColumn = {
  mainHeading: string;
  heading1: string;
  buttonText1: string;
  buttonUrl1: string;
  description1: string;
  heading2: string;
  buttonText2: string;
  buttonUrl2: string;
  description2: string;
  mainButtonText: string;
  mainButtonUrl: string;
};


export default function OneRowTwoColumnView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<OneRowTwoColumn | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes


  return (<>

    <div className="my-5 md:my-8 lg:my-6 max-w-[1370px] bg-[#003a3a] w-full m-auto p-5  text-center  px-1 md:px-16 pb-14">
      <h2 className="text-[#fff] mt-5 ">{contentData?.mainHeading}</h2>

      <div className="flex flex-col md:flex-row  max-w-[1370px] w-full m-auto p-1 md:p-2 mb-14">

        <div className="flex-1 border border-solid border-white p-4 m-2   text-left" >
          <h4 className="text-white text-left font-dm">
            {contentData?.heading1}
          </h4>
          <p className=" font-dm  text-left" dangerouslySetInnerHTML={{ __html: contentData?.description1 || "" }} />
          <Link href={contentData?.buttonUrl1 || '#'}>

            <Button
              size="lg"
              variant="default"
              className="bg-[#fff] hover:bg-[#DAA520] cursor-alias transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  text-black mt-10 px-14 mb-6 text-[16px] hover:border hover:border-solid hover:border-white"
            >
              {contentData?.buttonText1} <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>


        <div className="flex-1 border border-solid border-white p-4 m-2   text-left" >
          <h4 className="text-white text-left font-dm">
            {contentData?.heading2}
          </h4>
          <p className=" font-dm  text-left" dangerouslySetInnerHTML={{ __html: contentData?.description2 || "" }} />
          <Link href={contentData?.buttonUrl2 || '#'}>

            <Button
              size="lg"
              variant="default"
              className="bg-[#fff] hover:bg-[#DAA520] cursor-alias transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  text-black mt-10 px-14 mb-6 text-[16px] hover:border hover:border-solid hover:border-white"
            >
              {contentData?.buttonText2} <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </Link>
        </div>



      </div>
      <Link
        className="my-20 mt-16 mx-auto float-none"
        href={contentData?.mainButtonUrl || '#'}
      >

        <Button
          size="lg"
          variant="default"
          className="bg-[#DAA520] hover:bg-[#DAA520] cursor-alias transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  text-black  px-20 py-1 text-[16px] text-center "
        >
          {contentData?.mainButtonText} <ArrowRightIcon className="h-5 w-5" />
        </Button>
      </Link>
    </div>

  </>)

}