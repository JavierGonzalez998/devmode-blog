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
import { useCategoryStore } from "@/lib/zustand/providers/CategoriesStateProvider";
import { useEffect } from "react";
import ModalEdit from "../hover/edit/editButton";
import ModalDelete from "../hover/delete/deleteButton";

export default function CategoryTable() {
  const {categories, getCategories} = useCategoryStore((store) => store)

  useEffect(() => {
    getCategories()
    
  }, [getCategories])

  return (
    <Table>
      <TableCaption>Listado de las categorias</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead className="text-center">Acción</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          categories && categories.map((categories: {id:number; name: string; description: string;}, index) => (
            <TableRow key={index}>
            <TableCell className="font-medium">{categories.id}</TableCell>
            <TableCell>{categories.name}</TableCell>
            <TableCell>{categories.description}</TableCell>
            <TableCell className="flex justify-center items-center gap-3">
              <ModalEdit id={categories.id} title={categories.name} description={categories.description}/>
              <ModalDelete id={categories.id} title={categories.name}/>
            </TableCell>
          </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
}
