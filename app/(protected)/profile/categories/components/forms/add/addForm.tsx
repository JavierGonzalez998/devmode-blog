'use client'
import { Formik, Field, FormikHelpers } from "formik";

interface FormValues {
    title: string;
    description: string
  }
  import { useNotificationStore } from "@/lib/zustand/providers/NotificationStateProvider";
  interface props{
    onClose: (v:boolean) => void;
  }
  
  export default function FormNewCategory({onClose}:props) {
    const {showToast} = useNotificationStore((store) => store)
    return (
      <Formik
        initialValues={{
          title: "",
          description: "",
        }}
        onSubmit={async(
          values: FormValues,
          { setSubmitting }: FormikHelpers<FormValues>
        ) => {
          setSubmitting(false);
          console.log(values)
        }}
      >
         {({ setFieldValue, handleSubmit }) => (
           <form onSubmit={handleSubmit} className="space-y-4">
           <div>
             <label
               htmlFor="title"
               className="block text-sm font-medium text-muted-foreground mb-1"
             >
               Título
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
               htmlFor="description"
               className="block text-sm font-medium text-muted-foreground mb-1"
             >
               Descripción
             </label>
            <Field
            id="description"
            name="description"
            type="text"
            className="w-full p-2 border rounded-md bg-background text-foreground"
            />
           </div>
           <button
             type="submit"
             className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
           >
             Crear Categoría
           </button>
         </form>
         )}
      </Formik>
    );
  }
  