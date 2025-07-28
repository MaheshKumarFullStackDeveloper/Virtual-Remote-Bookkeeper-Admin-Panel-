"use client";
import Button from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input"

import React, { useEffect, useState } from "react";
import { useAddUpadateBlogMutation, useGetBlogBySlugQuery, useGetCategorysQuery, } from "@/app/store/api";
import { LoaderIcon } from "react-hot-toast";
import Label from "@/components/form/Label";
import { Controller, useForm } from "react-hook-form";
import { AlertProps, Blog, Category } from "@/lib/types/types";
import Alert from "@/components/ui/alert/Alert";
//import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../form/input/select";

import Select from "react-select";
import { useParams } from "next/navigation";


import CustomEditor from "../form/CustomEditor";


export default function EditBlog() {
  const params = useParams();
  const slug = params.slug;
  const [oldcontentvalue, setOldcontentvalue] = useState<string>("");
  const [checkBlog, setCheckBlog] = useState<string>('Add New Blog')
  const [categories, setCategories] = useState<Category[]>([])
  const [updateLoading, setupdateLoading] = useState(false);
  const [AddUpadateBlog] = useAddUpadateBlogMutation()
  const [alerts, setAlerts] = useState<AlertProps[] | null>(null);
  const { data: apiCateResponse = {} } = useGetCategorysQuery({ page: 1, limit: 100 })
  const { data: apiBlogResponse = {} } = useGetBlogBySlugQuery(slug)
  const {
    register: registerUpdate,
    handleSubmit: handleUpdateSubmit,
    control,
    setValue,
    formState: { errors: UpdateError },
  } = useForm<Blog>({});
  useEffect(() => {

    if (apiBlogResponse.success) {
      setValue("title", apiBlogResponse.data.title)
      setValue("slug", apiBlogResponse.data.slug)
      setValue("status", apiBlogResponse.data.status)
      setValue("metaTitle", apiBlogResponse.data.metaTitle)
      setValue("metaDescription", apiBlogResponse.data.metaDescription)
      setValue("content", apiBlogResponse.data.content)
      setOldcontentvalue(apiBlogResponse.data.content)
      setValue("image", apiBlogResponse.data.image)
      setValue("blogId", apiBlogResponse.data._id)
      const categoryIds = apiBlogResponse.data.categories.map((cat: { _id: string }) => cat._id);
      setValue("categories", categoryIds);

      setCheckBlog(`Edit Blog - ${apiBlogResponse.data.title}`)
      console.log("load blog", categories);

    }
  }, [apiBlogResponse, categories, setValue]);

  useEffect(() => {
    if (apiCateResponse.success) {
      setCategories(apiCateResponse.data.categoryList);
      console.log("load cat", categories);

    }
  }, [apiCateResponse, categories]);



  const onSubmitUpdate = async (data: Blog) => {
    setupdateLoading(true);

    try {
      const { title, slug, status, metaTitle, metaDescription, content, categories, image, blogId } = data;

      const result = await AddUpadateBlog({ blogId, title, slug: slug.trim().replace(/\s+/g, ''), status, metaTitle, categories, image: image.trim().replace(/\s+/g, ''), metaDescription, content }).unwrap();
      console.log("this is Update result", result)
      if (result.success) {

        setAlerts([
          {
            variant: "success",
            title: "Update Blog successfully",
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


  const updatedValue = (updatedValue: string) => {
    setValue("content", updatedValue)
    console.log("after update content --", updatedValue)
  };

  return (<>
    <div className="mx-auto w-full py-2 text-end">


      <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
        {checkBlog}
      </h4>
      <form onChange={handleFormChange} onSubmit={handleUpdateSubmit(onSubmitUpdate)} className="flex flex-col">
        <div className="  px-2 pb-3">

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

            <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-left ">



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

              <Input
                {...registerUpdate("blogId", {
                })}
                type="hidden"
              />

              <div className="col-span-1">
                <Label>Slug</Label>
                <Input
                  {...registerUpdate("slug", {
                    required: "Page Slug is required",
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
                <Label>Image</Label>
                <Input
                  {...registerUpdate("image", {
                    required: "Blog image is required",
                  })}
                  placeholder="Image URL"
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

              <div className="col-span-1">
                <Label>Status</Label>


                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <Select
                      options={["active", "pending"].map((st) => ({
                        value: st,
                        label: st,
                      }))}
                      value={
                        field.value
                          ? { value: field.value, label: field.value }
                          : null
                      }
                      onChange={(selected) => {
                        field.onChange(selected?.value || "");
                      }}
                    />
                  )}
                />


                {UpdateError.status && (
                  <p className="text-red-700 text-sm">
                    {UpdateError.status.message}
                  </p>
                )}
              </div>



            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 text-left ">
            <div className="col-span-1  mt-5">
              <Label>Content</Label>
              <CustomEditor oldValue={oldcontentvalue} updatedValue={updatedValue} />


            </div>
          </div>

        </div>

        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">

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
      </form >
    </div >

  </>)

}