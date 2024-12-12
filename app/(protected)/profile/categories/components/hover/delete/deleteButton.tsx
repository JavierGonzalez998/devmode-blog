"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/lib/zustand/providers/CategoriesStateProvider";
import { useNotificationStore } from "@/lib/zustand/providers/NotificationStateProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { FaTrash } from "react-icons/fa";

interface props {
  title: string;
  id: number;
}

export default function ModalDelete({ id, title }: props) {
    const {deleteCategories} = useCategoryStore((store) => store)
    const {showToast} = useNotificationStore((store) => store)
  const [open, setOpen] = React.useState<boolean>(false);
  const [isDesktop, setIsDesktop] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Este código asegura que useMediaQuery sólo se evalúa en el cliente
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setIsDesktop(mediaQuery.matches);

    // Configura el estado inicial y añade el listener
    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    // Limpia el listener al desmontar el componente
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const HandleDelete = async() => {
    const success = await deleteCategories(id)
    if(success){
        showToast("Categoría eliminada satisfactoriamente", "success")
    }else{
        showToast("error al eliminar la categoria", "error")
    }
    setOpen(false)
  }

  if (isDesktop) {
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          <FaTrash />
          Eliminar
        </Button>
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Eliminar Categoria</DialogTitle>
              <DialogDescription>
                Desea eliminar la categoria: {title}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="destructive" onClick={() => HandleDelete()}>Eliminar</Button>
              <Button variant="outline">Cancelar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        <FaTrash />
        Eliminar
      </Button>
      <Drawer open={open} onOpenChange={() => setOpen(false)}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Eliminar Categoria</DrawerTitle>
            <DrawerDescription>
              Desea eliminar la categoria: {title}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-2">
            <Button variant="destructive">Eliminar</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
