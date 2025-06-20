"use client";
import React, { useEffect, useState } from "react";
type AddProps = {
  content: string;
};

type OneRowThreeColumn = {
  heading1: string;
  description1: string;
  heading2: string;
  description2: string;
  heading3: string;
  description3: string;
};



export default function OneRowThreeColumnView({ content }: AddProps): React.JSX.Element {

  const [contentData, setcontentData] = useState<OneRowThreeColumn | null>(null);

  useEffect(() => {
    if (content !== "") {
      const Details = JSON.parse(content);

      setcontentData(Details)
    }



  }, [content]); // Runs whenever selectedSection changes


  return (<>

    <div className="my-5  max-w-[1370px] bg-[#003A3A] w-full m-auto p-5">
      <div className="flex flex-col md:flex-row  max-w-[1100px] bg-[#003A3A] w-full m-auto p-2">

        <div className="bg-[#B1ADA4] flex-1 p-3 mb-3"  >
          <h1 className="text-[#dbc100] text-[49px] mt-3 mb-8">1 </h1>
          <p className="text-center w-full m-auto">
            <strong className="text-[18px] text-white leading-[31px]  uppercase">
              {contentData?.heading1}
            </strong>
          </p>
          <p className="text-center w-full m-auto px-6 mb-10">
            <span className="text-[16px] text-white leading-[31px]  " dangerouslySetInnerHTML={{ __html: contentData?.description1 || "" }} />
          </p>
        </div>

        <div className="flex-1 p-3 mb-3"  >
          <h1 className="text-[#dbc100] text-[49px] mt-3 mb-8">2 </h1>
          <p className="text-center w-full m-auto">
            <strong className="text-[18px] text-white leading-[31px]  uppercase">
              {contentData?.heading2}
            </strong>
          </p>
          <p className="text-center w-full m-auto px-6 mb-10">
            <span className="text-[16px] text-white leading-[31px]  " dangerouslySetInnerHTML={{ __html: contentData?.description2 || "" }} />
          </p>
        </div>

        <div className="bg-[#B1ADA4] flex-1 p-3 mb-3"  >
          <h1 className="text-[#dbc100] text-[49px] mt-3 mb-8">3 </h1>
          <p className="text-center w-full m-auto">
            <strong className="text-[18px] text-white leading-[31px]  uppercase">
              {contentData?.heading3}
            </strong>
          </p>
          <p className="text-center w-full m-auto px-6 mb-10">
            <span className="text-[16px] text-white leading-[31px]  " dangerouslySetInnerHTML={{ __html: contentData?.description3 || "" }} />
          </p>
        </div>

      </div>
    </div>


  </>)

}