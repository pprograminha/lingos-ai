'use client'

import { Button } from '@/components/ui/button'
import { pixelatedFont } from '@/lib/font/google/pixelated-font'
import { useRouter } from '@/navigation'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Auth() {
  const router = useRouter()
  const { status } = useSession({
    required: false,
  })

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/rooms')
    }
  }, [status, router])

  async function googleAuthHandler() {
    await signIn('google')
  }

  return (
    <div className="h-screen rounded-lg relative border border-zinc-100 dark:border-zinc-700 bg-gradient-to-tr from-zinc-900 shadow-2xl shadow-zinc-600/10 dark:shadow-none flex items-center justify-center">
      <div className="p-8 py-12 sm:p-16 z-10 flex flex-col items-center">
        <div className="space-y-4 flex flex-col items-center">
          <Link href="/get-started">
            <Image
              src="/assets/panda.png"
              loading="lazy"
              width={320}
              height={213}
              className="w-30"
              alt="LingoAI logo"
            />
          </Link>
          <h2
            className={`${pixelatedFont()} mb-8 text-4xl font-bold text-zinc-800 dark:text-white`}
          >
            Sign in to unlock the best <br />
            of LingoAI.
          </h2>
        </div>
        <Button
          className="mt-5 w-full max-w-[400px]"
          onClick={googleAuthHandler}
          size="lg"
          variant="secondary"
        >
          <span className="w-full relative flex justify-center items-center gap-3 text-base font-medium text-zinc-600 dark:text-zinc-200">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              className="w-5"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            <span>Continue with Google</span>
          </span>
        </Button>
        <div className="mt-10 space-y-4 text-center text-zinc-600 dark:text-zinc-400 sm:-mb-8">
          <p className="text-xs">
            By proceeding, you agree to our{' '}
            <a href="#" className="underline">
              Terms of Use
            </a>{' '}
            and confirm you have read our
            <a href="#" className="underline">
              Privacy and Cookie Statement
            </a>
            .
          </p>
          <p className="text-xs">
            This site is protected by reCAPTCHA and the
            <a href="#" className="underline">
              Google Privacy Policy
            </a>{' '}
            and
            <a href="#" className="underline">
              Terms of Service
            </a>{' '}
            apply.
          </p>
        </div>
      </div>
      <div className="bg-[url('/assets/chat-bg.svg')] z-0 absolute bg-contain top-0 left-0 bottom-0 right-0 opacity-30" />
    </div>
  )
}