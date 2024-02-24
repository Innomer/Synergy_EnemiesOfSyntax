"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/button";

export default function SiteAdminForm() {
  const dealingWithCompanySubmission = async () => {
    try {
      await axios.post("/api/company-registration");
      toast.success("Company data saved successfully");
    } catch (err) {
      toast.error("Company data not saved");
    }
  };
  
  return (
    <Button
      radius="full"
      fullWidth
      color="success"
      onClick={dealingWithCompanySubmission}
    >
      Submit
    </Button>
  );
}
