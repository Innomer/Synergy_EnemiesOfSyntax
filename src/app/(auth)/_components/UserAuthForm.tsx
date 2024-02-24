"use client";
import Icons from "@/components/icons";
import { LoginSchema } from "@/lib/validators/register";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { safeParse } from "valibot";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

type UserAuthFormProps = {
  isSignup?: boolean;
};

export default function UserAuthForm({ isSignup }: UserAuthFormProps) {
  const router = useRouter();
  //now how do i get the email from the params using useSearchParams
  const searchParams = useSearchParams();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState(false);
  const [data, setData] = useState({
    email: searchParams.get("email") || "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginWithGoogle = async () => {
    setIsLoadingGoogle(true);
    try {
      const resp = await signIn("google", {
        redirect: false,
        callbackUrl: "/dashboard",
      });
      toast.success("Logged in successfully");
      router.push("/dashboard");
    } catch (err) {
      toast.error("Error logging in");
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const hangleLoginWithCredentials = async () => {
    const isFormDataValid = safeParse(LoginSchema, data);
    if (!isFormDataValid.success) {
      toast.error("Please enter valid credentials");
      return;
    }
    if (isSignup && data.password !== data.confirmPassword) {
      setPasswordError(true);
      return;
    } else if (isSignup) {
      setPasswordError(false);
    }

    try {
      setIsLoadingCredentials(true);

      if (isSignup) {
        const resp = await axios.post("/api/register", data);
        if (!resp) {
          toast.error("Server might be offline");
        } else if (resp.data.success) {
          toast.success("Signed up successfully");
          router.push("/login");
        } else if (resp.data.error === "User already exists") {
          toast.error("User already exists on this email");
        } else {
          toast.error("Unexpected error");
        }
      }

      if (!isSignup) {
        const resp = await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        if (resp?.ok) {
          toast.success("Logged in successfully");
          router.push("/dashboard");
        } else {
          if (resp?.error === "User not found") {
            toast.error("User not found! Please signup first");
            router.push(`/sign-up?email=${data.email}`);
          } else {
            toast.error("Invalid credentials");
          }
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Error logging in");
    } finally {
      setIsLoadingCredentials(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col place-items-center">
        <div className="flex flex-col gap-4">
          <Input
            type="email"
            label="Email"
            isClearable
            labelPlacement="inside"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            labelPlacement="inside"
            errorMessage={passwordError ? "Passwords do not match" : undefined}
            endContent={
              isPasswordVisible ? (
                <Eye
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="cursor-pointer animate-pulse text-danger"
                />
              ) : (
                <EyeOff
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="cursor-pointer"
                />
              )
            }
            type={isPasswordVisible ? "text" : "password"}
            label="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          {isSignup && (
            <Input
              labelPlacement="inside"
              endContent={
                isConfirmPasswordVisible ? (
                  <Eye
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    className="cursor-pointer animate-pulse text-danger"
                  />
                ) : (
                  <EyeOff
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    className="cursor-pointer"
                  />
                )
              }
              type={isConfirmPasswordVisible ? "text" : "password"}
              label="Confirm password"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />
          )}
          <Button
            type="submit"
            color="success"
            variant="solid"
            isLoading={isLoadingCredentials}
            onClick={hangleLoginWithCredentials}
          >
            Submit
          </Button>
        </div>
      </div>

      {/* <div className="flex justify-between px-4 mt-4">
        <p className="text-center text-sm ">New here?</p>
        <Link
          color="foreground"
          href="/signup"
          className="text-sm underline underline-offset-4"
        >
          Sign in
        </Link>
      </div> */}

      <div className="relative mx-24 md:mx-20 lg:mx-1 mt-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-stone-300 dark:bg-stone-900 px-2 ">
            continue with
          </span>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Button
          radius="full"
          className="w-[62%] bg-[#E4E4E7] dark:bg-[#3F3F46]"
          variant="flat"
          startContent={!isLoadingGoogle && <Icons.Google />}
          onClick={handleLoginWithGoogle}
          isLoading={isLoadingGoogle}
        >
          Google
        </Button>
      </div>
    </div>
  );
}
