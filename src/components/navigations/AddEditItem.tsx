"use client";
import Button from "@/components/ui/button/Button";
import { useModal } from "@/hooks/useModal";
import { Input } from "@/components/ui/input"

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { useAddUpadateItemMutation } from "@/app/store/api";
import { LoaderIcon } from "react-hot-toast";
import Label from "@/components/form/Label";
import { useForm, Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../form/input/select";
import { AlertProps, Item, Menu } from "@/lib/types/types";
import Alert from "@/components/ui/alert/Alert";

type AddProps = {

  reloadMenu: () => void;
  resetAddEditItem: () => void;
  sectionMenu: Menu | null;
  editItem: Item | null;
};




export default function AddEditItem({ reloadMenu, resetAddEditItem, sectionMenu, editItem }: AddProps): React.JSX.Element {
  const [AddUpadateItem] = useAddUpadateItemMutation()
  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);
  const [parentItem, setParentItem] = useState<Item[] | null>(null);

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    setValue,
    control,
    formState: { errors: UpdateError },
  } = useForm<Item>({});

  useEffect(() => {

    console.log("menu Item updated:", sectionMenu);
    if (sectionMenu?.items && sectionMenu?.items?.length > 0) {
      setParentItem(sectionMenu?.items)
    }
    if (editItem && editItem?._id !== null) {
      setValue("title", editItem.title)
      setValue("link", editItem.link)
      setValue("order", editItem.order)
      setValue("menu", editItem.menu)
      /*     setValue("parent", editItem.parent) */
      setValue("itemId", editItem._id)
      openModal();
    }
    if (sectionMenu !== null) {
      openModal();
    }
  }, [sectionMenu, editItem, openModal, setValue]); // Runs whenever selectedSection changes

  const onSubmitUpdate = async (data: Item) => {
    setupdateLoading(true);

    try {
      const { title, link, order, parent, itemId, menu } = data;


      let updateMenu;

      if (editItem && editItem?._id !== null) {
        updateMenu = menu;
      } else {
        updateMenu = sectionMenu?._id;
      }

      const result = await AddUpadateItem({ title, link: link.trim().replace(/\s+/g, ''), order, menu: updateMenu, parent, itemId }).unwrap();
      if (result.success) {

        setAlerts([
          {
            variant: "success",
            title: "Add Item successfully",
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
    reloadMenu();
    resetAddEditItem();
    closeModal(); // Close the modal
  };


  return (<>
    <Modal isOpen={isOpen} onClose={handleCloseModal} className="max-w-[700px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">

          <form
            onChange={handleFormChange} onSubmit={handleUpdateSubmit(onSubmitUpdate)} className="flex flex-col">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Items
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


                    {editItem && editItem?._id !== null ? (<><Input  {...registerUpdate("menu")} type="hidden" /><Input  {...registerUpdate("parent")} type="hidden" /></>) : ""}

                    <Input  {...registerUpdate("itemId")} type="hidden" />


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
                    <Label>Title</Label>


                    <Input
                      {...registerUpdate("title", {
                        required: "Title is required",
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
                    <Label>Link</Label>

                    <Input
                      {...registerUpdate("link", {
                        required: "Link is required",
                      })}
                      placeholder="Link"
                      className="pl-10"
                    />

                    {UpdateError.link && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.link.message}
                      </p>
                    )}


                  </div>


                  {parentItem !== null ? (<>
                    <div className="col-span-1">
                      <Label>Parent</Label>

                      <Controller
                        name="parent"
                        control={control}
                        render={({ field }) => (
                          <Select

                            onValueChange={(value) => field.onChange(value)}

                            value={(field.value && field.value) ?? ""}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Please select categories " />
                            </SelectTrigger>
                            <SelectContent sideOffset={4} className="z-[999999] relative" >
                              {parentItem.map((item) => (
                                <SelectItem key={item._id} value={item._id}>
                                  {item.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      ></Controller>

                    </div>
                  </>) : (<></>)}

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