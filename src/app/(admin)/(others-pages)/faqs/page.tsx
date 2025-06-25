
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddFaq from "@/components/faqs/AddFaq";
import FaqsList from "@/components/faqs/FaqsList";

import { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
  title: " All FAQS",
  description: "All FAQS list ",
};

export default function allFaqs() {

  return (
    <>
      <div>
        <PageBreadcrumb pageTitle="ALL FAQS" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <AddFaq />
          <FaqsList />
        </div>
      </div>

    </>
  );
}
