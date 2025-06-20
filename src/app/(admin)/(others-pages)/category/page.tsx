import AddCategory from "@/components/category/AddCategory";
import CategoryList from "@/components/category/CategoryList";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
  title: " All Categories",
  description: "All Categories list ",
};

export default function allCategories() {

  return (
    <>
      <div>
        <PageBreadcrumb pageTitle="All Categories" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <AddCategory />
          <CategoryList />
        </div>
      </div>




    </>
  );
}
