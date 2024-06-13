import { Typing } from '@/components/typing'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { pixelatedFont } from '@/lib/font/google/pixelated-font'
import Image from 'next/image'

export const Tutors = () => {
  return (
    <Card className="bg-gradient-to-tr col-span-3 md:col-span-2  dark:from-zinc-920 dark:to-zinc-900">
      <div className="h-full md:bg-none bg-[url('/assets/svgs/layered-steps.svg')] w-full bg-repeat-y rounded-xl ">
        <CardHeader className="mb-2">
          <CardTitle className={`text-2xl font-medium ${pixelatedFont()}`}>
            Crie seu tutor AI ou use um existente
          </CardTitle>
          <CardDescription>
            O tutor AI é um modelo de aprendizado treinado para fornecer ensino
            e orientação.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <div className="basis-60 flex-basis group bg-gradient-to-tr hover:shadow-[inset_0_0px_30px_#7c3aed50] cursor-pointer hover:border-violet-500  from-zinc-900 to-zinc-800 rounded-lg border border-violet-600 flex-1 flex items-center justify-center relative">
            <Badge
              variant="recommended"
              className="absolute top-0 right-0 -translate-y-1/2 translate-x-2"
            >
              Recomendado
            </Badge>

            <div className="bg-[url('/assets/svgs/bg.svg')]">
              <div className="p-4">
                <p
                  className={`text-lg group-hover:animate-float group-hover:delay-700  ${pixelatedFont()}`}
                >
                  - Oi, eu sou o Ioua.
                </p>
                <p
                  className={`text-lg group-hover:animate-float group-hover:delay-500 ${pixelatedFont()}`}
                >
                  - Comigo você pode falar o que quiser.
                </p>
              </div>
              <Image
                src="/assets/imgs/tutor-ai-02.png"
                className="group-hover:animate-float mx-auto"
                width={300}
                height={200}
                alt="Tutor AI"
              />
            </div>
          </div>
          <div className="basis-60 bg-gradient-to-tr cursor-pointer hover:border-zinc-500/40  transition-all from-zinc-900 to-zinc-800 rounded-lg border border-zinc-800 flex-1 flex items-center justify-center">
            <div className="bg-[url('/assets/svgs/bg.svg')]">
              <div className="p-4">
                <p className={`text-lg ${pixelatedFont()} `}>
                  - Oi, eu sou a Luna.
                </p>
                <p className={`min-h-[56px] text-lg ${pixelatedFont()} `}>
                  <Typing
                    text="- Quer aprender a se comunicar em uma entrevista?"
                    startDelay={1000}
                  />
                </p>
              </div>
              <Image
                src="/assets/imgs/tutor-ai-01.png"
                width={300}
                height={200}
                className="mx-auto"
                alt="Tutor AI"
              />
            </div>
          </div>

          <div className="basis-60 bg-gradient-to-tr cursor-pointer hover:border-zinc-500/40  from-zinc-900 to-zinc-800 rounded-lg border border-zinc-800 flex-1 flex items-center justify-center">
            <div className="bg-[url('/assets/svgs/bg.svg')]">
              <div className="p-4">
                <p className={`text-lg ${pixelatedFont()}`}>
                  - Oi, eu sou o Ukki.
                </p>
                <p className={`min-h-[56px] text-lg ${pixelatedFont()}`}>
                  <Typing text="- Quer aprender a se comunicar em um restaurante?" />
                </p>
              </div>
              <Image
                src="/assets/imgs/tutor-ai-03.png"
                width={300}
                className="mx-auto"
                height={200}
                alt="Tutor AI"
              />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
