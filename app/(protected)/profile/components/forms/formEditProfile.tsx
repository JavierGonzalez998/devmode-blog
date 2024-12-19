import { Formik, Field } from "formik";

export default function FormEditProfile(){
    return(
        <Formik
            initialValues={{
                name: '',
                email:'',
                password: '',
                confirmPassword: ''
                
            }}
            onSubmit={(values, {setSubmitting}) => {
                console.log(values);
                setSubmitting(false);
            }}
        >
            <form>
                <div>
                    <label htmlFor="name">Nombre</label>
                    <Field name="name" type="text" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" />
                </div>
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <Field name="password" type="password" />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <Field name="confirmPassword" type="password" />
                </div>
                <button type="submit">Guardar</button>
            </form>
        </Formik>
    )
}