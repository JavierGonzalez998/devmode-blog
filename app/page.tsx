import { PrismaClient } from '@prisma/client'
import BlogCard from './components/blog-card'

const prisma = new PrismaClient()

async function getPosts() {

  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  })
  return posts
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Latest Posts</h1>
      {posts.map((post: any) => (
        <BlogCard
          key={post.id}
          title={post.title}
          excerpt={post.content.substring(0, 150) + '...'}
          date={post.createdAt.toDateString()}
          slug={post.id}
        />
      ))}
    </div>
  )
}

