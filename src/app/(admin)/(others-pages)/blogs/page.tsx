import AddBlog from "@/components/blogs/AddBlog";
import BlogsList from "@/components/blogs/BlogsList";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";;
import { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
  title: " All Blogs",
  description: "All Blogs list ",
};

export default function allBlogs() {

  return (
    <>
      <div>
        <PageBreadcrumb pageTitle="ALL Page" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <AddBlog />
          <BlogsList />
        </div>
      </div>

    </>
  );
}
