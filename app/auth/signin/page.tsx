'use client'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation'
import { loginAction } from '@/actions/auth-action';


export interface Values {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter()

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={async (values: Values, {setSubmitting}: FormikHelpers<Values>) => {
          await loginAction(values);
          setSubmitting(false)
        }}
      >
        <Form className="bg-card p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
              Email
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border rounded-md bg-background text-foreground"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">
              Password
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border rounded-md bg-background text-foreground"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </Form>
      </Formik>
    </div>
  )
}

