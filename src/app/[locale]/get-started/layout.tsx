type LayoutProps = {
  children: React.ReactNode
}
export default function GetStartedLayout({ children }: LayoutProps) {
  return (
    <div className="relative bg-yellow-50 dark:bg-zinc-900 h-screen">
      <div className="z-20 relative h-full">{children}</div>
      <div className="bg-[url('/assets/chat-bg.svg')] z-0 absolute bg-contain top-0 left-0 bottom-0 right-0 opacity-30" />
    </div>
  )
}