
import { GetSession } from '@/actions/get-session'

export default function Profile() {
  const session = GetSession()

  if (!session) {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Create a New Post</h1>
      
    </div>
  )
}

