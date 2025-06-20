import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddPage from "@/components/pages/AddPage";
import PagesList from "@/components/pages/PagesList";
import { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
  title: " All Pages",
  description: "All Pages list ",
};

export default function allPages() {
    
  return (
    <>
    <div>
      <PageBreadcrumb pageTitle="ALL Page" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
         <AddPage />
         <PagesList />
      </div>
    </div>
    


   
    </>
  );
}
