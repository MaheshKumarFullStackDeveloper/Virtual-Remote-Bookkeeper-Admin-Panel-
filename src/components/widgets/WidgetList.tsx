"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { EditIcon, TrashIcon } from "lucide-react";
import { useDeleteWidgetByIdMutation, useGetWidgetsQuery, useUploadWidgetMutation } from "@/app/store/api";
import toast, { LoaderIcon } from "react-hot-toast";
import { AlertProps, Widget } from "@/lib/types/types";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Alert from "../ui/alert/Alert";
import Label from "../form/Label";
import { Input } from "../ui/input";
import Button from "../ui/button/Button";

import { Textarea } from "../ui/textarea";




export default function WidgetList() {


  const [widgets, setWidgets] = useState<Widget[]>([])
  const [toFrom, setToFrom] = useState<string>("")
  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);
  const [AddUpadateWidget] = useUploadWidgetMutation()
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);
  const limit = 100;
  const { data: apiResponse = {} } = useGetWidgetsQuery({ widget: 1, limit: limit })
  const [deleteWidgetById] = useDeleteWidgetByIdMutation()
  useEffect(() => {
    if (apiResponse.success) {
      setWidgets(apiResponse.data.widgetsList)

      const topge = apiResponse.data.totalWidgetsCount;


      setToFrom(`Total Widgets : ${apiResponse.data.totalWidgetsCount}, show 1 to ${topge} `);
    }

  }, [apiResponse, toFrom, limit])



  const handleDeleteWidget = async (widgetId: string) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this widget?");
    if (!isConfirmed) return;

    try {

      const result = await deleteWidgetById(widgetId).unwrap();

      if (result.success) {
        toast.success("Delete widget successfully", { position: 'bottom-center' })
        console.log("This is delete result", result)
      }

    } catch (error) {
      console.log("Error on login", error)
      toast.error("widget not Deleted ", { position: 'bottom-center' });
    } finally {

    }
  }

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    setValue,
    formState: { errors: UpdateError },
  } = useForm<Widget>({});

  const onSubmitUpdate = async (data: Widget) => {
    setupdateLoading(true);

    try {
      const { title, content, widgetId } = data;
      const result = await AddUpadateWidget({ title, content, widgetId }).unwrap();
      console.log("this is Update result", result)
      if (result.success) {

        setAlerts([
          {
            variant: "success",
            title: "Update Widget successfully",
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

    const widgetdata = widgets[index];
    setValue('widgetId', widgetdata._id);
    setValue('title', widgetdata.title);
    setValue('content', widgetdata.content);

    openModal();
  };
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
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
                    Content
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
                {widgets.map((widget, index) => (
                  <TableRow key={widget._id}>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {widget.title}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {widget.content}
                    </TableCell>


                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <EditIcon onClick={() => handleEditForm(index)} className=" h-8 w-8  p-2 text-blue-500 float-left gap-1 rounded-full font-medium" /> <TrashIcon onClick={() => handleDeleteWidget(widget._id)} className=" h-8 w-8  p-2  text-red-500 float-left gap-1 rounded-full font-medium" />

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="px-6 py-5 flex flex-row w-[100%] relative">
              <div className="basis-1/2">
                <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{toFrom}</h3> </div>
              <div className="basis-1/2 text-right"></div>
            </div>
          </div>
        </div>
      </div>


      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Widget
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
                        {...registerUpdate("widgetId")}
                        type="hidden"

                      />

                      <Input
                        {...registerUpdate("title", {
                          required: "Widget title is required",
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
