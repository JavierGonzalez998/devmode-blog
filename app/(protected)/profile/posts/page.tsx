import PostTable from "./Components/PostTable/PostTable";
import ModalAdd from "./Components/Hovers/Add/AddPost";
import { GetSession } from "@/actions/get-session";

export default async function PostsPage() {
  const session = await GetSession();
  return (
    <div className="size-full pt-5">
      <h2 className="text-2xl font-semibold text-center">Mis publicaciones</h2>
      {session && session.user.role === "admin" && (
        <div className="w-full flex justify-end my-5 pr-10">
          <ModalAdd />
        </div>
      )}
      <section>
        <PostTable/>
      </section>
    </div>
  );
}
