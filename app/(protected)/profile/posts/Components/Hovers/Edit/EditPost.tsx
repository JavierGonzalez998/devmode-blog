"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import FormEditPost from "../../Forms/FormEditPost";

import { CiEdit } from "react-icons/ci";

interface props {
    data:{
        id:number;
        title:string;
        description: string;
        content:string;
        idCat: number;
    }
}

export default function ModalEdit({ data }: props) {
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

  if (isDesktop) {
    return (
      <>
        <Button color="secondary" onClick={() => setOpen(true)}>
          <CiEdit />
          Editar
        </Button>
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
          <DialogContent className="sm:max-w-6xl">
            <DialogHeader>
              <DialogTitle>Editar Categoria</DialogTitle>
              <DialogDescription>
                Para editar la categoría, sólo debes llenar los siguientes
                campos
              </DialogDescription>
            </DialogHeader>
            <FormEditPost data={data} onClose={() => setOpen(false)}></FormEditPost>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Button color="secondary" onClick={() => setOpen(true)}>
        <CiEdit />
        Editar
      </Button>
      <Drawer open={open} onOpenChange={() => setOpen(false)}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Editar Categoria</DrawerTitle>
            <DrawerDescription>
              Para editar la categoría, sólo debes llenar los siguientes campos
            </DrawerDescription>
          </DrawerHeader>
            <FormEditPost data={data} onClose={()=> setOpen(false)}/>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
