import { notFound } from 'next/navigation'
import { GetPostByName } from '@/actions/posts-actions'
import ContentRead from '@/app/components/Lexical/ContentRead'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const {data} = await GetPostByName(params.slug)

  if (!data) {
    notFound()
  }

  return (
    <article className="prose prose-invert mx-auto">
      <h1>{data.title}</h1>
      <p className="text-muted-foreground">{data.createdAt.toLocaleString('es-CL', {year: 'numeric', month: 'long', day: "numeric", hour:"numeric", minute:'numeric'})}</p>
      <ContentRead editorStateJson={data.content}/>
    </article>
  )
}

