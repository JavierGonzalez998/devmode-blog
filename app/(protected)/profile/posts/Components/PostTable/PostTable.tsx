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


export default function PostTable() {
  const {Posts, getAllPosts} = usePostsStore((store) => store);

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
          <TableHead>Categoría</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-center">Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          Posts && Posts.map((categories, index) => (
            <TableRow key={index}>
            <TableCell className="font-medium">{categories.id}</TableCell>
            <TableCell>{categories.title}</TableCell>
            <TableCell>{categories.categories.name}</TableCell>
            <TableCell className="flex justify-center items-center gap-3">

            </TableCell>
          </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}
