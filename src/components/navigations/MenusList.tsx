"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";


import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useAddUpadateMenuMutation, useDeleteItemByIdMutation, useDeleteMenuByIdMutation, useGetAllMenusAndAllItemsQuery } from "@/app/store/api";
import toast, { LoaderIcon } from "react-hot-toast";
import { AlertProps, DeleteMenuParams, Item, Menu } from "@/lib/types/types";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Alert from "../ui/alert/Alert";
import Label from "../form/Label";
import { Input } from "../ui/input";
import Button from "../ui/button/Button";
import AddEditItem from "./AddEditItem";





export default function MenuList() {

  const [menus, setMenus] = useState<Menu[]>([])
  const [editItem, setEditItem] = useState<Item | null>(null)
  const [addedititem, setAddedititem] = useState<string>("")
  const [refreshMenu, setRefreshMenu] = useState<string | null>(null)
  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);
  const [AddUpadateMenu] = useAddUpadateMenuMutation()
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);
  const { data: apiAllmenuResponse = {} } = useGetAllMenusAndAllItemsQuery(undefined)
  const [deleteMenuById] = useDeleteMenuByIdMutation()
  const [deleteItemById] = useDeleteItemByIdMutation()
  const [sectionMenu, setSectionMenu] = useState<Menu | null>(null);




  useEffect(() => {
    if (apiAllmenuResponse.success) {
      setMenus(apiAllmenuResponse.data)

    }
    setRefreshMenu(null);
    console.log("all Menu", menus)
  }, [apiAllmenuResponse, refreshMenu])




  const handleDeleteMenu = async ({ menuId, type }: DeleteMenuParams) => {


    const isConfirmed = window.confirm("Are you sure you want to delete this menu ?");
    if (!isConfirmed) return;

    try {


      if (type === 'menu') {
        const result = await deleteMenuById(menuId).unwrap();
        if (result.success) {
          toast.success("Delete Menu successfully", { position: 'bottom-center' })
          console.log("This is delete result", result)
          setRefreshMenu("refresh");
        }
      } else {
        const result = await deleteItemById(menuId).unwrap();
        if (result.success) {
          toast.success("Delete Item successfully", { position: 'bottom-center' })
          console.log("This Item is delete result", result)
          setRefreshMenu("refresh");
        }
      }


    } catch (error) {
      console.log("Error on login", error)
      toast.error("Menu not Deleted ", { position: 'bottom-center' });
    } finally {

    }
  }

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    setValue,
    formState: { errors: UpdateError },
  } = useForm<Menu>({});

  const onSubmitUpdate = async (data: Menu) => {
    setupdateLoading(true);

    try {
      const { title, menuId } = data;
      const result = await AddUpadateMenu({ title, menuId }).unwrap();
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

    const menudata = menus[index];
    setValue('menuId', menudata._id);
    setValue('title', menudata.title);
    openModal();
  };


  const handleAddItem = (index: number) => {
    const menudata = menus[index];
    setSectionMenu(menudata);
    setAddedititem('add');
  };

  const handleEditItem = (childItem: Item) => {

    setEditItem(childItem);
    setAddedititem('edit');

    console.log("Edit menu");
  };

  const reloadMenu = () => {

    console.log("Reload menu");
  };
  const resetAddEditItem = () => {

    console.log("Reset  Addedititem");
    setRefreshMenu("refresh");
    setAddedititem('');
    setSectionMenu(null);
    setEditItem(null);

  };


  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1002px]">
            {menus && menus.length > 0 ? (<>
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>

                    <TableCell
                      isHeader
                      className="px-5 py-3 w-[15%] font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Title
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3  w-[70%]  font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Items
                    </TableCell>

                    <TableCell
                      isHeader
                      className="px-5 py-3 w-[15%]  font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {menus.map((menu, index) => (
                    <TableRow key={menu._id}>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {menu.title}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">

                        {menu.items && menu.items.length > 0 ? (<>
                          <ul className=" w-[100%]">
                            {menu.items.map((item, index) => (
                              <li className="w-[100%] border border-gray-200 float-left py-1 px-3 " key={index}>
                                <div className="flex min-w-[100%] w-[100%] ">
                                  <span className="w-1/2">{item.title} : {item.link} </span>
                                  <span className="w-1/2   flex"> <span className="ml-auto"> <EditIcon onClick={() => handleEditItem(item)} className=" h-8 w-8  p-2 text-blue-500 float-left gap-1 rounded-full font-medium cursor-pointer" /> <TrashIcon onClick={() => handleDeleteMenu({ menuId: item._id, type: "item" })} className=" h-8 w-8  p-2  text-red-500 float-left gap-1 rounded-full font-medium cursor-pointer" /></span></span>
                                </div>
                                <div className="float-right w-[80%] ">
                                  {item.children && item.children.length > 0 ? (<>
                                    <ul >
                                      {item.children.map((childItem, index) => (
                                        <li key={index}>
                                          <div className="flex items-center justify-center border  border-gray-200">
                                            - <span className="w-1/2 ">{childItem.title} : {childItem.link} </span>
                                            <span className="w-1/2  flex"> <span className="ml-auto"><EditIcon onClick={() => handleEditItem(childItem)} className=" h-8 w-8  p-2 text-blue-500 float-left gap-1 rounded-full font-medium cursor-pointer" /> <TrashIcon onClick={() => handleDeleteMenu({ menuId: childItem._id, type: "item" })} className=" h-8 w-8  p-2  text-red-500 float-left gap-1 rounded-full font-medium cursor-pointer" /></span></span>
                                          </div>
                                        </li>
                                      ))}
                                    </ul> </>) : (<></>)}
                                </div>
                              </li>
                            ))}
                          </ul> </>) : (<span>Add menu item</span>)}
                      </TableCell>


                      <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <EditIcon onClick={() => handleEditForm(index)} className=" h-8 w-8  p-2 text-blue-500 float-left gap-1 rounded-full font-medium cursor-pointer" /> <TrashIcon onClick={() => handleDeleteMenu({ menuId: menu._id, type: "menu" })} className=" h-8 w-8  p-2  text-red-500 float-left gap-1 rounded-full font-medium cursor-pointer" />
                        <PlusIcon onClick={() => handleAddItem(index)} className=" h-8 w-8 cursor-pointer p-2 text-blue-500 float-left gap-1 rounded-full font-medium" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>) : (<><h3>Not found menu</h3></>)}

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
              <div className="custom-scrollbar h-[200px] overflow-y-auto px-2 pb-3">

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
                        {...registerUpdate("menuId")}
                        type="hidden"

                      />

                      <Input
                        {...registerUpdate("title", {
                          required: "Menu title is required",
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



      {addedititem !== "" ? (<> <AddEditItem reloadMenu={reloadMenu} editItem={editItem} resetAddEditItem={resetAddEditItem} sectionMenu={sectionMenu} /></>) : ""}

    </>
  );
}
