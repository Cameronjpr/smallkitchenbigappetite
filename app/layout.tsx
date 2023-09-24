import clsx from 'clsx'
import { dongle, inter } from './fonts'
import './globals.css'
import type { Metadata } from 'next'

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
        <nav className={clsx(dongle.className, 'p-4 bg-green-900')}>
          <a
            className="text-4xl leading-none text-green-50 no-underline"
            href="/"
          >
            Small Kitchen, Big Appetite
          </a>
        </nav>
        <main className="flex min-h-screen flex-col p-4 max-w-xl m-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
