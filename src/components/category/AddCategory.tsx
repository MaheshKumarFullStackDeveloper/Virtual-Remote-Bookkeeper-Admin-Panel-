"use client";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input"

import React, { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useAddUpadateCategoryMutation } from "@/app/store/api";
import { LoaderIcon } from "react-hot-toast";
import Label from "@/components/form/Label";
import { useForm } from "react-hook-form";
import { AlertProps, Category } from "@/lib/types/types";
import Alert from "@/components/ui/alert/Alert";



export default function AddCategory() {

  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);
  const [AddUpadateCategory] = useAddUpadateCategoryMutation()
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,

    formState: { errors: UpdateError },
  } = useForm<Category>({});

  const onSubmitUpdate = async (data: Category) => {
    setupdateLoading(true);

    try {
      const { title, slug, status, metaTitle, metaDescription } = data;
      const result = await AddUpadateCategory({ title, slug: slug.trim().replace(/\s+/g, ''), status, metaTitle, metaDescription }).unwrap();
      console.log("this is Update result", result)
      if (result.success) {

        setAlerts([
          {
            variant: "success",
            title: "Add Category successfully",
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
        Add New Category
      </Button>

    </div>

    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Add New Category
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
                        required: "Category title is required",
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
                        required: "Category Slug is required",
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
    </Modal>
  </>)

}