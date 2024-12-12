'use client'
import { loginAction } from '@/actions/auth-actions';
import { useTransition } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';

import { useRouter } from 'next/navigation'

export interface Values {
    email: string;
    password: string;
}


export default function LoginForm() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition();
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
                startTransition(async () => {
                    const response = await loginAction(values);
                    console.log(response)
                    setSubmitting(false)
                    if (response.error) {
                        console.log(response.error)
                    } else {
                        router.push("/dashboard")
                    }
                })
            }}
        >
            <Form className="bg-card p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
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
                    disabled={isPending}
                >
                    Sign In
                </button>
                <button
                    className="w-full mt-2 bg-secondary text-secondary-foreground p-2 rounded-md hover:bg-secondary/90 transition-colors"
                    onClick={() => { router.push("/auth/register") }}
                    type='button'
                >
                    Register
                </button>
            </Form>
        </Formik>
    )
} 