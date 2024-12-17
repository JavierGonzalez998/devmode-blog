
import { GetSession } from '@/actions/get-session'
import ProfileInfo from './components/profileInfo'

export default function Profile() {
  const session = GetSession()

  if (!session) {
    return null
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-center">Información de perfil</h1>
      <ProfileInfo/>
    </div>
  )
}

