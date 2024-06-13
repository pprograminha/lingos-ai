'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Locale, imagesSrc, langs } from '@/lib/intl/locales'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

export function SetLang() {
  const [open, setOpen] = React.useState(false)
  const t = useTranslations()

  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const router = useRouter()
  const pathname = usePathname()
  const value = useLocale()

  const langsValues = Object.entries(langs(t)).map(([value, label]) => ({
    value,
    label,
  }))

  const currentImageSrc = imagesSrc[value as Locale]

  const lang = langsValues.find((l) => l.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="px-2 py-0 gap-1 flex"
        >
          {lang && (
            <Image
              src={currentImageSrc}
              alt={lang.label}
              className="shrink-0"
              width={20}
              height={20}
            />
          )}
          <ChevronsUpDown className="h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full max-w-max p-0">
        <Command className="min-w-[200px]">
          <CommandInput placeholder={`${t('Search language')}...`} />
          <CommandEmpty>{t('No results found')}</CommandEmpty>
          <CommandList className="w-full">
            {langsValues.map((lang) => (
              <CommandItem
                key={lang.value}
                value={lang.value}
                onSelect={(locale) => {
                  router.replace(pathname, { locale: locale as Locale })

                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === lang.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <div className="flex gap-2">
                  <Image
                    src={imagesSrc[lang.value as Locale]}
                    alt={lang.label}
                    className="shrink-0"
                    width={20}
                    height={20}
                  />
                  {lang.label}
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
