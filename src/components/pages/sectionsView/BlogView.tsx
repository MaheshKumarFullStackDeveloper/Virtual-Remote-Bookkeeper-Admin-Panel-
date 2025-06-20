"use client";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type Blog = {
  heading: string;
  description: string;
  categorySlug: string;
};


export default function BlogView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<Blog | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes


  return (<>
    <div className="my-5 md:my-8 lg:my-11 max-w-[1370px] w-full m-auto p-5">
      <h2>{contentData?.heading}</h2>
      <p className=" my-12 text-center text-[#596475]">{contentData?.description}</p>
      <div className="flex justify-center max-w-[1100px] item-center w-full m-auto p-2">
        <Image
          src="/BlogView.png"
          width={725}
          height={352}
          alt="home-banner"
          className="transition delay-150 m-0 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:backdrop-blur-md"
        ></Image>

      </div>
      <div className="flex justify-center max-w-[1100px] item-center w-full m-auto p-2">

        <Link className="my-20 mt-16 mx-auto float-none" href="/blogs"> <Button size="lg" variant="default" className="bg-[#DAA520] hover:bg-[#DAA520] cursor-alias transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110  text-white  px-20 py-1 text-[16px]" >View More  <ArrowRightIcon className="h-5 w-5" />
        </Button></Link>
      </div>
    </div>
  </>)

}