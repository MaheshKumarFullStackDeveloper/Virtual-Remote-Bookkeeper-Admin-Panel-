import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddWidget from "@/components/widgets/AddWidget";
import WidgetList from "@/components/widgets/WidgetList";
import { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
  title: " All Widgets",
  description: "All Widgets list ",
};

export default function allWidgets() {

  return (
    <>
      <div>
        <PageBreadcrumb pageTitle="ALL Widgets" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <AddWidget />
          <WidgetList />
        </div>
      </div>




    </>
  );
}
