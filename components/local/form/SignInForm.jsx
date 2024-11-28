"use client";
import AuthInputGroup from "./AuthInputGroup";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthForm from "./AuthForm";
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const logindata = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (logindata?.error) {
      console.log(logindata?.error);
    } else {
      router.push("/");
    }
  };

  return (
    <AuthForm
      title="Login into your account"
      btnText="Login"
      onSubmit={onSubmit}
      form={form}
    >
      <AuthInputGroup
        label="Email"
        type="email"
        placeholder="Enter your email"
        form={form}
      />
      <AuthInputGroup
        label="Password"
        type="password"
        placeholder="****"
        form={form}
      />

      <p className="mt-4 pb-2">
        Are you new user?{" "}
        <Link className="text-blue-600" href="/register">
          register
        </Link>
      </p>
    </AuthForm>
  );
};

export default SignInForm;
