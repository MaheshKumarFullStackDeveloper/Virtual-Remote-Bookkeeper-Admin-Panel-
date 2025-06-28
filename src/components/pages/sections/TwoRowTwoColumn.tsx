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

type TwoRowTwoColumn = {
  mainHeading: string;
  heading1: string;
  buttonText1: string;
  buttonUrl1: string;
  description1: string;
  heading2: string;
  buttonText2: string;
  buttonUrl2: string;
  description2: string;
  heading3: string;
  buttonText3: string;
  buttonUrl3: string;
  description3: string;
  heading4: string;
  buttonText4: string;
  buttonUrl4: string;
  description4: string;
  order: string;
};


export default function TwoRowTwoColumn({ selectedSection, sectionValue, updateSections, updateSelectedSection }: AddProps): React.JSX.Element {
  const [addUpadateSection] = useAddUpadateSectionMutation();
  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    setValue,
    formState: { errors: UpdateError },
  } = useForm<TwoRowTwoColumn>({});

  useEffect(() => {
    console.log("selectedSection updated:", selectedSection);
    console.log("page--- updated:", sectionValue);

    setValue("order", sectionValue.order)

    if (sectionValue.content !== "") {
      const Details = JSON.parse(sectionValue.content);
      setValue("mainHeading", Details.mainHeading)
      setValue("heading1", Details.heading1)
      setValue("buttonText1", Details.buttonText1)
      setValue("buttonUrl1", Details.buttonUrl1)
      setValue("description1", Details.description1)
      setValue("heading2", Details.heading2)
      setValue("buttonText2", Details.buttonText2)
      setValue("buttonUrl2", Details.buttonUrl2)
      setValue("description2", Details.description2)
      setValue("heading3", Details.heading3)
      setValue("buttonText3", Details.buttonText3)
      setValue("buttonUrl3", Details.buttonUrl3)
      setValue("description3", Details.description3)
      setValue("heading4", Details.heading4)
      setValue("buttonText4", Details.buttonText4)
      setValue("buttonUrl4", Details.buttonUrl4)
      setValue("description4", Details.description4)
    } else {
      setValue("mainHeading", "")
      setValue("heading1", "")
      setValue("buttonText1", "")
      setValue("buttonUrl1", "")
      setValue("description1", "")
      setValue("heading2", "")
      setValue("buttonText2", "")
      setValue("buttonUrl2", "")
      setValue("description2", "")
      setValue("heading3", "")
      setValue("buttonText3", "")
      setValue("buttonUrl3", "")
      setValue("description3", "")
      setValue("heading4", "")
      setValue("buttonText4", "")
      setValue("buttonUrl4", "")
      setValue("description4", "")
    }
    openModal();
  }, [selectedSection, openModal, sectionValue, setValue]); // Runs whenever selectedSection changes

  const onSubmitUpdate = async (data: TwoRowTwoColumn) => {
    setupdateLoading(true);

    try {
      const { mainHeading, heading1, buttonUrl1, buttonText1, description1, heading2, buttonUrl2, buttonText2, description2, heading3, buttonUrl3, buttonText3, description3, heading4, buttonUrl4, buttonText4, description4, order } = data;

      const newContent = { "mainHeading": mainHeading, "heading1": heading1, "buttonUrl1": buttonUrl1, "buttonText1": buttonText1, "description1": description1, "heading2": heading2, "buttonUrl2": buttonUrl2, "buttonText2": buttonText2, "description2": description2, "heading3": heading3, "buttonUrl3": buttonUrl3, "buttonText3": buttonText3, "description3": description3, "heading4": heading4, "buttonUrl4": buttonUrl4, "buttonText4": buttonText4, "description4": description4 }
      console.log("page updated:", sectionValue.page);
      const result = await addUpadateSection({ content: JSON.stringify(newContent), title: "TwoRowTwoColumn", pageId: sectionValue.page, order, sectionId: sectionValue._id }).unwrap();

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
              Update One Row Three Column
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
                    <Label>Main Heading</Label>


                    <Input
                      {...registerUpdate("mainHeading", {
                        required: "Section heading is required",
                      })}
                      placeholder="Heading"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.mainHeading && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.mainHeading.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <Label>Heading 1</Label>


                    <Input
                      {...registerUpdate("heading1", {
                        required: "Section heading is required",
                      })}
                      placeholder="Heading"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.heading1 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.heading1.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Label>Button text 1</Label>


                    <Input
                      {...registerUpdate("buttonText1", {
                        required: "Section button text is required",
                      })}
                      placeholder="button text"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.buttonText1 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.buttonText1.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Label>Button URL 1</Label>


                    <Input
                      {...registerUpdate("buttonUrl1", {
                        required: "Section button url is required",
                      })}
                      placeholder="button url "
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.buttonUrl1 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.buttonUrl1.message}
                      </p>
                    )}
                  </div>



                  <div className="col-span-1">
                    <Label>Description 1</Label>

                    <Textarea
                      {...registerUpdate("description1", {
                        required: "Description is required",
                      })}
                      placeholder="Description"
                      className="pl-10"
                    />

                    {UpdateError.description1 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.description1.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <Label>Heading 2</Label>


                    <Input
                      {...registerUpdate("heading2", {
                        required: "Section heading is required",
                      })}
                      placeholder="Heading"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.heading2 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.heading2.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Label>Button text 2</Label>


                    <Input
                      {...registerUpdate("buttonText2", {
                        required: "Section button text is required",
                      })}
                      placeholder="button text"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.buttonText2 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.buttonText2.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Label>Button URL 2</Label>


                    <Input
                      {...registerUpdate("buttonUrl2", {
                        required: "Section button url is required",
                      })}
                      placeholder="button url "
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.buttonUrl2 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.buttonUrl2.message}
                      </p>
                    )}
                  </div>


                  <div className="col-span-1">
                    <Label>Description 2</Label>

                    <Textarea
                      {...registerUpdate("description2", {
                        required: "Description is required",
                      })}
                      placeholder="Description"
                      className="pl-10"
                    />

                    {UpdateError.description2 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.description2.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <Label>Heading 3</Label>


                    <Input
                      {...registerUpdate("heading3", {
                        required: "Section heading is required",
                      })}
                      placeholder="Heading"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.heading3 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.heading3.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Label>Button text 3</Label>


                    <Input
                      {...registerUpdate("buttonText3", {
                        required: "Section button text is required",
                      })}
                      placeholder="button text"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.buttonText3 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.buttonText3.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Label>Button URL 3</Label>


                    <Input
                      {...registerUpdate("buttonUrl3", {
                        required: "Section button url is required",
                      })}
                      placeholder="button url "
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.buttonUrl3 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.buttonUrl3.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <Label>Description 3</Label>

                    <Textarea
                      {...registerUpdate("description3", {
                        required: "Description is required",
                      })}
                      placeholder="Description"
                      className="pl-10"
                    />

                    {UpdateError.description3 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.description3.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Label>Heading 4</Label>


                    <Input
                      {...registerUpdate("heading4", {
                        required: "Section heading is required",
                      })}
                      placeholder="Heading"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.heading4 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.heading4.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Label>Button text 4</Label>


                    <Input
                      {...registerUpdate("buttonText4", {
                        required: "Section button text is required",
                      })}
                      placeholder="button text"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.buttonText4 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.buttonText4.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-1">
                    <Label>Button URL 4</Label>


                    <Input
                      {...registerUpdate("buttonUrl4", {
                        required: "Section button url is required",
                      })}
                      placeholder="button url "
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.buttonUrl4 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.buttonUrl4.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <Label>Description 4</Label>

                    <Textarea
                      {...registerUpdate("description4", {
                        required: "Description is required",
                      })}
                      placeholder="Description"
                      className="pl-10"
                    />

                    {UpdateError.description4 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.description4.message}
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