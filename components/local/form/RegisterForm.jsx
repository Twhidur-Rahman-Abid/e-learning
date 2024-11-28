"use client";
import AuthInputGroup from "./AuthInputGroup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import AuthForm from "./AuthForm";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

const RegisterFrom = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    // Register user
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      // login user
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
    } else {
      console.log("faild");
    }
  };

  return (
    <AuthForm
      title="Create an account"
      btnText="Register"
      onSubmit={onSubmit}
      form={form}
    >
      <AuthInputGroup
        label="Name"
        type="text"
        placeholder="Enter your name"
        form={form}
      />
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

export default RegisterFrom;
