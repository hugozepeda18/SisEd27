import Head from 'next/head'

import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function App({ 
    Component, 
    pageProps: { session, ...pageProps}
  }) {
  return (
    <>
      <Head>
        <title>SisEd 27</title>
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}
