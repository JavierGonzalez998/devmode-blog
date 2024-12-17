import BlogCard from "@/app/components/blog-card";
import { getPublishedPosts } from "@/actions/posts-actions";

export type Post = {
  categories: {
    id: number;
    name: string;
    description: string;
    slug: string;
  }[];
} & {
  id: number;
  title: string;
  description: string;
  content: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date | null;
};

export default async function Home() {
  const posts = await getPublishedPosts();

  return (
    <>
      <div className="m-5">
        <h1 className="text-2xl text-center">Bienvenidos a DevMode</h1>
        <p className="text-base font-semibold text-justify">
          Mi nombre es Javier González. Soy Web Developer Fullstack con 2 años
          de experiencia desarrollando soluciones informáticas.
        </p>
        <p className="text-base font-semibold text-justify">
          Este blog es para documentar mis avances en los diferentes proyectos
          que trabajaré por mi cuenta, espero que toda la información que
          comparta pueda ser de utilidad. ❤️
        </p>
      </div>
      <h3 className="text-4xl font-bold my-5">Latest Posts</h3>
      <div className="h-3/4 w-full flex flex-col justify-around items-center overflow-y-scroll">
        {posts.map((post: Post) => (
          <BlogCard
            key={post.id}
            category={post.categories[0].name}
            title={post.title}
            excerpt={post.description.substring(0, 90) + "..."}
            date={post.createdAt.toDateString()}
          />
        ))}
      </div>
    </>
  );
}
