import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from '@/Providers'
import { SessionProvider } from "next-auth/react"


export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider>
            <Head>
                <title>Videoconference App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </SessionProvider>
    )
}
