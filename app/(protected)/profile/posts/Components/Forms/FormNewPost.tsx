"use client";
import { Formik, Field, FormikHelpers } from "formik";
import ContentInput from "@/app/components/Lexical/ContentInput";
interface FormValues {
  title: string;
  content: string;
}

export default function FormNewPost() {
  return (
    <Formik
      initialValues={{
        title: "",
        content: "Hola",
      }}
      onSubmit={(
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
      ) => {
        setSubmitting(false);
        console.log(values)
        /* const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            content: values.content,
          }),
        });
        if (response.ok) {
          console.log("ok");
        } */
      }}
    >
        <form className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Title
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              className="w-full p-2 border rounded-md bg-background text-foreground"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Content
            </label>
            <ContentInput id="content" name="content" />
          </div>
          <button
            type="submit"
            className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Create Post
          </button>
        </form>
    </Formik>
  );
}
