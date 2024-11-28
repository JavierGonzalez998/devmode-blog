import BlogCard from './components/blog-card'

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js",
    date: "2023-06-01",
    slug: "getting-started-with-nextjs"
  },
  {
    title: "The Power of TypeScript",
    excerpt: "Discover why TypeScript is becoming the go-to language for web development",
    date: "2023-06-05",
    slug: "the-power-of-typescript"
  },
  {
    title: "Mastering React Hooks",
    excerpt: "Deep dive into React Hooks and how they can simplify your components",
    date: "2023-06-10",
    slug: "mastering-react-hooks"
  }
]

export default function Home() {
  return (
    <div className="space-y-8 pl-4">
      <h1 className="text-4xl font-bold">Latest Posts</h1>
      {blogPosts.map((post) => (
        <BlogCard key={post.slug} {...post} />
      ))}
    </div>
  )
}

