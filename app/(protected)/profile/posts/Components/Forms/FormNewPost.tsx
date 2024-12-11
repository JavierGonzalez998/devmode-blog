"use client";
import { Formik, Field, FormikHelpers } from "formik";
import ContentInput from "@/app/components/Lexical/ContentInput";
interface FormValues {
  title: string;
  content: string;
}
import { useNotificationStore } from "@/lib/zustand/providers/NotificationStateProvider";
interface props{
  onClose: (v:boolean) => void;
}

export default function FormNewPost({onClose}:props) {
  const {showToast} = useNotificationStore((store) => store)
  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
      }}
      onSubmit={async(
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
      ) => {
        setSubmitting(false);
        console.log(values)
        const response = await fetch("/api/posts", {
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
          showToast("Post creado satisfactoriamente", "success")
          onClose(false)
        }
      }}
    >
       {({ setFieldValue, handleSubmit }) => (
         <form onSubmit={handleSubmit} className="space-y-4">
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
           <ContentInput id="content" name="content" onChange={(value:string) => setFieldValue('content', value)} />
         </div>
         <button
           type="submit"
           className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
         >
           Create Post
         </button>
       </form>
       )}
    </Formik>
  );
}
