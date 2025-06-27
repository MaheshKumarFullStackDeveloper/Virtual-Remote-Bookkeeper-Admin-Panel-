"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import { EditIcon, TrashIcon } from "lucide-react";
import { useAddUpadateCategoryMutation, useDeleteCategoryByIdMutation, useGetCategorysQuery } from "@/app/store/api";
import Pagination from "../tables/Pagination";
import toast, { LoaderIcon } from "react-hot-toast";
import { AlertProps, Category } from "@/lib/types/types";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Alert from "../ui/alert/Alert";
import Label from "../form/Label";
import { Input } from "../ui/input";
import Button from "../ui/button/Button";


export default function CategoryList() {

  const [currentPagen, setCurrentPagen] = useState<number>(1)
  const [categoris, setCategoris] = useState<Category[]>([])
  const [toFrom, setToFrom] = useState<string>("")
  const [totalPage, setTotalPage] = useState<number>(1)
  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);
  const [AddUpadateCategory] = useAddUpadateCategoryMutation()
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);
  const limit = 100;

  const [deleteCategoryById] = useDeleteCategoryByIdMutation()
  // This stays at the top level (not inside useEffect)
  const { data: apiResponse = {} } = useGetCategorysQuery({ page: currentPagen, limit: limit })

  // Then useEffect watches the data
  useEffect(() => {
    if (apiResponse.success) {
      setCategoris(apiResponse.data.categoryList);
      setTotalPage(apiResponse.data.totalCategory);
      const from = (currentPagen - 1) * limit + 1;
      const topge = Math.min(currentPagen * limit, apiResponse.data.totalCategoryCount);
      setToFrom(`Total Category : ${apiResponse.data.totalCategoryCount}, show ${from} to ${topge}`);

    }
  }, [apiResponse, currentPagen, toFrom, limit]);



  const handlePageChange = (page: number) => {

    setCurrentPagen(page); // this should re-trigger the query due to updated page prop
  };

  const handleDeleteCategory = async (categoryId: string) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this Category ?");
    if (!isConfirmed) return;

    try {

      const result = await deleteCategoryById(categoryId).unwrap();

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
  } = useForm<Category>({});

  const onSubmitUpdate = async (data: Category) => {
    setupdateLoading(true);

    try {
      const { title, slug, status, metaTitle, metaDescription, categoryId } = data;
      const result = await AddUpadateCategory({ title, slug, status, metaTitle, metaDescription, categoryId }).unwrap();
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

    const pagedata = categoris[index];
    setValue('categoryId', pagedata._id);
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
            {categoris && categoris.length > 0 ? (<>
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
                  {categoris.map((category, index) => (
                    <TableRow key={index}>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {category.title}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {category.slug}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={
                            category.status === "active"
                              ? "success"
                              : category.status === "pending"
                                ? "warning"
                                : "error"
                          }
                        >
                          {category.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <EditIcon onClick={() => handleEditForm(index)} className=" h-8 w-8  p-2  cursor-pointer text-blue-500 float-left gap-1 rounded-full font-medium" /> <TrashIcon onClick={() => handleDeleteCategory(category._id)} className=" h-8 w-8  p-2 cursor-pointer text-red-500 float-left gap-1 rounded-full font-medium" />
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

            </>) : (<h4>No Added Category</h4>)}
          </div>
        </div>
      </div>


      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Category
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
                        {...registerUpdate("categoryId")}
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
