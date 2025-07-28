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
import { BuildingIcon, EditIcon, TrashIcon } from "lucide-react";
import { useAddUpadatePageMutation, useDeletePageByIdMutation, useGetPagesQuery } from "@/app/store/api";
import Pagination from "../tables/Pagination";
import toast, { LoaderIcon } from "react-hot-toast";
import { AlertProps, Page } from "@/lib/types/types";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Alert from "../ui/alert/Alert";
import Label from "../form/Label";
import { Input } from "../ui/input";
import Button from "../ui/button/Button";
import Link from "next/link";




export default function PagesList() {

  const [currentPagen, setCurrentPagen] = useState<number>(1)
  const [pages, setPages] = useState<Page[]>([])
  const [toFrom, setToFrom] = useState<string>("")
  const [totalPage, setTotalPage] = useState<number>(1)
  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);
  const [AddUpadatePage] = useAddUpadatePageMutation()
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const queryParams = useMemo(() => ({
    page: currentPagen,
    limit,
    search: searchTerm
  }), [currentPagen, limit, searchTerm]);

  const { data: apiResponse = {}, isFetching, refetch } = useGetPagesQuery(queryParams);

  useEffect(() => {
    if (apiResponse?.success) {
      const { pagesList, totalPages, totalPagesCount } = apiResponse.data;
      setPages(pagesList);
      setTotalPage(totalPages);

      const from = (currentPagen - 1) * limit + 1;
      const to = Math.min(currentPagen * limit, totalPagesCount);

      setToFrom(`Total Pages : ${totalPagesCount}, show ${from} to ${to}`);
    }
  }, [apiResponse, currentPagen]);

  const [deletePageById] = useDeletePageByIdMutation()


  const handlePageChange = (page: number) => {
    setCurrentPagen(page);
    refetch();
  };

  const handleDeletePage = async (pageId: string) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this page?");
    if (!isConfirmed) return;

    try {

      const result = await deletePageById(pageId).unwrap();

      if (result.success) {
        toast.success("Delete page successfully", { position: 'bottom-center' })
        console.log("This is delete result", result)
      }

    } catch (error) {
      console.log("Error on login", error)
      toast.error("page not Deleted ", { position: 'bottom-center' });
    } finally {

    }
  }

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    setValue,
    formState: { errors: UpdateError },
  } = useForm<Page>({});

  const onSubmitUpdate = async (data: Page) => {
    setupdateLoading(true);

    try {
      const { title, slug, status, metaTitle, metaDescription, pageId } = data;
      const result = await AddUpadatePage({ title, slug: slug.trim().replace(/\s+/g, ''), status, metaTitle, metaDescription, pageId }).unwrap();
      console.log("this is Update result", result)
      if (result.success) {

        setAlerts([
          {
            variant: "success",
            title: "Update Page successfully",
            message: "",
            showLink: false,
          },
        ]);

      } else {

        setAlerts([
          {
            variant: "success",
            title: result.message,
            message: "",
            showLink: false,
          },
        ]);

      }

    } catch (error: unknown) {
      console.log("Error on Update", error);
      if (error && typeof error === "object" && "data" in error) {
        const errorData = (error as { data?: { message?: string } }).data;
        setAlerts([
          {
            variant: "error",
            title: "Error!",
            message: errorData?.message || "An unexpected error occurred.",
            showLink: false,
          },
        ]);
      } else {
        setAlerts([
          {
            variant: "error",
            title: "Unknown Error!",
            message: "An unexpected error occurred.",
            showLink: false,
          },
        ]);
      }



    } finally {
      setupdateLoading(false);

    }
  }
  const handleFormChange = () => {
    if (alerts) {
      setAlerts(null);
    }
  };



  const handleEditForm = (index: number) => {

    const pagedata = pages[index];
    setValue('pageId', pagedata._id);
    setValue('title', pagedata.title);
    setValue('slug', pagedata.slug);
    setValue('metaTitle', pagedata.metaTitle);
    setValue('status', pagedata.status);
    setValue('metaDescription', pagedata.metaDescription);
    openModal();
  };
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
                  {pages && pages.length > 0 ? (<>
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
                        {pages.map((page, index) => (
                          <TableRow key={page._id}>

                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {page.title}
                            </TableCell>

                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {page.slug}
                            </TableCell>

                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <Badge
                                size="sm"
                                color={
                                  page.status === "active"
                                    ? "success"
                                    : page.status === "pending"
                                      ? "warning"
                                      : "error"
                                }
                              >
                                {page.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                              <EditIcon onClick={() => handleEditForm(index)} className=" h-8 w-8  p-2 text-blue-500 float-left gap-1 rounded-full font-medium" /> <TrashIcon onClick={() => handleDeletePage(page._id)} className=" h-8 w-8  p-2  text-red-500 float-left gap-1 rounded-full font-medium" />
                              <Link href={`/pages/${page.slug}`} ><BuildingIcon className=" h-8 w-8  p-2  text-green-500 float-left gap-1 rounded-full font-medium" /></Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="px-6 py-5 flex flex-row w-[100%] relative">
                      <div className="basis-1/2">
                        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{toFrom}</h3> </div>
                      <div className="basis-1/2 text-right"><Pagination currentPage={currentPagen} totalPages={totalPage} onPageChange={handlePageChange} /></div>
                    </div>
                  </>) : (<><h3> Faqs not found</h3></>)}
                </>)}
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Page
            </h4>
            <form onChange={handleFormChange} onSubmit={handleUpdateSubmit(onSubmitUpdate)} className="flex flex-col">
              <div className="custom-scrollbar h-[400px] overflow-y-auto px-2 pb-3">

                <div className="mt-7">
                  {alerts &&
                    alerts.map((alert, index) => (
                      <Alert
                        key={index}
                        variant={alert.variant}
                        title={alert.title}
                        message={alert.message}
                        showLink={alert.showLink}
                      />
                    ))}

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 ">



                    <div className="col-span-1">
                      <Label>Title</Label>
                      <Input
                        {...registerUpdate("pageId")}
                        type="hidden"

                      />

                      <Input
                        {...registerUpdate("title", {
                          required: "Page title is required",
                        })}
                        placeholder="Title"
                        type="text"

                        className="pl-10"
                      />


                      {UpdateError.title && (
                        <p className="text-red-700 text-sm">
                          {UpdateError.title.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-1">
                      <Label>Slug</Label>
                      <Input
                        {...registerUpdate("slug", {
                          required: "Page Slug is required",
                        })}
                        placeholder="Slug"
                        type="text"

                        className="pl-10"
                      />


                      {UpdateError.slug && (
                        <p className="text-red-700 text-sm">
                          {UpdateError.slug.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-1">
                      <Label>Meta Title</Label>
                      <Input
                        {...registerUpdate("metaTitle", {
                          required: "Meta Title is required",
                        })}
                        placeholder="Meta Title"
                        type="text"

                        className="pl-10"
                      />


                      {UpdateError.metaTitle && (
                        <p className="text-red-700 text-sm">
                          {UpdateError.metaTitle.message}
                        </p>
                      )}
                    </div>



                    <div className="col-span-1">
                      <Label>Meta Description</Label>
                      <Input
                        {...registerUpdate("metaDescription", {
                          required: "Meta Description is required",
                        })}
                        placeholder="Meta Description"
                        type="text"

                        className="pl-10"
                      />


                      {UpdateError.metaDescription && (
                        <p className="text-red-700 text-sm">
                          {UpdateError.metaDescription.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-1">
                      <Label>Status</Label>
                      <select
                        {...registerUpdate("status", {
                          required: "Status is required",
                        })}
                        className="pl-10"
                      >
                        <option value="">Select status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                      </select>




                      {UpdateError.status && (
                        <p className="text-red-700 text-sm">
                          {UpdateError.status.message}
                        </p>
                      )}
                    </div>

                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeModal}>
                  Close
                </Button>
                <Button size="sm" variant="outline" type="submit">
                  {updateLoading ? (
                    <>
                      {" "}
                      <LoaderIcon className="animate-spin mr-2 h-[20px] w-[20px]" />{" "}
                    </>
                  ) : (
                    <>Update</>
                  )}
                </Button>

              </div>
            </form>
          </div>

        </div>
      </Modal></>
  );
}
