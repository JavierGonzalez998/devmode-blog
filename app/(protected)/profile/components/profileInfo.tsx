"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import FormEditProfile from "./forms/formEditProfile";
import { useSessionStore } from "@/lib/zustand/providers/SessionStateProvider";
export default function ProfileInfo() {
  const { session } = useSessionStore((store) => store);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  if (isEdit) {
    return (
      <>
        <div className="w-full flex items-center justify-end pr-10">
          <Button variant="secondary" onClick={() => setIsEdit(false)}>
            Visualizar Perfil
          </Button>
        </div>
        <section className="w-96">
          <FormEditProfile />
        </section>
      </>
    );
  }
  return (
    <>
      <div className="w-full flex items-center justify-end pr-10">
        <Button variant="secondary" onClick={() => setIsEdit(true)}>
          Editar Perfil
        </Button>
      </div>
      <section className="w-96">
        <div className="ml-10 w-full">
          <h5>Perfil: </h5>
        </div>
        <pre className="ml-16 mt-5">
          {JSON.stringify(
            {
              ...session?.user,
              image: session?.user.image + " (future feature)",
            },
            null,
            2
          )}
        </pre>
      </section>
    </>
  );
}
