import Link from 'next/link'

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  category: string
}

export default function BlogCard({ title, category, excerpt, date }: BlogCardProps) {
  return (
    <Link href={`/blog/${title.toLowerCase().replace(" ","-")}`} className="block w-4/5 md:w-3/5">
      <div className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className='text-sm my-2'>Categoria: {category}</p>
        <p className="text-muted-foreground mb-4">{excerpt}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </Link>
  )
}

