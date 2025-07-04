"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type LeftSideTextRightSideContactFormView = {
  heading: string;
  description: string;
};
export default function LeftSideTextRightSideContactFormViewView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<LeftSideTextRightSideContactFormView | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes


  return (<>



    <div className="flex flex-col md:flex-row   bg-[#003a3a]  max-w-[1370px] text-center justify-between w-full m-auto p-6 ">
      <div className="flex-1 p-2 mt-6">

        <h2 className="text-left mb-5" dangerouslySetInnerHTML={{ __html: contentData?.heading ?? "" }}
        />
        <div className="text-left text-white pagesec1"
          dangerouslySetInnerHTML={{ __html: contentData?.description ?? "" }}
        />
      </div>
      <div className="flex-1 my-5 mt-0  w-full m-auto p-6 pt-[60px]">

        <div className=" bg-black text-white border-white border-solid border-7 px-7 py-8 p-2 text-left ">
          <Image
            src={"/innerform.png"}
            width={623}
            height={352}
            alt="home-banner"
            className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
          ></Image>

        </div>


      </div>
    </div>



  </>)

}