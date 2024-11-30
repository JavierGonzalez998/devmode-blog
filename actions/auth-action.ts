"use server"

import { Values } from "@/app/auth/signin/page"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export const loginAction = async(values:Values) => {
    try {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        })
        return {success: true}
    } catch (error) {
        if(error instanceof AuthError){
            return { error: error.cause?.err?.message};
        }
        return {error: "error 500"}
    }
}