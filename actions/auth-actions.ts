"use server"

import { Values } from "@/app/auth/login/components/LoginForm"
import {RegisterValues} from '@/app/auth/register/components/RegisterForm'; 
import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { prisma } from "@/prisma";
import bcrypt from 'bcryptjs'

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

export const RegisterAction = async(values: RegisterValues) => {
    try{
        const user = await prisma.user.findUnique({
            where:{
                email: values.email
            }
        });
        if (user){
            return{
                error: "User Alredy Exists"
            }
        }

        const password = await bcrypt.hash(values.password, 10)

        await prisma.user.create({
            data:{
                name: values.name,
                email: values.email,
                password,
                updatedAt: new Date().toISOString()
            }
        })

        return {success:true}
    }catch(error){
        if(error instanceof AuthError){
            return { error: error.cause?.err?.message};
        }
        return {error: error}        
    }

}