import BlogCard from "@/app/components/blog-card"
import { getCategoryByName } from "@/actions/categories-actions";
import { getPostByCategoryId } from "@/actions/posts-actions";
export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const {slug} = await params;
  const {category} = await getCategoryByName(slug)
  const {posts} = await getPostByCategoryId(category ? category.id : 0)
  
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold capitalize">{params.slug.replace('-', ' ')} Posts</h1>
      {
        posts && posts.length > 0 ?  posts.map((post) => (
          <BlogCard key={post.id} category={category? category.name: ''} title={post.title} excerpt={post.description.substring(0, 90) + "..."} date={post.createdAt.toDateString()} />
        ))
        :<p className="text-muted-foreground">No posts found in this category.</p>
      }
    </div>
  )
}

