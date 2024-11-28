import Link from 'next/link'

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  slug: string
}

export default function BlogCard({ title, excerpt, date, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <div className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-4">{excerpt}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </Link>
  )
}

