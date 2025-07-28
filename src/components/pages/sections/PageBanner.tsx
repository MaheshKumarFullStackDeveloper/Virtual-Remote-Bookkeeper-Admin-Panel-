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

type AddProps = {
  selectedSection: string;
  sectionValue: Sections;
  updateSections: (updateSections: Sections[]) => void;
  updateSelectedSection: () => void;
};

type PageBanner = {
  topHeading: string;
  mainHeading1: string;
  mainHeading2: string;
  mainHeading3: string;
  bottomHeading: string;
  buttonText: string;
  buttonUrl: string;
  leftImage: string;
  leftImageText: string;
  rightImage: string;
  order: string;
};


export default function PageBanner({ selectedSection, sectionValue, updateSections, updateSelectedSection }: AddProps): React.JSX.Element {
  const [addUpadateSection] = useAddUpadateSectionMutation();
  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);

  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    setValue,
    formState: { errors: UpdateError },
  } = useForm<PageBanner>({});

  useEffect(() => {
    console.log("selectedSection updated:", selectedSection);
    console.log("page--- updated:", sectionValue);

    setValue("order", sectionValue.order)



    if (sectionValue.content !== "") {
      const Details = JSON.parse(sectionValue.content);
      setValue("topHeading", Details.topHeading)
      setValue("mainHeading1", Details.mainHeading1)
      setValue("mainHeading2", Details.mainHeading2)
      setValue("mainHeading3", Details.mainHeading3)
      setValue("bottomHeading", Details.bottomHeading)
      setValue("buttonText", Details.buttonText)
      setValue("buttonUrl", Details.buttonUrl)
      setValue("leftImage", Details.leftImage)
      setValue("leftImageText", Details.leftImageText)
      setValue("rightImage", Details.rightImage)
      setValue("order", Details.order)
    } else {
      setValue("topHeading", "")
      setValue("mainHeading1", "")
      setValue("mainHeading2", "")
      setValue("mainHeading3", "")
      setValue("bottomHeading", "")
      setValue("buttonText", "")
      setValue("buttonUrl", "")
      setValue("leftImage", "")
      setValue("leftImageText", "")
      setValue("rightImage", "")
      setValue("order", "")
    }
    openModal();
  }, [selectedSection, openModal, sectionValue, setValue]); // Runs whenever selectedSection changes

  const onSubmitUpdate = async (data: PageBanner) => {
    setupdateLoading(true);

    try {
      const { topHeading, mainHeading1, mainHeading2, mainHeading3, order, bottomHeading, buttonText, leftImage, rightImage, leftImageText, buttonUrl } = data;

      const newContent = { topHeading, mainHeading1, mainHeading2, mainHeading3, order, bottomHeading, buttonText, leftImage: leftImage.trim().replace(/\s+/g, ''), rightImage: rightImage.trim().replace(/\s+/g, ''), leftImageText, buttonUrl: buttonUrl.trim().replace(/\s+/g, '') }
      console.log("page updated:", sectionValue.page);
      const result = await addUpadateSection({ content: JSON.stringify(newContent), title: "PageBanner", pageId: sectionValue.page, order, sectionId: sectionValue._id }).unwrap();

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
              Update Page Banner
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
                    <Label>Top Heading</Label>


                    <Input
                      {...registerUpdate("topHeading", {
                        required: "Section Top Heading is required",
                      })}
                      placeholder="Top Heading"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.topHeading && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.topHeading.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <Label>Main Heading 1</Label>

                    <Input
                      {...registerUpdate("mainHeading1", {
                        required: "Section Main Heading  is required",
                      })}
                      placeholder="Main Heading"
                      type="text"

                      className="pl-10"
                    />

                    {UpdateError.mainHeading1 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.mainHeading1.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <Label>Main Heading 2</Label>

                    <Input
                      {...registerUpdate("mainHeading2", {
                        required: "Section Main Heading 2 is required",
                      })}
                      placeholder="Main Heading 2"
                      type="text"

                      className="pl-10"
                    />

                    {UpdateError.mainHeading2 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.mainHeading2.message}
                      </p>
                    )}
                  </div>
                  <div className="col-span-1">
                    <Label>Main Heading 3</Label>

                    <Input
                      {...registerUpdate("mainHeading3", {
                        required: "Section Main Heading 3 is required",
                      })}
                      placeholder="Main Heading 3"
                      type="text"

                      className="pl-10"
                    />

                    {UpdateError.mainHeading3 && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.mainHeading3.message}
                      </p>
                    )}
                  </div>


                  <div className="col-span-1">
                    <Label>Bottom Heading</Label>

                    <Input
                      {...registerUpdate("bottomHeading", {
                        required: "Section Bottom Heading is required",
                      })}
                      placeholder="Bottom Heading"
                      type="text"

                      className="pl-10"
                    />
                    {UpdateError.bottomHeading && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.bottomHeading.message}
                      </p>
                    )}


                  </div>



                  <div className="col-span-1">
                    <Label>Button Text</Label>

                    <Input
                      {...registerUpdate("buttonText", {
                        required: "Section Button Text is required",
                      })}
                      placeholder="Button Text"
                      type="text"

                      className="pl-10"
                    />
                    {UpdateError.buttonText && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.buttonText.message}
                      </p>
                    )}


                  </div>

                  <div className="col-span-1">
                    <Label>Button Url</Label>

                    <Input
                      {...registerUpdate("buttonUrl", {
                        required: "Section Button Url is required",
                      })}
                      placeholder="Button Url"
                      type="text"

                      className="pl-10"
                    />
                    {UpdateError.buttonUrl && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.buttonUrl.message}
                      </p>
                    )}


                  </div>

                  <div className="col-span-1">
                    <Label>Left Image</Label>

                    <Input
                      {...registerUpdate("leftImage", {
                        required: "Section Left Image is required",
                      })}
                      placeholder="Left Image"
                      type="text"

                      className="pl-10"
                    />
                    {UpdateError.leftImage && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.leftImage.message}
                      </p>
                    )}


                  </div>
                  <div className="col-span-1">
                    <Label>Left Image Text</Label>

                    <Input
                      {...registerUpdate("leftImageText", {
                        required: "Section Left Image Text is required",
                      })}
                      placeholder="Left Image Text"
                      type="text"

                      className="pl-10"
                    />
                    {UpdateError.leftImageText && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.leftImageText.message}
                      </p>
                    )}


                  </div>
                  <div className="col-span-1">
                    <Label>Right Image</Label>

                    <Input
                      {...registerUpdate("rightImage", {
                        required: "Section Right Image is required",
                      })}
                      placeholder="Right Image"
                      type="text"

                      className="pl-10"
                    />
                    {UpdateError.rightImage && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.rightImage.message}
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