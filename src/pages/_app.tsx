import { Inter } from 'next/font/google'
import { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import Head from 'next/head'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Érettségi kereső</title>
      </Head>
      <NextUIProvider className={`${inter.variable} font-sans`}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
        >
          <Component {...pageProps} />
        </NextThemesProvider>
      </NextUIProvider>
    </>
  )
}
