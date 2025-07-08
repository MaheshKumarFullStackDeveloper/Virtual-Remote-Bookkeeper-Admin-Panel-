"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { TrashIcon } from "lucide-react";
import { useDeleteUserByIdMutation, useGetUSERSQuery } from "@/app/store/api";
import Pagination from "../tables/Pagination";
import toast from "react-hot-toast";
import { UserData } from "@/lib/types/types";




export default function UsersList() {

  const [currentPagen, setCurrentPagen] = useState<number>(1)
  const [users, setUsers] = useState<UserData[]>([])
  const [toFrom, setToFrom] = useState<string>("")
  const [totalUser, setTotalUser] = useState<number>(1)
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const queryParams = useMemo(() => ({
    page: currentPagen,
    limit,
    search: searchTerm
  }), [currentPagen, limit, searchTerm]);

  const { data: apiResponse = {}, isFetching, refetch } = useGetUSERSQuery(queryParams);

  useEffect(() => {
    if (apiResponse?.success) {
      const { usersList, totalUsers, totalUsersCount } = apiResponse.data;
      setUsers(usersList);
      setTotalUser(totalUsers);

      const from = (currentPagen - 1) * limit + 1;
      const to = Math.min(currentPagen * limit, totalUsersCount);

      setToFrom(`Total Users : ${totalUsersCount}, show ${from} to ${to}`);
    }
  }, [apiResponse, currentPagen]);

  const [deleteUserById] = useDeleteUserByIdMutation()


  const handleUserChange = (page: number) => {
    setCurrentPagen(page);
    refetch();
  };

  const handleDeleteUser = async (pageId: string) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) return;

    try {

      const result = await deleteUserById(pageId).unwrap();

      if (result.success) {
        toast.success("Delete user successfully", { position: 'bottom-center' })
        console.log("This is delete result", result)
      }

    } catch (error) {
      console.log("Error on login", error)
      toast.error("user not Deleted ", { position: 'bottom-center' });
    } finally {

    }
  }





  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">

        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">

            {/*--------------- Search  form ---------------- */}
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-[1102px]">
                <div className="flex float-right items-center justify-between px-4 py-3">
                  <input
                    type="text"
                    placeholder="Search by title or content..."
                    className="w-full max-w-md px-4 py-2 border rounded-md focus:outline-none focus:ring dark:bg-transparent dark:border-white/20"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPagen(1); // reset to first page on new search
                    }}
                  />
                </div>
              </div>
            </div>
            {/*--------------- Search  form ---------------- */}


            <div className="max-w-full overflow-x-auto">
              <div className="min-w-[1102px]">
                {isFetching ? (
                  <div className="text-center py-6">
                    <span className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
                    <p className="mt-2 text-sm text-gray-500">Loading faqs...</p>
                  </div>
                ) : (<>
                  {users && users.length > 0 ? (<>
                    <Table>
                      {/* Table Header */}
                      <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>

                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Name
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Email
                          </TableCell>


                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHeader>

                      {/* Table Body */}
                      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {users.map((user, index) => (
                          <TableRow key={index}>

                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {user.name}
                            </TableCell>

                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {user.email}
                            </TableCell>


                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                              <TrashIcon onClick={() => handleDeleteUser(user._id)} className=" h-8 w-8  p-2  text-red-500 float-left gap-1 rounded-full font-medium" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="px-6 py-5 flex flex-row w-[100%] relative">
                      <div className="basis-1/2">
                        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{toFrom}</h3> </div>
                      <div className="basis-1/2 text-right"><Pagination currentPage={currentPagen} totalPages={totalUser} onPageChange={handleUserChange} /></div>
                    </div>
                  </>) : (<><h3> Faqs not found</h3></>)}
                </>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
