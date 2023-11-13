import Head from 'next/head'

import '@/styles/globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SisEd 27</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
