"use client";
import { siteConfig } from "@/lib/config/siteConfig";
import { Button } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { AutoComplete } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import { matchSorter } from "match-sorter";
registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginImageCrop
);

// Register any FilePond plugins you need, e.g., for image preview or file validation

export default function RetirementCalculator() {
  const initialData = {
    commitMessage: "",
    project: "",
    files: [], // Initialize files array in the form data
  };

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [loadingForAutoComplete, setLoadingForAutoComplete] = useState(true);
  const [projects, setProjects] = useState([{}]);

  const handleChange = (field: keyof typeof initialData, newValue: any) => {
    setFormData((prevData) => ({ ...prevData, [field]: newValue }));
  };

  const handlingCalculatorFormSubmission = async () => {
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("project", formData.project);
      fd.append("commitMessage", formData.commitMessage);

      // If only one file, use 'file' as the key, otherwise use 'files'
      if (formData.files.length === 1) {
        fd.append("file", formData.files[0]);
      } else {
        // Append each file under the 'files' key
        formData.files.forEach((file) => fd.append("files", file));
      }

      // Determine the endpoint based on the number of files
      const endpoint =
        formData.files.length > 1
          ? "/file/uploadMultiple"
          : "/file/uploadSingle";

      const response = await axios.post(
        `${siteConfig.baseUrl}${endpoint}`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Form submitted successfully!");
      console.log("Server response:", response.data);
    } catch (err) {
      console.error(err);
      toast.error("There was an error submitting the form.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    async function getProjects() {
      try {
        setLoadingForAutoComplete(true);
        const { data } = await axios.get(`${siteConfig.baseUrl}/file/projects`);
        const transformedData = data.map((projectName: string) => ({
          label: projectName, // Use the project name as the label
          value: projectName, // Use the project name as the value as well
        }));
        setProjects(transformedData);
      } catch (err) {
        console.log(err);
        toast.error("There was an error in fetching the projects");
      } finally {
        setLoadingForAutoComplete(false);
      }
    }

    getProjects();
  }, []);

  const handleFilePondUpdate = (fileItems) => {
    // Set file objects for uploading
    handleChange(
      "files",
      fileItems.map((fileItem) => fileItem.file)
    );
  };

  const onAutoCompleteChange = (data: string) => {
    handleChange("project", data);
  };
  const matcher = (data: string) => {
    const temp = matchSorter(projects, data);
    const transformedData = temp.map((projectName: string) => ({
      label: projectName,
      value: projectName,
    }));
    return transformedData;
  };

  return (
    <>
      <div className="w-full flex overflow-hidden">
        <section className="px-4 py-12 mx-auto max-w-lg mt-28 md:max-w-xl lg:max-w-7xl md:px-12 lg:px-24 lg:py-24">
          <div className="justify-center relative p-14 pt-0 overflow-hidden rounded-3xl border border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-950">
            <h1 className="text-5xl text-center align-middle mb-2 mt-12">
              Enter your data
            </h1>
            <p className="text-lg text-center mb-12 text-neutral-600">
              Don&apos;t worry! Your data is safe with us and won&apos;t be sold
              ❤️
            </p>

            <div className="mb-8 flex flex-col gap-y-5">
              <Textarea
                label="Commit message"
                placeholder="Enter a description regarding the files being uploaded"
                value={formData.commitMessage}
                onChange={(e) => handleChange("commitMessage", e.target.value)}
              />
              <AutoComplete
                allowClear
                className="w-full"
                options={loadingForAutoComplete ? [] : projects}
                onSearch={(text) => setProjects(matcher(text))}
                onChange={onAutoCompleteChange}
                placeholder="Select a project"
                value={formData.project}
              />

              {/* FilePond component for file uploading */}
              <FilePond
                files={formData.files}
                allowMultiple={true}
                instantUpload={false}
                onupdatefiles={handleFilePondUpdate}
                name="files"
                credits={false}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
            </div>

            <Button
              fullWidth
              color="success"
              isLoading={loading}
              onClick={handlingCalculatorFormSubmission}
            >
              Submit
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
