
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddMenu from "@/components/navigations/AddMenu";
import MenuList from "@/components/navigations/MenusList";

import { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
  title: " All Navigation",
  description: "All Navigation list ",
};

export default function allNavigations() {

  return (
    <>
      <div>
        <PageBreadcrumb pageTitle="ALL Navigation" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <AddMenu />
          <MenuList />
        </div>
      </div>

    </>
  );
}
