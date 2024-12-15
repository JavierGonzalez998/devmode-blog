import { notFound } from 'next/navigation'
import { GetPostByName } from '@/actions/posts-actions'
import ContentRead from '@/app/components/Lexical/ContentRead'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const {slug} = await params
  const {data} = await GetPostByName(slug)

  if (!data) {
    notFound()
  }

  return (
    <article className="h-screen w-full pt-5 overflow-y-scroll">
      <div className='w-full flex flex-col items-center justify-center'>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <p className="text-muted-foreground">Creado el: {data.createdAt.toLocaleString('es-CL', {year: 'numeric', month: 'long', day: "numeric", hour:"numeric", minute:'numeric'})}</p>
      </div>
      <ContentRead editorStateJson={data.content}/>
    </article>
  )
}

