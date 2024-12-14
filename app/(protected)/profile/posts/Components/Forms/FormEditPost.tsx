"use client";
import { Formik, Field, FormikHelpers } from "formik";
import { useCategoryStore } from "@/lib/zustand/providers/CategoriesStateProvider";
import ContentInput from "@/app/components/Lexical/ContentInput";
import { GetSession } from "@/actions/get-session";
interface FormValues {
  title: string;
  content: string;
  category: string;
}
import { useNotificationStore } from "@/lib/zustand/providers/NotificationStateProvider";
import { usePostsStore } from "@/lib/zustand/providers/PostsStateProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
interface props{
  onClose: (v:boolean) => void;
  data: {
    id: number;
    title: string;
    idCat: number;
    content: string
  }
}

export default function FormEditPost({onClose, data}:props) {
  const {categories} = useCategoryStore((store) => store);
  const {editPost} = usePostsStore((posts) => posts)
  const {showToast} = useNotificationStore((store) => store)
  const [session, setSession] = useState<Session|null>(null)

  useEffect(()=> {
    const FetchSession = async() =>{
      const session = await GetSession()
      if(session){
        setSession(session)
      }
    }
    
    FetchSession()
  },[])


  return (
    <Formik
      initialValues={{
        title: data.title,
        content: data.content,
        category: data.idCat.toString()
      }}
      onSubmit={async(
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
      ) => {
        setSubmitting(false);
        console.log(values)
        if(session){
          const email = session.user.email ? session.user.email : ''
          const success = await editPost(data.id, {title: values.title, content: values.content, idCat: parseInt(values.category), email:email})
          if (success) {
            showToast("Post creado satisfactoriamente", "success")
            onClose(false)
          }
        }else{
          onClose(false)
        }
      
      }}
    >
       {({setFieldValue, handleSubmit, values }) => (
         <form onSubmit={handleSubmit} className="space-y-4 p-3 md:p-0">
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
          <label htmlFor="select" className="block text-sm font-medium text-muted-foreground mb-1">
            Categoría
          </label>
          <Select value={values.category} onValueChange={(value:string) => setFieldValue('category', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un Categoria" />
                  </SelectTrigger>
                <SelectContent>
                  {
                    categories &&(
                      categories.map((data, index) => (
                        <SelectItem value={data.id.toString()} key={index}>{data.name}</SelectItem>
                      ))
                    )
                  }
                </SelectContent>
              </Select>
         </div>
         <div className="w-full">
           <label
             htmlFor="content"
             className="block text-sm font-medium text-muted-foreground mb-1"
           >
             Content
           </label>
           <ContentInput content={data.content} id="content" name="content" onChange={(value:string) => setFieldValue('content', value)} />
         </div>
         <button
           type="submit"
           className="bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
         >
           Editar Post
         </button>
       </form>
       )}
    </Formik>
  );
}
