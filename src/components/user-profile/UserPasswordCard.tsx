"use client";
import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Label from "../form/Label";
import { useUpdateUserPasswordMutation } from "@/app/store/api";
import { useForm } from "react-hook-form";
import { LoaderIcon } from "react-hot-toast";
import Alert from "../ui/alert/Alert";
import { AlertProps } from "@/lib/types/types";


interface PasswordFormData {
  oldpassword: string;
  password: string;
  conpassword: string;
}


export default function UserPasswordCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const [updateLoading, setupdateLoading] = useState(false);
  const [UpdateUserPassword] = useUpdateUserPasswordMutation()
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);

  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    watch,
    formState: { errors: UpdateError },
  } = useForm<PasswordFormData>({});

  const onSubmitUpdate = async (data: PasswordFormData) => {
    setupdateLoading(true);

    try {
      const { oldpassword, password } = data;
      const result = await UpdateUserPassword({ oldpassword, password }).unwrap();
      console.log("this is Update result", result)
      if (result.success) {

        setAlerts([
          {
            variant: "success",
            title: "Update Pssword successfully",
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

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Password
            </h4>


          </div>

          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                fill=""
              />
            </svg>
            Edit
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Edit Password
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form onChange={handleFormChange} onSubmit={handleUpdateSubmit(onSubmitUpdate)} className="flex flex-col">
            <div className="custom-scrollbar h-[400px] overflow-y-auto px-2 pb-3">

              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Password change
                </h5>
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
                    <Label>Old Passwod</Label>
                    <Input
                      {...registerUpdate("oldpassword", {
                        required: "old password is required",
                      })}
                      placeholder="oldpassword"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.oldpassword && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.oldpassword.message}
                      </p>
                    )}
                  </div>




                  <div className="col-span-1">
                    <Label>Passwod</Label>
                    <Input
                      {...registerUpdate("password", {
                        required: " password is required",
                      })}
                      placeholder="password"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.password && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.password.message}
                      </p>
                    )}
                  </div>




                  <div className="col-span-1">
                    <Label>Confirm Passwod</Label>
                    <Input
                      {...registerUpdate("conpassword", {
                        required: "confirm password is required",
                        validate: (value) =>
                          value === watch("password") || "Passwords do not match",
                      })}

                      placeholder="confirm password"
                      type="text"

                      className="pl-10"
                    />


                    {UpdateError.conpassword && (
                      <p className="text-red-700 text-sm">
                        {UpdateError.conpassword.message}
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
      </Modal>
    </>
  );
}
