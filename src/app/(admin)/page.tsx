import type { Metadata } from "next";
import React from "react";
import PagesList from "@/components/pages/PagesList";
import BlogsList from "@/components/blogs/BlogsList";

export const metadata: Metadata = {
  title:
    "Dashboard ",
  description: "Dashboard ",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">

      <div className="col-span-12">
        <h4>Blogs List</h4>
        <BlogsList />
      </div>
      <div className="col-span-12 ">
        <h4>Pages List</h4>
        <PagesList />
      </div>



    </div>
  );
}
