"use client";
import {
  safetyInRetirementOptionsArray,
  typeOfRetirementOptionsArray,
} from "@/lib/db/schema/roleBased";
import { CalculatorSchema } from "@/lib/validators/calculator";
import { ButtonWithShootingStarBorder } from "@/components/ButtonWithShootingStarBorder";

import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Spinner, Tooltip } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { safeParse } from "valibot";
import {  CheckCheck, XCircle, Download, IndianRupee } from "lucide-react";

export default function ReitrementCalculator() {
  const initialData = {
    salary: "",
    workExperience: "",
    age: "",
    goalRetirementAge: "",
    safetyInRetirement: undefined,
    typeOfRetirement: undefined,
    phone: "",
    totalValuationOfCurrentAssets: "",
    numberOfDependantPeople: "",
  };
  const [formData, setFormData] = useState(initialData);
  const [saveDataOrNot, setSaveDataOrNot] = useState(false);
  const [
    loadingForRetirementFormSubmission,
    setloadingForRetirementFormSubmission,
  ] = useState(false);
  const [
    wasThereAnApiResponseInCurrentSession,
    setWasThereAnApiResponseInCurrentSession,
  ] = useState("false");
  const [apiResponse, setApiResponse] = useState({
    investment: "",
    returns: "",
    time: "",
    plan: "",
  });
  useEffect(() => {
    setApiResponse({
      investment: localStorage.getItem("investment") || "",
      returns: localStorage.getItem("returns") || "",
      time: localStorage.getItem("time") || "",
      plan: localStorage.getItem("plan") || "",
    });
    setWasThereAnApiResponseInCurrentSession(
      sessionStorage.getItem("retirementCalculatorHit") || "false"
    );
  }, []);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleChange = (field: keyof typeof initialData, newValue: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: newValue }));
  };
  const checkingIfAPiResponseHasProperData = () => {
    if (
      apiResponse.investment &&
      apiResponse.plan &&
      apiResponse.returns &&
      apiResponse.time
    ) {
      return true;
    }
    return false;
  };
  const dealingWithOpeningModal = () => {
    if (checkingIfAPiResponseHasProperData()) {
      onOpen();
    }
  };
  const resetForm = () => {
    setFormData(initialData);
  };
  const dealingWithPlanDownload = () => {
    const data = new Blob([apiResponse.plan], {
      type: "text/plain",
    });
    const csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", "retirement-plan.txt");
    tempLink.click();
  };
  const handlingCalculatorFormSubmission = async (
    saveDataOrNot: boolean = false
  ) => {
    const isFormDataValid = safeParse(CalculatorSchema, formData);
    if (!isFormDataValid.success) {
      toast.error("Please enter valid data");
      return;
    }

    try {
      setloadingForRetirementFormSubmission(true);
      const SavingToDbPromise = axios.post("/api/retirement-calculator", {
        ...formData,
        saveToProfile: saveDataOrNot,
      });
      const MLPromise = axios.get(
        "https://tiaa.innomer.repl.co/retirement-calculator",
        {
          params: {
            ...formData,
            inflation_rate: 4.7,
            current_age: formData.age,
            currentNetWorth: formData.totalValuationOfCurrentAssets,
            noOfDependents: formData.numberOfDependantPeople,
          },
        }
      );

      if (saveDataOrNot) {
        const LoadingToastForSavingToDbPromise = toast.loading(
          "Please wait saving your data..."
        );
        SavingToDbPromise.then((SavingToDbResponse) => {
          if (SavingToDbResponse.data.success) {
            toast.success("Data submitted successfully");
          } else {
            toast.error("Error saving data");
          }
        })
          .catch((error) => {
            toast.error("Unexpected error saving data");
          })
          .finally(() => {
            toast.dismiss(LoadingToastForSavingToDbPromise);
          });

        const loadingToastForMLPromise = toast.loading(
          "Please wait calculating your plan..."
        );
        MLPromise.then((MLResponse) => {
          if (MLResponse.status === 200) {
            setApiResponse(MLResponse.data);
            toast.success("Ideal retirement plan calculated");
            localStorage.setItem("investment", MLResponse.data.investment);
            localStorage.setItem("returns", MLResponse.data.returns);
            localStorage.setItem("time", MLResponse.data.time);
            localStorage.setItem("plan", MLResponse.data.plan);
            sessionStorage.setItem("retirementCalculatorHit", "true");
            onOpen();
          }
        })
          .catch((error) => {
            toast.error("Unexpected error calculating plan");
          })
          .finally(() => {
            toast.dismiss(loadingToastForMLPromise);
          });
      }

      if (!saveDataOrNot) {
        const loadingToastForMLPromise = toast.loading(
          "Please wait calculating your plan..."
        );
        try {
          const MLResponse = await MLPromise;
          setApiResponse(MLResponse.data);
          toast.success("Ideal retirement plan calculated");
          localStorage.setItem("investment", MLResponse.data.investment);
          localStorage.setItem("returns", MLResponse.data.returns);
          localStorage.setItem("time", MLResponse.data.time);
          localStorage.setItem("plan", MLResponse.data.plan);
          sessionStorage.setItem("retirementCalculatorHit", "true");
          onOpen();
        } catch (err) {
          toast.error("Unexpected error calculating plan");
        } finally {
          toast.dismiss(loadingToastForMLPromise);
        }
      }

      setWasThereAnApiResponseInCurrentSession("true");
    } catch (err) {
      toast.error("Error submitting data");
    } finally {
      setloadingForRetirementFormSubmission(false);
      setSaveDataOrNot(false);
    }
  };

  return (
    <>
      <div className="w-full flex overflow-hidden">
        <section className="px-4 py-12 mx-auto max-w-lg mt-28 md:max-w-xl lg:max-w-7xl md:px-12 lg:px-24 lg:py-24">
          <div className="justify-center relative p-14 pt-0 overflow-hidden rounded-3xl border border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-950 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.7)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat shadow-2xl dark:shadow-zinc-900 hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
            <div className="pt-8 pb-4 flex justify-between">
              <Tooltip content="Clear" showArrow color="danger">
                <XCircle className="cursor-pointer" onClick={resetForm} />
              </Tooltip>
              {(wasThereAnApiResponseInCurrentSession ||
                loadingForRetirementFormSubmission ||
                checkingIfAPiResponseHasProperData()) && (
                <Tooltip
                  content={`${
                    wasThereAnApiResponseInCurrentSession === "true"
                      ? "Plan suggested"
                      : "Previously suggested plan"
                  }`}
                >
                  <div>
                    <ButtonWithShootingStarBorder
                      onClick={dealingWithOpeningModal}
                      ButtonInnerContent={
                        !loadingForRetirementFormSubmission ? (
                          <CheckCheck />
                        ) : (
                          <Spinner size="sm" />
                        )
                      }
                    />
                  </div>
                </Tooltip>
              )}
            </div>
            <div>
              <h1 className="text-5xl text-center align-middle mb-5 dark:from-[#00b7fa] dark:to-[#01cfea] from-[#5EA2EF] to-[#0072F5] bg-clip-text text-transparent bg-gradient-to-b selection:text-foreground">
                Enter your data
              </h1>
              <p className="text-lg text-center dark:text-zinc-400 text-zinc-500 mb-5">
                Dont worry! Your data is safe with us and wont be sold ❤️
              </p>
            </div>
            <div className="mt-10 md:mt-0 grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <Input
                required
                endContent={<IndianRupee />}
                type="number"
                label="Salary in lpa"
                value={formData.salary}
                onChange={(e) => handleChange("salary", e.target.value)}
              />
              <Input
                required
                type="number"
                label="Work Experience"
                value={formData.workExperience}
                onChange={(e) => handleChange("workExperience", e.target.value)}
              />
              <Input
                required
                type="number"
                label="Age"
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
              />
              <Input
                required
                type="number"
                label="Goal Retirement Age"
                value={formData.goalRetirementAge}
                onChange={(e) =>
                  handleChange("goalRetirementAge", e.target.value)
                }
              />
              <Select
                required
                label="Safety in Retirement"
                value={formData.safetyInRetirement}
                onChange={(e) =>
                  handleChange("safetyInRetirement", e.target.value)
                }
              >
                {safetyInRetirementOptionsArray.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
              <Select
                required
                label="Type of Retirement"
                value={formData.typeOfRetirement}
                onChange={(e) =>
                  handleChange("typeOfRetirement", e.target.value)
                }
              >
                {typeOfRetirementOptionsArray.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type="number"
                label="Number of Dependants"
                value={formData.numberOfDependantPeople}
                onChange={(e) =>
                  handleChange("numberOfDependantPeople", e.target.value)
                }
              />
              <Input
                endContent={<IndianRupee />}
                type="number"
                label="Total Asset Value"
                value={formData.totalValuationOfCurrentAssets}
                onChange={(e) =>
                  handleChange("totalValuationOfCurrentAssets", e.target.value)
                }
              />
            </div>
            <ButtonGroup radius="full" fullWidth color="success">
              <Button
                type="submit"
                title="This will help group you into forums with like minded people."
                className="border-r-1"
                isLoading={saveDataOrNot && loadingForRetirementFormSubmission}
                onClick={() => {
                  setSaveDataOrNot((prev) => true);
                  handlingCalculatorFormSubmission(true);
                }}
              >
                Save and get plan
              </Button>
              <Button
                isLoading={!saveDataOrNot && loadingForRetirementFormSubmission}
                type="submit"
                title="This will give you results without saving your data."
                onClick={() => handlingCalculatorFormSubmission()}
              >
                Get plan
              </Button>
            </ButtonGroup>
          </div>
        </section>
      </div>
      <Modal
        size="lg"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 mt-4 text-2xl md:text-3xl lg:text-4xl leading-7 font-mono from-[#FFD700] to-[#FFB457] bg-clip-text text-transparent bg-gradient-to-b selection:text-foreground">
                Your epic retirement plan is now one step closer!
              </ModalHeader>
              <ModalBody>
                <h1 className="text-1xl md:text-2xl lg:text-3xl leading-7">
                  {"Investment needed: ₹" + apiResponse.investment}
                </h1>
                <h1 className="text-1xl md:text-2xl lg:text-3xl leading-7">
                  {"Return expected: ₹" + apiResponse.returns}
                </h1>
                <h2 className="text-1xl md:text-2xl lg:text-3xl leading-7">
                  {"Years: " + apiResponse.time}
                </h2>
                <h3 className="text-md md:text-lg lg:text-xl leading-7 text-center">
                  {"Detailed Plan: "}
                  <br />
                  {apiResponse.plan}
                </h3>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" onPress={dealingWithPlanDownload}>
                  Download <Download />
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
