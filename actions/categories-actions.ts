'use server'
import {prisma} from  "@/prisma"

export async function getCategories() {
    const categories = await prisma.categories.findMany()
    return categories
  }

export async function addCategories(data: {title: string; description:string; slug:string}){
    try{
      await prisma.categories.create({
        data: {
          name: data.title,
          description: data.description,
          slug: data.slug
        }
      })
      return {success: true}
    }catch(error:any){
      return {error: "error 500"}
    }
}

export async function editCategories(id:number, data: {title:string, description:string, slug:string}){
  try{
    await prisma.categories.update({
      where:{
        id
      },
      data: {
        name: data.title,
        description: data.description,
        slug: data.slug
      }
    })
    return {success: true}
  }catch(error:any){
    console.log(error)
    return {error: "error 500"}
  }
}

export async function deleteCategories(id:number){
  try{
    await prisma.categories.delete({
      where:{
        id
      }
    })
    return {success: true}
  }catch(error:any){
    return {error: "error 500"}
  }
}