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
import FormNewPost from "../../Forms/FormNewPost";

export default function ModalAdd() {
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
        <Button onClick={() => setOpen(true)}>Agregar nuevo post</Button>
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Añadir Post</DialogTitle>
              <DialogDescription>
                Para añadir un post, sólo debes llenar los siguientes campos
              </DialogDescription>
            </DialogHeader>
            <FormNewPost />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Agregar nuevo post</Button>
      <Drawer open={open} onOpenChange={() => setOpen(false)}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Añadir Post</DrawerTitle>
            <DrawerDescription>
              Para añadir un post, sólo debes llenar los siguientes campos
            </DrawerDescription>
          </DrawerHeader>
          <FormNewPost />
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


