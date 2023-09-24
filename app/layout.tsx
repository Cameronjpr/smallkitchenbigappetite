import clsx from 'clsx'
import { dongle, inter } from './fonts'
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

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
          <Link className="text-5xl leading-none text-lime-700" href="/">
            Small Kitchen, Big Appetite
          </Link>
        </nav>
        <main className="pt-12 sm:pt-24 flex min-h-screen flex-col p-4 max-w-xl m-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
