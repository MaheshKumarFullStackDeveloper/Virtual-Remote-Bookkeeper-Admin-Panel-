

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddFaqcategory from "@/components/faqcategory/AddFaqcategory";
import FAQCategoryList from "@/components/faqcategory/FAQCategoryList";
import { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
  title: " All FAQ Categories",
  description: "All FAQ Categories list ",
};

export default function allCategories() {

  return (
    <>
      <div>
        <PageBreadcrumb pageTitle="All FAQ Categories" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <AddFaqcategory />
          <FAQCategoryList />
        </div>
      </div>




    </>
  );
}
