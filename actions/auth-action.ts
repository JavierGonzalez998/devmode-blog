"use server"

import { Values } from "@/app/auth/signin/page"
import { signIn } from "@/auth"

export const loginAction = async(values:Values) => {
    try {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        })
    } catch (error) {
        console.log(error)
    }
}