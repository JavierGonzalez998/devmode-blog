"use server";
import { prisma } from "@/prisma";

export async function getPosts() {
  const posts = await prisma.post.findMany({
    include: { categories: true },
    orderBy: { createdAt: "desc" },
  });
  return posts;
}

export async function addPost(data: {
  title: string;
  idCat: number;
  content: string;
  email: string;
}) {
  // Validar entradas
  if (!data || typeof data !== "object") {
    throw new TypeError("El argumento 'data' debe ser un objeto válido.");
  }

  // Verificar campos requeridos
  if (!data.email || !data.title || !data.content || !data.idCat) {
    throw new Error("Faltan campos obligatorios en el objeto 'data'.");
  }

  // Procesar el contenido
  let content: string;
  try {
    content =
      typeof data.content === "string"
        ? data.content
        : JSON.stringify(data.content);
  } catch (error) {
    console.error("Error al procesar el contenido:", error);
    return { error: "El contenido no tiene un formato válido" };
  }

  // Validar usuario administrador
  const idAuth = await prisma.user.findFirst({
    where: {
      email: data.email,
      role: "admin",
    },
    select: {
      id: true,
    },
  });

  if (!idAuth) {
    return { error: "Usuario no autorizado para realizar esta acción" };
  }

  // Validar existencia de la categoría
  const categoryExists = await prisma.categories.findUnique({
    where: {
      id: data.idCat,
    },
  });

  if (!categoryExists) {
    return { error: "La categoría especificada no existe" };
  }
  console.log({
    title: data.title,
    content, // Guardar contenido procesado
    categories: {
      connect: { id: data.idCat },
    },
    author: {
      connect: { id: idAuth.id },
    },
    published: false,
  });
  // Crear el post
  const post = await prisma.post.create({
    data: {
      title: data.title,
      content, // Guardar contenido procesado
      categories: {
        connect: { id: data.idCat },
      },
      author: {
        connect: { id: idAuth.id },
      },
    },
  });
  console.log(post);
  return { success: true, post };
}


export async function SetPublish(id: number, state:boolean){
  try{
    const post = await prisma.post.update({
      where: {id},
      data: {published: state}
    })
    if(post){
      return {success: true}
    }
    return {error: "no se encontraron datos para actualizar, intente nuevamente"}
  }catch(error){
    console.log("error al realizar la operacion")
    return {error: "error al realizar la operacion"}
  }
}