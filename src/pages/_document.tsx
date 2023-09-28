import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='hu'>
      <Head>
        <meta name='theme-color' content='#121212' />
        <meta name='title' content='Érettségi kereső' />
        <meta name='author' content='albert' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
