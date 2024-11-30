export default function CategoryPage({ params }: { params: { slug: string } }) {
  const posts = blogPosts[params.slug] || []

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold capitalize">{params.slug.replace('-', ' ')} Posts</h1>
      {posts.map((post) => (
        <BlogCard key={post.slug} {...post} />
      ))}
      {posts.length === 0 && (
        <p className="text-muted-foreground">No posts found in this category.</p>
      )}
    </div>
  )
}

