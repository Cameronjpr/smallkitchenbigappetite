import clsx from 'clsx'
import { dongle, inter } from './fonts'
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@/components/ui/icon'

export const metadata: Metadata = {
  title: 'Small Kitchen, Big Appetite',
  description: 'A blog about food and cooking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className={clsx(dongle.className, 'p-4 text-center')}>
          <Link
            className="text-4xl sm:text-5xl leading-none text-lime-700"
            href="/"
          >
            Small Kitchen, Big Appetite
          </Link>
        </nav>
        <main className="py-12 sm:pt-24 flex min-h-screen flex-col p-4 max-w-xl m-auto">
          {children}
        </main>
        <footer className="flex flex-col items-center justify-center gap-4 pt-8 pb-4 bg-lime-800 text-lime-50">
          <Link href="https://instagram.com/smallkitchen.bigappetite">
            <Icon name="instagram" tint="white" />
          </Link>
        </footer>
      </body>
    </html>
  )
}
