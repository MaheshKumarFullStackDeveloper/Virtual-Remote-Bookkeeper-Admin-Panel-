"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type TopTextBottomContactForm = {
  heading: string;
  description: string;
};


export default function TopTextBottomContactFormView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<TopTextBottomContactForm | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes


  return (<>


    <div className="my-5 md:my-8 lg:my-11 max-w-[1100px]  text-center  w-full m-auto p-5">
      <h2>{contentData?.heading}</h2>
      <p className=" my-12 text-center text-[#596475]" dangerouslySetInnerHTML={{ __html: contentData?.description || "" }} />


      <div className="flex justify-center  text-white px-7 w-full py-8 p-2 item-center  ">
        <Image
          src="/Qform.png"
          width={600}
          height={352}
          alt="home-banner"
          className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md float-none m-0"
        ></Image>
      </div>
    </div>
  </>)

}