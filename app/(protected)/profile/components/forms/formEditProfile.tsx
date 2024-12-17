import { Formik, Field } from "formik";

export default function FormEditProfile(){
    return(
        <Formik
            initialValues={{
                name: '',
                email:'',
                
            }}
        >
            <form>
                
            </form>
        </Formik>
    )
}