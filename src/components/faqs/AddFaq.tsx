"use client";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input"

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useAddUpadatefaqMutation, useGetFaqcategorysQuery, } from "@/app/store/api";
import { LoaderIcon } from "react-hot-toast";
import Label from "@/components/form/Label";
import { Controller, useForm } from "react-hook-form";
import { AlertProps, Faq, Category } from "@/lib/types/types";
import Alert from "@/components/ui/alert/Alert";
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../form/input/select";

import Select from "react-select";
import { Textarea } from "../ui/textarea";



export default function AddFaq() {
  const [categories, setCategories] = useState<Category[]>([])
  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);
  const [AddUpadatefaq] = useAddUpadatefaqMutation()
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);
  const { data: apiResponse = {} } = useGetFaqcategorysQuery({ page: 1, limit: 100 })
  useEffect(() => {
    if (apiResponse.success) {
      setCategories(apiResponse.data.categoryList);
      console.log("load cat", categories);

    }
  }, [apiResponse, categories]);

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    control,
    formState: { errors: UpdateError },
  } = useForm<Faq>({});

  const onSubmitUpdate = async (data: Faq) => {
    setupdateLoading(true);

    try {
      const { title, content, categories } = data;
      const result = await AddUpadatefaq({ title, categories, content }).unwrap();
      console.log("this is Update result", result)
      if (result.success) {

        setAlerts([
          {
            variant: "success",
            title: "Add Faq successfully",
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

  return (<>
    <div className="mx-auto w-full py-2 text-end">
      <Button onClick={openModal} size="mm" className="" variant="primary" startIcon={<Plus />}>
        Add New Faq
      </Button>

    </div>

    <Modal isOpen={isOpen} onClose={closeModal} className=" relative max-w-[700px] m-4 overflow-visible z-[9998]">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Add New Faq
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
                    <Label>Content</Label>
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
  </>)

}