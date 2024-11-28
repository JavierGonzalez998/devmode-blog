import Link from 'next/link'

interface Category {
  name: string;
  slug: string;
}

const categories: Category[] = [
  { name: 'Web Development', slug: 'web-dev' },
  { name: 'Mobile Development', slug: 'mobile-dev' },
  { name: 'DevOps', slug: 'devops' },
  { name: 'Machine Learning', slug: 'ml' },
  { name: 'Data Science', slug: 'data-science' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 pr-4">
      <h2 className="text-xl font-bold mb-4 font-mono">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link 
              href={`/category/${category.slug}`}
              className="text-muted-foreground hover:text-foreground transition-colors font-mono"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

