import EditBlog from "@/components/blogs/EditBlog";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: " Single Blog Page",
  description: "Single Blog Page  ",
};

export default function allPages() {


  return (
    <>
      <div>
        <PageBreadcrumb pageTitle="Single Blog" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <EditBlog />
        </div>
      </div>




    </>
  );
}
