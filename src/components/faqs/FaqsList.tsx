"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";


import { EditIcon, TrashIcon } from "lucide-react";
import { useAddUpadatefaqMutation, useDeleteFaqByIdMutation, useGetFaqcategorysQuery, useGetFAQsQuery } from "@/app/store/api";
import Pagination from "../tables/Pagination";
import toast, { LoaderIcon } from "react-hot-toast";
import { AlertProps, Category, Faq } from "@/lib/types/types";
import { Controller, useForm } from "react-hook-form";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Alert from "../ui/alert/Alert";
import Label from "../form/Label";
import { Input } from "../ui/input";
import Button from "../ui/button/Button";
import Select from "react-select";
import { Textarea } from "../ui/textarea";




export default function FaqsList() {

  const [categories, setCategories] = useState<Category[]>([])
  const [currentFaqn, setCurrentFaqn] = useState<number>(1)
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [toFrom, setToFrom] = useState<string>("")
  const [totalFaq, setTotalFaq] = useState<number>(1)
  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);
  const [AddUpadatefaq] = useAddUpadatefaqMutation()
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);
  const limit = 10;

  const { data: apiCateResponse = {} } = useGetFaqcategorysQuery({ page: 1, limit: 100 })
  const [deleteFaqById] = useDeleteFaqByIdMutation()

  const [searchTerm, setSearchTerm] = useState<string>("");
  const queryParams = useMemo(() => ({
    page: currentFaqn,
    limit,
    search: searchTerm
  }), [currentFaqn, limit, searchTerm]);

  const { data: apiResponse = {}, isFetching, refetch } = useGetFAQsQuery(queryParams);

  useEffect(() => {
    if (apiResponse?.success) {
      const { faqsList, totalFaqs, totalFaqsCount } = apiResponse.data;
      setFaqs(faqsList);
      setTotalFaq(totalFaqs);

      const from = (currentFaqn - 1) * limit + 1;
      const to = Math.min(currentFaqn * limit, totalFaqsCount);

      setToFrom(`Total Faqs : ${totalFaqsCount}, show ${from} to ${to}`);
    }
  }, [apiResponse, currentFaqn]);


  useEffect(() => {
    if (apiCateResponse.success) {
      setCategories(apiCateResponse.data.categoryList);
      console.log("load cat", categories);

    }
  }, [apiCateResponse, categories]);




  const handleFaqChange = (page: number) => {
    setCurrentFaqn(page);
    refetch();
  };

  const handleDeleteFaq = async (faqId: string) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this FAQ ?");
    if (!isConfirmed) return;

    try {

      const result = await deleteFaqById(faqId).unwrap();

      if (result.success) {
        toast.success("Delete FAQ successfully", { position: 'bottom-center' })
        console.log("This is delete result", result)
      }

    } catch (error) {
      console.log("Error on login", error)
      toast.error("FAQ not Deleted ", { position: 'bottom-center' });
    } finally {

    }
  }

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    setValue,
    control,
    formState: { errors: UpdateError },
  } = useForm<Faq>({});

  const onSubmitUpdate = async (data: Faq) => {
    setupdateLoading(true);

    try {
      const { title, content, categories, faqId } = data;
      const result = await AddUpadatefaq({ title, content, categories, faqId }).unwrap();
      console.log("this is Update result", result)
      if (result.success) {

        setAlerts([
          {
            variant: "success",
            title: "Update Faq successfully",
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

    const faqdata = faqs[index];
    setValue('faqId', faqdata._id);
    setValue('title', faqdata.title);
    setValue('content', faqdata.content);
    if (faqdata.categories?.length) {
      const categories: Category[] = faqdata.categories || [];
      setValue("categories", categories);
    } else {
      setValue("categories", []);
    }

    openModal();
  };
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
                  setCurrentFaqn(1); // reset to first page on new search
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


              <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                  {faqs && faqs.length > 0 ? (<>
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
                            Action
                          </TableCell>
                        </TableRow>
                      </TableHeader>

                      {/* Table Body */}
                      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {faqs.map((faq, index) => (
                          <TableRow key={faq._id}>

                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {faq.title}
                            </TableCell>


                            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                              <EditIcon onClick={() => handleEditForm(index)} className=" h-8 w-8  p-2 text-blue-500 float-left gap-1 rounded-full font-medium" /> <TrashIcon onClick={() => handleDeleteFaq(faq._id)} className=" h-8 w-8  p-2  text-red-500 float-left gap-1 rounded-full font-medium" />

                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="px-6 py-5 flex flex-row w-[100%] relative">
                      <div className="basis-1/2">
                        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{toFrom}</h3> </div>
                      <div className="basis-1/2 text-right"><Pagination currentPage={currentFaqn} totalPages={totalFaq} onPageChange={handleFaqChange} /></div>
                    </div>
                  </>) : (<><h3> Faqs not found</h3></>)}

                </div>
              </div>
            </>)}
          </div>
        </div>
      </div>


      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update FAQ
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
                        {...registerUpdate("faqId")}
                        type="hidden"

                      />

                      <Input
                        {...registerUpdate("title", {
                          required: "Faq title is required",
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
                      <Label>HTML</Label>
                      <Textarea
                        {...registerUpdate("content", {
                          required: "Content is required",
                        })}
                        placeholder="Content"
                        className="pl-10"
                      />

                      {UpdateError.content && (
                        <p className="text-red-700 text-sm">
                          {UpdateError.content.message}
                        </p>
                      )}
                    </div>




                    <div className="col-span-1">
                      <Label>Category</Label>

                      <Controller
                        name="categories"
                        control={control}
                        rules={{ required: "Categories are required" }}
                        render={({ field }) => (
                          <Select
                            isMulti
                            options={categories.map((cat) => ({
                              value: cat._id,
                              label: cat.title,
                            }))}
                            value={categories
                              .filter((cat) => (field.value as unknown as string[])?.includes(cat._id))
                              .map((cat) => ({ value: cat._id, label: cat.title }))}

                            onChange={(selected) =>
                              field.onChange(selected.map((s) => s.value))
                            }
                          />
                        )}
                      />




                      {UpdateError.categories && (
                        <p className="text-red-700 text-sm">
                          {UpdateError.categories.message}
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
      </Modal>
    </>
  );
}
