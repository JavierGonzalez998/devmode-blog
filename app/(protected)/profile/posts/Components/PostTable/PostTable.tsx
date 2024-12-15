'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { usePostsStore } from "@/lib/zustand/providers/PostsStateProvider";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { useNotificationStore } from "@/lib/zustand/providers/NotificationStateProvider";
import ModalEdit from "../Hovers/Edit/EditPost";
import ModalDelete from "../Hovers/Delete/DeletePost";

export default function PostTable() {
  const {Posts, getAllPosts, setPostState} = usePostsStore((store) => store);
  const {showToast} = useNotificationStore((store) => store)
  const handleUpdatePost = async(id:number, state:boolean) => {
    const {error} = await setPostState(id, state)
    if(error){
      showToast(error, "error")
    }else{
      showToast(`El post ha sido ${state ? 'publicado': 'retirado'}!`, "success")
    }
  }

  useEffect(() => {
    getAllPosts()
    
  }, [getAllPosts])

  return (
    <Table>
      <TableCaption>Listado de los posts</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Titulo</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Creado en</TableHead>
          <TableHead>Actualizado en</TableHead>
          <TableHead>Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          Posts && Posts.map((post, index) => (
            <TableRow key={index}>
            <TableCell className="font-medium">{post.id}</TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell className="truncate max-w-32 overflow-hidden whitespace-nowrap">{post.description}</TableCell>
            <TableCell>{post.categories[0].name}</TableCell>
            <TableCell>
              <Badge variant={post.published ? "default": "secondary"}>{post.published? "Publicado": "No publicado"}</Badge>
            </TableCell>
            <TableCell>{post.createdAt.toLocaleString('es-CL', {year: 'numeric', month: 'long', day: "numeric", hour:"numeric", minute:'numeric'})}</TableCell>
            <TableCell>{post.updatedAt?.toLocaleString('es-CL', {year: 'numeric', month: 'long', day: "numeric", hour:"numeric", minute:'numeric'})}</TableCell>
            <TableCell className="flex justify-center items-center gap-3">
              {
                post.published ? <Button variant="secondary" onClick={() => handleUpdatePost(post.id, !post.published)}>Retirar</Button>: <Button variant="secondary" onClick={() => handleUpdatePost(post.id, !post.published)}>Publicar</Button>
              }
              <ModalEdit data={{id:post.id, title: post.title, description:post.description, idCat:post.categories[0].id, content: post.content}}/>
              <ModalDelete id={post.id} title={post.title} />
            </TableCell>
          </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}
