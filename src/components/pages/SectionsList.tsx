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
import { useDeleteSectionByIdMutation, useGetPageBySlugQuery, } from "@/app/store/api";

import toast from "react-hot-toast";
import { Page, Sections } from "@/lib/types/types";

import Image from "next/image";
import BlankHtml from "./sections/BlankHtml";
import FAQ from "./sections/FAQ";
import Blog from "./sections/Blog";
import LeftSideTextRightSideImage from "./sections/LeftSideTextRightSideImage";
import TopTextBottomContactForm from "./sections/TopTextBottomContactForm";
import LeftSideImageRightSideText from "./sections/LeftSideImageRightSideText";
import LeftSideImageRightSideContactForm from "./sections/LeftSideImageRightSideContactForm";
import OneRowThreeColumn from "./sections/OneRowThreeColumn"
import TwoRowTwoColumn from "./sections/TwoRowTwoColumn"
import LeftSideTextRightSideImageWithButton from "./sections/LeftSideTextRightSideImageWithButton"
import OneRowTwoColumn from "./sections/OneRowTwoColumn"
import { useParams } from "next/navigation";
import BlankHtmlView from "./sectionsView/BlankHtmlView";
import LeftSideImageRightSideContactFormView from "./sectionsView/LeftSideImageRightSideContactFormView";
import LeftSideTextRightSideImageView from "./sectionsView/LeftSideTextRightSideImageView";
import OneRowThreeColumnView from "./sectionsView/OneRowThreeColumnView";
import LeftSideTextRightSideImageWithButtonView from "./sectionsView/LeftSideTextRightSideImageWithButtonView";
import TwoRowTwoColumnView from "./sectionsView/TwoRowTwoColumnView";
import OneRowTwoColumnView from "./sectionsView/OneRowTwoColumnView";
import TopTextBottomContactFormView from "./sectionsView/TopTextBottomContactFormView";
import LeftSideImageRightSideTextView from "./sectionsView/LeftSideImageRightSideTextView";
import FAQView from "./sectionsView/FAQView";
import BlogView from "./sectionsView/BlogView";
import PageBanner from "./sections/PageBanner";
import PageBannerView from "./sectionsView/PageBannerView";
import LeftSideTextRightSideContactFormView from "./sectionsView/LeftSideTextRightSideContactFormView";
import LeftSideTextRightSideContactForm from "./sections/LeftSideTextRightSideContactForm";
import LeftSideContactFormtRightSideText from "./sections/LeftSideContactFormtRightSideText";
import LeftSideContactFormtRightSideTextView from "./sectionsView/LeftSideContactFormtRightSideTextView";




export default function SectionsList() {
  const params = useParams();
  const slug = params.slug;
  const [deleteSectionById] = useDeleteSectionByIdMutation()
  const [page, setPage] = useState<Page>({
    _id: '',
    title: '',
    slug: '',
    status: '',
    metaTitle: '',
    metaDescription: '',
    pageId: undefined,
    sections: []
  })
  const [sectionValue, setSectionValue] = useState<Sections>({
    _id: '',
    title: '',
    content: '',
    order: '',
    page: '' // Add the missing property with a default value
  });


  const { data: apiResponse = {} } = useGetPageBySlugQuery(slug)

  const [sections, setSections] = useState<Sections[]>([])


  useEffect(() => {
    if (apiResponse.success) {
      setPage(apiResponse.data);
      setSectionValue(prevState => ({
        ...prevState,
        page: apiResponse.data._id
      }))
      setSections(apiResponse.data.sections)


    }

  }, [apiResponse, page])



  const handleDeleteSection = async (sectionId: string) => {

    const isConfirmed = window.confirm("Are you sure you want to delete this Section ?");
    if (!isConfirmed) return;

    try {

      const result = await deleteSectionById(sectionId).unwrap();

      if (result.success) {
        setSections([...result.data]);
        toast.success("Delete Section successfully", { position: 'bottom-center' })
        console.log("Thisis delete result", result)
      }

    } catch (error) {
      console.log("Error on login", error)
      toast.error("page not Deleted ", { position: 'bottom-center' });
    } finally {

    }
  }



  const options = [
    { value: "BlankHtml", label: "Blank HTML", imgSrc: "/Html.png" },
    { value: "PageBanner", label: "Page Banner", imgSrc: "/PageBanner.png" },
    { value: "Blog", label: "Blog", imgSrc: "/Blog.png" },
    { value: "LeftSideImageRightSideContactForm", label: "Left Side Image Right Side Contact Form", imgSrc: "/LeftSideImageRightSideContactForm.png" },
    { value: "LeftSideContactFormtRightSideText", label: "Left Side Contact Formt Right Side Text", imgSrc: "/LeftSideContactFormtRightSideText.png" },
    { value: "LeftSideTextRightSideContactForm", label: "Left Side Text Right Side Contact Form", imgSrc: "/LeftSideTextRightSideContactForm.png" },
    { value: "TopTextBottomContactForm", label: "Top Text Bottom Contact Form", imgSrc: "/TopTextBottomContactForm.png" },
    { value: "LeftSideTextRightSideImage", label: "Left Side Text Right Side Image", imgSrc: "/LeftSideTextRightSideImage.png" },
    { value: "LeftSideImageRightSideText", label: "Left Side Image Right SideText", imgSrc: "/LeftSideImageRightSideText.png" },
    { value: "LeftSideTextRightSideImageWithButton", label: "Left Side Text Right Side Image With Button", imgSrc: "/LeftSideTextRightSideImageWithButton.png" },
    { value: "OneRowThreeColumn", label: "One Row Three Column", imgSrc: "/OneRowThreeColumn.png" },
    { value: "TwoRowTwoColumn", label: "Two Row Two Column", imgSrc: "/TwoRowTwoColumn.png" },
    { value: "OneRowTwoColumn", label: "One Row Two Column", imgSrc: "/OneRowTwoColumn.png" },
    { value: "FAQ", label: "FAQ", imgSrc: "/FAQ.png" },
  ];


  const [selectedSection, setSelectedSection] = useState<string>("");

  const handleSelect = ({ value, sectionNewValue }: { value: string, sectionNewValue: Sections }) => {

    setSectionValue(sectionNewValue);
    setSelectedSection(value);
    console.log("upd--- section sele", sectionValue)
  };

  const updateSections = (newSections: Sections[]) => {
    setSections([...newSections]);

    console.log("after update section", sectionValue)
  };
  const updateSelectedSection = () => {
    setSelectedSection("");
  };

  useEffect(() => {
    console.log("Updated --sections:", sections);

    setSectionValue(prev => ({ ...prev, content: '', title: '', order: '', _id: '' }));
  }, [sections]); // Runs whenever `sections` changes


  return (
    <>

      <div className="mx-auto w-full py-2 mb-5 text-center">

        <h3>Add New Section</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)", gap: "10px" }}>
          {options.map((option) => (
            option.imgSrc && (
              <div
                key={option.value}
                onClick={() => handleSelect({ value: option.value, sectionNewValue: sectionValue })}
                style={{ cursor: "pointer", border: selectedSection === option.value ? "2px solid blue" : "2px solid transparent", padding: "5px" }}
              >
                <Image src={option.imgSrc} alt={option.label} width={100} height={50} />

              </div>
            )
          ))}
        </div>

        {selectedSection && <p style={{ marginTop: "10px" }}>Selected Value: <strong>{selectedSection}</strong></p>}

      </div >
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">




      </div>
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
                  Desgin
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
              {sections && sections.length > 0 ? sections.map((section, index) => (

                <TableRow key={index}>



                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">

                    {section.title === 'BlankHtml' ? (<BlankHtmlView content={section.content} />) : ""}
                    {section.title === 'PageBanner' ? (<PageBannerView content={section.content} />) : ""}
                    {section.title === 'LeftSideContactFormtRightSideText' ? (<LeftSideContactFormtRightSideTextView content={section.content} />) : ""}
                    {section.title === 'LeftSideTextRightSideContactForm' ? (<LeftSideTextRightSideContactFormView content={section.content} />) : ""}

                    {section.title === 'LeftSideImageRightSideContactForm' ? (<LeftSideImageRightSideContactFormView content={section.content} />) : ""}
                    {section.title === 'LeftSideTextRightSideImage' ? (<LeftSideTextRightSideImageView content={section.content} />) : ""}
                    {section.title === 'OneRowThreeColumn' ? (<OneRowThreeColumnView content={section.content} />) : ""}
                    {section.title === 'LeftSideTextRightSideImageWithButton' ? (<LeftSideTextRightSideImageWithButtonView content={section.content} />) : ""}
                    {section.title === 'TwoRowTwoColumn' ? (<TwoRowTwoColumnView content={section.content} />) : ""}
                    {section.title === 'OneRowTwoColumn' ? (<OneRowTwoColumnView content={section.content} />) : ""}
                    {section.title === 'TopTextBottomContactForm' ? (<TopTextBottomContactFormView content={section.content} />) : ""}
                    {section.title === 'LeftSideImageRightSideText' ? (<LeftSideImageRightSideTextView content={section.content} />) : ""}
                    {section.title === 'FAQ' ? (<FAQView content={section.content} />) : ""}
                    {section.title === 'Blog' ? (<BlogView content={section.content} />) : ""}



                  </TableCell>


                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <TrashIcon onClick={() => handleDeleteSection(section._id)} className=" h-8 w-8  p-2  text-red-500 float-left gap-1 rounded-full font-medium" />
                    <EditIcon onClick={() => handleSelect({ value: section.title, sectionNewValue: section })} className=" h-8 w-8  p-2  text-green-500 float-left gap-1 rounded-full font-medium" />
                  </TableCell>
                </TableRow>
              )) : ""}
            </TableBody>
          </Table>


        </div>
      </div>



      {selectedSection !== "" && selectedSection === "Blog" ? (<> <Blog updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}
      {selectedSection !== "" && selectedSection === "LeftSideContactFormtRightSideText" ? (<> <LeftSideContactFormtRightSideText updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}
      {selectedSection !== "" && selectedSection === "FAQ" ? (<> <FAQ updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}
      {selectedSection !== "" && selectedSection === "BlankHtml" ? (<> <BlankHtml updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}
      {selectedSection !== "" && selectedSection === "PageBanner" ? (<> <PageBanner updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}
      {selectedSection !== "" && selectedSection === "LeftSideTextRightSideImage" ? (<> <LeftSideTextRightSideImage updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}

      {selectedSection !== "" && selectedSection === "LeftSideImageRightSideText" ? (<> <LeftSideImageRightSideText updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}

      {selectedSection !== "" && selectedSection === "TopTextBottomContactForm" ? (<> <TopTextBottomContactForm updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}

      {selectedSection !== "" && selectedSection === "TwoRowTwoColumn" ? (<> <TwoRowTwoColumn updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}

      {selectedSection !== "" && selectedSection === "LeftSideTextRightSideContactForm" ? (<> <LeftSideTextRightSideContactForm updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}
      {selectedSection !== "" && selectedSection === "LeftSideTextRightSideImageWithButton" ? (<> <LeftSideTextRightSideImageWithButton updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}

      {selectedSection !== "" && selectedSection === "OneRowThreeColumn" ? (<> <OneRowThreeColumn updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}

      {selectedSection !== "" && selectedSection === "LeftSideImageRightSideContactForm" ? (<> <LeftSideImageRightSideContactForm updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}

      {selectedSection !== "" && selectedSection === "OneRowTwoColumn" ? (<> <OneRowTwoColumn updateSections={updateSections} updateSelectedSection={updateSelectedSection} sectionValue={sectionValue} selectedSection={selectedSection} /></>) : ""}

      {/*  {selectedSection !== "" && selectedSection === "LeftSideImageRightSideContactForm" ? (<> <LeftSideImageRightSideContactForm selectedSection={selectedSection} /></>) : ""}
 */}
    </>
  );
}
