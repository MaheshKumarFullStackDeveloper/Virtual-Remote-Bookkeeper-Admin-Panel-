
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ImageUpload from "@/components/form/ImageUpload";
import ThreeColumnImageGrid from "@/components/ui/images/ThreeColumnImageGrid";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: " Images",
  description: 
    " Images "
};
export default function Images() {

  return (
    <div>
        
      <PageBreadcrumb pageTitle="Images" />
      <div className="space-y-5 sm:space-y-6">
       
        <ComponentCard title="Uploade Images">
         <ImageUpload/>
        </ComponentCard>
        <ComponentCard title="Image in 3 Grid">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </div>
  );
}
