/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from '@/components/ui/button'

const Plans = () => {
  return (
    <section className="min-h-full w-full  bg-zinc-900 border border-zinc-800 p-4 rounded-xl  flex flex-wrap items-center justify-center">
      <div className="flex flex-wrap gap-2 [&>div]:flex-1 [&>div]:!basis-48">
        <div className="flex flex-col p-6 bg-zinc-800 shadow-lg rounded-lg dark:bg-zinc-850 justify-between ">
          <div>
            <h3 className="text-2xl font-bold text-center">Basic</h3>
            <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
              <span className="text-4xl font-bold">$29</span>/ month
            </div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                720p Video Rendering
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                2GB Cloud Storage
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                Basic Video Templates
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
        <div className="relative flex flex-col p-6 bg-zinc-800 shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500">
          <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Popular
          </div>
          <div>
            <h3 className="text-2xl font-bold text-center">Pro</h3>
            <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
              <span className="text-4xl font-bold">$59</span>/ month
            </div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <CheckIcon className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1" />
                1080p Video Rendering
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                10GB Cloud Storage
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                Premium Video Templates
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                Collaboration Tools
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
              Get Started
            </Button>
          </div>
        </div>
        <div className="flex flex-col p-6 bg-zinc-800 shadow-lg rounded-lg dark:bg-zinc-850 justify-between ">
          <div>
            <h3 className="text-2xl font-bold text-center">Enterprise</h3>
            <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
              <span className="text-4xl font-bold">$99</span>/ month
            </div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                4K Video Rendering
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                Unlimited Cloud Storage
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                Custom Video Templates
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                Advanced Collaboration Tools
              </li>
              <li className="flex items-center">
                <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                Dedicated Support
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <Button className="w-full">Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
export default Plans
