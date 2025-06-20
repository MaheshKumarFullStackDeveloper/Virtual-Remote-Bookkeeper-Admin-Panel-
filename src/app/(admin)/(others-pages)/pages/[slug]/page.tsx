import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SectionsList from "@/components/pages/SectionsList";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: " Single Pages",
  description: "Single Pages  ",
};

export default function allPages() {


  return (
    <>
      <div>
        <PageBreadcrumb pageTitle="Single Page" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <SectionsList />
        </div>
      </div>




    </>
  );
}
