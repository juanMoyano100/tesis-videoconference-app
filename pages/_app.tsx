import { AuthProvider } from '@/contexts/AuthContext'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'


export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Head>
                <title>Videoconference App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </AuthProvider>
    )
}
