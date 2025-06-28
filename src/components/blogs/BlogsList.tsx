"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import { EditIcon, TrashIcon } from "lucide-react";
import { useDeleteBlogByIdMutation, useGetBlogsQuery } from "@/app/store/api";
import Pagination from "../tables/Pagination";
import toast from "react-hot-toast";
import { Blog } from "@/lib/types/types";
import Link from "next/link";




export default function BlogsList() {

  const [currentPagen, setCurrentBlogn] = useState<number>(1)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [toFrom, setToFrom] = useState<string>("")
  const [totalBlog, setTotalBlog] = useState<number>(1)

  const limit = 10;
  const [searchTerm, setSearchTerm] = useState<string>("");


  const queryParams = useMemo(() => ({
    page: currentPagen,
    limit,
    search: searchTerm
  }), [currentPagen, limit, searchTerm]);

  const { data: apiResponse = {}, isFetching, refetch } = useGetBlogsQuery(queryParams);
  const [deleteBlogById] = useDeleteBlogByIdMutation()

  useEffect(() => {
    if (apiResponse?.success) {
      const { blogsList, totalBlogs, totalBlogsCount } = apiResponse.data;
      setBlogs(blogsList);
      setTotalBlog(totalBlogs);

      const from = (currentPagen - 1) * limit + 1;
      const to = Math.min(currentPagen * limit, totalBlogsCount);

      setToFrom(`Total Blogs : ${totalBlogsCount}, show ${from} to ${to}`);
    }
  }, [apiResponse, currentPagen]);


  const handleBlogChange = (page: number) => {
    setCurrentBlogn(page);
    refetch(); // optional, in case caching is aggressive

  };

  const handleDeleteBlog = async (blogId: string) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this page?");
    if (!isConfirmed) return;

    try {

      const result = await deleteBlogById(blogId).unwrap();

      if (result.success) {
        toast.success("Delete blog successfully", { position: 'bottom-center' })
        console.log("This is delete result", result)
      }

    } catch (error) {
      console.log("Error on login", error)
      toast.error("blog not Delete ", { position: 'bottom-center' });
    } finally {

    }
  }


  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">

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
                  setCurrentBlogn(1); // reset to first page on new search
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
                <p className="mt-2 text-sm text-gray-500">Loading blogs...</p>
              </div>
            ) : (<>

              {blogs && blogs.length > 0 ? (<>
                <Table>
                  {/* Table Header */}

                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Title
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Slug
                      </TableCell>

                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      >
                        Status
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
                    {blogs.map((blog, index) => (
                      <TableRow key={index}>

                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {blog.title}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {blog.slug}
                        </TableCell>

                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <Badge
                            size="sm"
                            color={
                              blog.status === "active"
                                ? "success"
                                : blog.status === "pending"
                                  ? "warning"
                                  : "error"
                            }
                          >
                            {blog.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                          <TrashIcon onClick={() => handleDeleteBlog(blog._id)} className=" h-8 w-8  p-2  text-red-500 float-left gap-1 rounded-full font-medium" />
                          <Link href={`/blogs/${blog.slug}`} ><EditIcon className=" h-8 w-8  p-2  text-green-500 float-left gap-1 rounded-full font-medium" /></Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="px-6 py-5 flex flex-row w-[100%] relative">
                  <div className="basis-1/2">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{toFrom}</h3> </div>
                  <div className="basis-1/2 text-right"><Pagination currentPage={currentPagen} totalPages={totalBlog} onPageChange={handleBlogChange} /></div>
                </div>

              </>) : (<><h3> Blog not found</h3></>)}
            </>)}
          </div>
        </div>
      </div>



    </>
  );
}
