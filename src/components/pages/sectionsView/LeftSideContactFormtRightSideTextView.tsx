"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type LeftSideContactFormtRightSideTextView = {
  heading: string;
  subHeading: string;
  description: string;
};
export default function LeftSideContactFormtRightSideTextViewView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<LeftSideContactFormtRightSideTextView | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes



  return (<>

    <>


      <div className=" my-5 mt-0   max-w-[1370px] text-center justify-between w-full m-auto p-8 ">
        <h2>{contentData?.heading}</h2>
        <p className="  text-center text-[#596475]">
          {contentData?.subHeading ?? ""}
        </p>
      </div>
      <div className="flex flex-col md:flex-row my-5 mt-0   max-w-[1370px] w-full m-auto p-8 pt-[60px]">

        <div className="flex-1 bg-black text-white border-white border-solid border-7 px-7 py-8 p-2 text-left ">
          <Image
            src={"/innerform.png"}
            width={623}
            height={352}
            alt="home-banner"
            className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
          ></Image>

        </div>
        <div className="flex-1 p-4 text-center">

          <div className="pagesec text-center "
            dangerouslySetInnerHTML={{ __html: contentData?.description ?? "" }}
          />
        </div>
      </div>
    </>

  </>)

}