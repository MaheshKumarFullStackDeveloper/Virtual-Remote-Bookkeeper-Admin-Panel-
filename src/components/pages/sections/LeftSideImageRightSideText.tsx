"use client";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { Input } from "@/components/ui/input"

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useAddUpadateSectionMutation } from "@/app/store/api";
import { LoaderIcon } from "react-hot-toast";
import Label from "@/components/form/Label";
import { useForm } from "react-hook-form";
import { AlertProps, Sections } from "@/lib/types/types";
import Alert from "@/components/ui/alert/Alert";
import { Textarea } from "@/components/ui/textarea";

type AddProps = {
  selectedSection: string;
  sectionValue: Sections;
  updateSections: (updateSections: Sections[]) => void;
  updateSelectedSection: () => void;
};

type LeftSideImageRightSideText = {
  heading: string;
  description: string;
  image: string;
  order: string;
};


export default function LeftSideImageRightSideText({ selectedSection, sectionValue, updateSections, updateSelectedSection }: AddProps): React.JSX.Element {
  const [addUpadateSection] = useAddUpadateSectionMutation();
  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    setValue,
    formState: { errors: UpdateError },
  } = useForm<LeftSideImageRightSideText>({});

  useEffect(() => {
    console.log("selectedSection updated:", selectedSection);
    console.log("page--- updated:", sectionValue);

    setValue("order", sectionValue.order)

    if (sectionValue.content !== "") {
      const Details = JSON.parse(sectionValue.content);
      setValue("heading", Details.heading)
      setValue("description", Details.description)
      setValue("image", Details.image)
    } else {
      setValue("heading", "")
      setValue("description", "")
      setValue("image", "")
    }
    openModal();
  }, [selectedSection, openModal, sectionValue, setValue]); // Runs whenever selectedSection changes

  const onSubmitUpdate = async (data: LeftSideImageRightSideText) => {
    setupdateLoading(true);

    try {
      const { heading, description, image, order } = data;

      const newContent = { "heading": heading, "description": description, "image": image.trim().replace(/\s+/g, '') }
      console.log("page updated:", sectionValue.page);
      const result = await addUpadateSection({ content: JSON.stringify(newContent), title: "LeftSideImageRightSideText", pageId: sectionValue.page, order, sectionId: sectionValue._id }).unwrap();

      if (result.success) {
        updateSections(result.data)
        setAlerts([
          {
            variant: "success",
            title: "Add Section successfully",
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
  const handleCloseModal = () => {
    updateSelectedSection();
    closeModal(); // Close the modal
  };


  return (<>
    <Modal isOpen={isOpen} onClose={handleCloseModal} className="max-w-[700px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">

          <form
            onChange={handleFormChange} onSubmit={handleUpdateSubmit(onSubmitUpdate)} className="flex flex-col">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Left Side Image Right Side Text
            </h4>
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
                    <Label>Order</Label>


                    <Input
                      {...registerUpdate("order", {
                        required: "Section order is required",
                      })}
                      placeholder="Order"
                      type="number"

                      className="pl-10"
                    />


                    {UpdateError.order && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.order.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <Label>Heading</Label>


                    <Input
                      {...registerUpdate("heading", {
                        required: "Section heading is required",
                      })}
                      placeholder="Heading"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.heading && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.heading.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Label>Image</Label>
                    <Input
                      {...registerUpdate("image", {
                        required: "Section image is required",
                      })}
                      placeholder="Image"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.image && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.image.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Label>Description</Label>

                    <Textarea
                      {...registerUpdate("description", {
                        required: "Description is required",
                      })}
                      placeholder="Description"
                      className="pl-10"
                    />

                    {UpdateError.description && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.description.message}
                      </p>
                    )}


                  </div>


                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={handleCloseModal}>
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