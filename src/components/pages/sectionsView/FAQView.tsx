"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type FAQ = {
  heading: string;
  categorySlug: string;
};


export default function FAQView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<FAQ | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes


  return (<>
    <div className="my-5 md:my-8 lg:my-11 max-w-[1370px] w-full m-auto p-5">
      <h2>{contentData?.heading}</h2>

      <div className="flex justify-center max-w-[1100px] item-center w-full m-auto p-2">
        <Image
          src="/FAQView.png"
          width={725}
          height={352}
          alt="home-banner"
          className="transition delay-150 m-0 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
        ></Image>
      </div>
    </div>
  </>)

}