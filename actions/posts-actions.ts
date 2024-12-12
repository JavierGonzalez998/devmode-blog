'use server'
import {prisma} from "@/prisma"

export async function getPosts() {

    const posts = await prisma.post.findMany({
      include: { categories:true },
      orderBy: { createdAt: 'desc' },
    })
    return posts
  }

export async function addPost(data: {title:string; idCat: number, content: string, idAuth: number}) {
  try{
    await prisma.post.create({
      data:{
        title: data.title,
        content: data.content,
        categoryId:data.idCat,
        authorId: data.idAuth
      }
    })

    return {success:true}
  }catch(error){

  }
}