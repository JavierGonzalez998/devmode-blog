import BlogCard from '../../components/blog-card'

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

interface BlogPosts {
  [key: string]: BlogPost[];
}

const blogPosts: BlogPosts = {
  'web-dev': [
    {
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js",
      date: "2023-06-01",
      slug: "getting-started-with-nextjs"
    },
    {
      title: "Mastering React Hooks",
      excerpt: "Deep dive into React Hooks and how they can simplify your components",
      date: "2023-06-10",
      slug: "mastering-react-hooks"
    }
  ],
  'mobile-dev': [
    {
      title: "Introduction to React Native",
      excerpt: "Build mobile apps using your React knowledge",
      date: "2023-06-15",
      slug: "introduction-to-react-native"
    }
  ],
  'devops': [
    {
      title: "Docker for Beginners",
      excerpt: "Learn how to containerize your applications with Docker",
      date: "2023-06-20",
      slug: "docker-for-beginners"
    }
  ],
  'ml': [
    {
      title: "Getting Started with TensorFlow",
      excerpt: "An introduction to machine learning with TensorFlow",
      date: "2023-06-25",
      slug: "getting-started-with-tensorflow"
    }
  ],
  'data-science': [
    {
      title: "Data Visualization with Python",
      excerpt: "Learn how to create stunning visualizations with Python",
      date: "2023-06-30",
      slug: "data-visualization-with-python"
    }
  ]
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const posts = blogPosts[params.slug] || []

  return (
    <div className="space-y-8 pl-4">
      <h1 className="text-4xl font-bold capitalize">{params.slug.replace('-', ' ')} Posts</h1>
      {posts.map(async (post) => (
        <BlogCard key={await post.slug} {...post} />
      ))}
      {posts.length === 0 && (
        <p className="text-muted-foreground">No posts found in this category.</p>
      )}
    </div>
  )
}

