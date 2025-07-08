import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddUser from "@/components/users/AddUser";
import UsersList from "@/components/users/UsersList";

import { Metadata } from "next";
import React from "react";



export const metadata: Metadata = {
  title: " All Users",
  description: "All Users list ",
};

export default function allUsers() {

  return (
    <>
      <div>
        <PageBreadcrumb pageTitle="ALL User" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <AddUser />
          <UsersList />
        </div>
      </div>




    </>
  );
}
