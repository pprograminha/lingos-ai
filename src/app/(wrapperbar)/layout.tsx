import { getAuth } from '@/lib/auth/get-auth'
import Image from 'next/image'
import Link from 'next/link'
import { Channels } from '../components/channels'

export default async function WrapperBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = await getAuth()
  return (
    <main className="h-screen flex flex-row">
      <div className="bg-zinc-900 flex flex-col justify-between pb-2 md:pb-4 py-2 px-2">
        <Channels />
      </div>

      <div className="flex flex-col h-full w-full">
        <div className="bg-zinc-900 h-16 w-full flex justify-between items-center px-4">
          <Image
            src="/assets/logo.png"
            width={80}
            height={30}
            alt="LingoAI logo"
          />

          {user && (
            <Link
              href="/profile"
              className="flex flex-row-reverse items-center gap-2"
            >
              {user.image && (
                <Image
                  src={user.image}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt={user.fullName}
                />
              )}
              <div className="flex flex-col text-right">
                <span>{user.fullName}</span>
                <span className="text-xs text-zinc-600">Ver perfil</span>
              </div>
            </Link>
          )}
        </div>
        {children}
      </div>
    </main>
  )
}
