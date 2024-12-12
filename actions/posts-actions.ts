'use server'
import {prisma} from "@/prisma"

export async function getPosts() {

    const posts = await prisma.post.findMany({
      include: { categories:true },
      orderBy: { createdAt: 'desc' },
    })
    return posts
  }

export async function addPost(data: {title:string; idCat: number, content: string, email: string}) {
  try{
    const idAuth = await prisma.user.findFirst({
      where:{
        email: data.email,
        role: 'admin'
      },
      select:{
        id: true
      }
    })
    if(idAuth){
      await prisma.post.create({
        data:{
          title: data.title,
          content: data.content,
          categoryId:data.idCat,
          authorId: idAuth.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      })
      return {success:true}
    }else{
      return {error: 'No se encuentra el usuario o no tiene los roles para realizar la acción'}
    }
    
  }catch(error){
    console.error('Error al agregar el post:', error);
  return { error: 'Error al realizar la consulta', details: error.message };
  }
}