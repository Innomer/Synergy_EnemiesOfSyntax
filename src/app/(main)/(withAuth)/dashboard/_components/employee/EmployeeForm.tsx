"use client";
import { InsertEmployeeSchema } from "@/lib/validators/employee";
import { Input } from "@nextui-org/input";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { safeParse } from "valibot";

export const dynamic = "force-dynamic";

export default function EmployeeForm() {
  const initialData = {
    position: "",
    department: "",
    phoneNumber: "",
    location: "",
    companyName: "",
    companyId: "",
  };
  const [autoCompleteData, setAutoCompleteData] = useState<any>([]);
  const [employeeFormLoading, setEmployeeFormLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const handleChange = (field: keyof typeof initialData, newValue: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: newValue }));
  };
  const [loading, setLoading] = useState(true);

  const handlingEmployeeFormSubmission = async () => {
    const isFormDataValid = safeParse(InsertEmployeeSchema, {
      formData,
    });
    if (isFormDataValid.success) {
      toast.error("Please fill all the fields");
      return;
    }
    const loadingToast = toast.loading("Saving employee data");
    try {
      setEmployeeFormLoading(true);
      const resp = await axios.post("/api/employee-verification", formData);
      if (resp.data.success) {
        toast.success("Employee data saved successfully");
      }
    } catch (err) {
      toast.error("Employee data not saved");
      console.log(err);
    } finally {
      setEmployeeFormLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  useEffect(() => {
    async function getCompanyData() {
      try {
        setLoading(true);
        const resp = await axios.get("/api/get-company-data");
        setAutoCompleteData(resp.data.data);
        // console.log(resp.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    getCompanyData();
  }, []);

  return (
    <>
      <div className="w-full mb-8">
        <Autocomplete
          fullWidth
          required
          className="mx-auto"
          labelPlacement="outside"
          isLoading={loading}
          label="Company name"
          value={initialData.companyName}
          onSelectionChange={(e) => {
            handleChange("companyName", e as string);
            autoCompleteData.map((data: any) => {
              if (data.name === e) {
                handleChange("companyId", data.id);
              }
            });
          }}
        >
          {!loading && autoCompleteData[0]?.id ? (
            autoCompleteData.map((item: any) => (
              <AutocompleteItem key={item.name} value={item.name}>
                {item.name as string}
              </AutocompleteItem>
            ))
          ) : (
            <AutocompleteItem key={""}></AutocompleteItem>
          )}
        </Autocomplete>
      </div>

      <div className="mt-10 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <Input
          label="Department"
          value={formData.department}
          onChange={(e) => handleChange("department", e.target.value)}
        />
        <Input
          label="Position"
          required
          value={formData.position}
          onChange={(e) => handleChange("position", e.target.value)}
        />
        <Input
          label="PhoneNumber"
          value={formData.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />
        <Input
          label="Location"
          required
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div className="flex justify-center mt-5">
        <Button
          type="submit"
          color="success"
          className="w-[75%] flex"
          isLoading={employeeFormLoading}
          onClick={handlingEmployeeFormSubmission}
        >
          Save and get results
        </Button>
      </div>
    </>
  );
}
