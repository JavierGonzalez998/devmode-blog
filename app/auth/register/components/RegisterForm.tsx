"use client";
import { RegisterAction } from "@/actions/auth-actions";
import { useTransition } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";

import { useRouter } from "next/navigation";
export interface RegisterValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(
        values: RegisterValues,
        { setSubmitting }: FormikHelpers<RegisterValues>
      ) => {
        startTransition(async () => {
          const response = await RegisterAction(values);
          setSubmitting(false);
          if (response.error) {
            console.log(response.error);
          } else {
            router.push("/auth/login");
          }
        });
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-muted-foreground mb-1"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full p-2 border rounded-md bg-background text-foreground"
              />
            </div>
          </section>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
            disabled={isPending}
          >
            Register
          </button>
          <button
            className="w-full mt-2 bg-secondary text-secondary-foreground p-2 rounded-md hover:bg-secondary/90 transition-colors"
            onClick={() => {
              router.push("/auth/login");
            }}
            type="button"
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
}
