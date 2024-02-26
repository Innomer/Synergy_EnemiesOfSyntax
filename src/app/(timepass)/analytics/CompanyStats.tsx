"use client";
import { ButtonGroup, Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { BarChart } from "./Charts";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import { type SelectCompany } from "@/lib/db/schema/company";

export const dynamic = "force-dynamic";

export default function CompanyStats() {
  const typesOfRevenueArray = [
    {
      title: "Total Revenue",
      value: "totalRevenue",
    },
    {
      title: "Revenue From Us",
      value: "revenueFromUs",
    },
    {
      title: "Previous Revenue",
      value: "previousRevenue",
    },
  ];
  const [typeOfRevenue, setTypeOfRevenue] = useState({
    title: "Total Revenue",
    value: "totalRevenue",
  });
  const [companyData, setCompanyData] = useState<SelectCompany[]>();
  const [loadingForCompanyData, setLoadingForCompanyData] = useState(true);
  type CompanyData = {
    totalRevenue: [
      {
        time: string;
        total_revenue: string;
      }
    ];
    revenueFromUs: [
      {
        time: string;
        revenue_from_us: string;
      }
    ];
    stockPrice: [
      {
        time: string;
        stock_price: string;
      }
    ];
    numberOfRetirementPlans: [
      {
        time: string;
        number_of_retiremnt_plans: string;
      }
    ];
    id: number;
    name: string;
    description: string;
    logo: string | null;
    website: string;
    address: string;
    phone: string;
    email: string;
  };

  useEffect(() => {
    async function getData() {
      try {
        setLoadingForCompanyData(true);
        const { data } = await axios.get("/api/get-company-data");
        const finalData = data.data as SelectCompany[];
        const temp = finalData.map((company) => {
          //convert string to array of objects for revenueFromUs, StockPrice, totalRevenue, numberOfRetirementPlans
          const revenueFromUs = JSON.parse(
            company.revenueFromUs as string
          ) as CompanyData["revenueFromUs"];
          const stockPrice = JSON.parse(
            company.stockPrice as string
          ) as CompanyData["stockPrice"];
          const totalRevenue = JSON.parse(
            company.totalRevenue as string
          ) as CompanyData["totalRevenue"];
          const numberOfRetirementPlans = JSON.parse(
            company.numberOfRetirementPlans as string
          ) as CompanyData["numberOfRetirementPlans"];
          return {
            ...company,
            revenueFromUs,
            stockPrice,
            totalRevenue,
            numberOfRetirementPlans,
          };
        });
        setCompanyData(finalData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingForCompanyData(false);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    console.log(companyData);
  }, [companyData]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex lg:flex-row flex-col px-6 justify-center">
        <div className="flex flex-col text-center my-auto min-w-[40%] ">
          <h1 className="text-xl sm:text-2xl md:text-3xl mr-16">
            Here&apos;s how our ML models help
          </h1>
          <h1 className="text-xl sm:text-2xl md:text-3xl  mr-16">
            various companies{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-b selection:text-foreground from-[#6FEE8D] to-[#0e7139] ">
              grow
            </span>
          </h1>
          <p className="block text-lg sm:text-xl md:text-2xl my-auto mr-16 text-zinc-500">
            Utilise our services to take your company to the next level
          </p>
        </div>
        <div className="flex flex-col min-w-[50%]">
          <ButtonGroup size="md">
            {typesOfRevenueArray.map((type) => (
              <Button
                key={type.value}
                onClick={(e) => {
                  setTypeOfRevenue(type);
                }}
                color={
                  typeOfRevenue.value === type.value ? "success" : "default"
                }
              >
                {type.title}
              </Button>
            ))}
          </ButtonGroup>
          <div className="w-full">
            {loadingForCompanyData ? (
              <div className="w-full h-96 flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <BarChart typesOfRevenue={typeOfRevenue.value} />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row"></div>
    </div>
  );
}
