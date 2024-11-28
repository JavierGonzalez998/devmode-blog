import { notFound } from 'next/navigation'

const blogPosts = {
  "getting-started-with-nextjs": {
    title: "Getting Started with Next.js",
    content: "Next.js is a powerful React framework that makes it easy to build server-side rendered and statically generated web applications...",
    date: "2023-06-01"
  },
  "the-power-of-typescript": {
    title: "The Power of TypeScript",
    content: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It offers several advantages over traditional JavaScript...",
    date: "2023-06-05"
  },
  "mastering-react-hooks": {
    title: "Mastering React Hooks",
    content: "React Hooks are a powerful feature introduced in React 16.8. They allow you to use state and other React features without writing a class...",
    date: "2023-06-10"
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <article className="prose prose-invert mx-auto">
      <h1>{post.title}</h1>
      <p className="text-muted-foreground">{post.date}</p>
      <div>{post.content}</div>
    </article>
  )
}

