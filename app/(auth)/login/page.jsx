import Form from "@/components/local/form/Form";
import InputGroup from "@/components/local/form/InputGroup";
import SignInForm from "@/components/local/form/SignInForm";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    // <Form title="Login into your account" btnText="Login">
    //   <InputGroup
    //     label="Email"
    //     type="email"
    //     placeholder="Enter your email"
    //     // value={email}
    //     // onChange={(e) => setEmail(e.target.value)}
    //   />
    //   <InputGroup
    //     label="Password"
    //     type="password"
    //     placeholder="****"
    //     // value={password}
    //     // onChange={(e) => setPassword(e.target.value)}
    //   />

    //   <p className="mt-4 pb-2">
    //     Are you new user?{" "}
    //     <Link className="text-blue-600" href="/register">
    //       register
    //     </Link>
    //   </p>
    // </Form>
    <SignInForm />
  );
};

export default LoginPage;

// {error && <Error message={error} />}
