import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { linkResolver, repositoryName } from '../prismicio'
import Link from 'next/link'
import NextProgress from 'next-progress'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NextProgress options={{ showSpinner: false }} color="#000000" />
            <PrismicProvider
                linkResolver={linkResolver}
                internalLinkComponent={({ href, children, ...props }) => (
                    <Link href={href}>
                        <a {...props}>{children}</a>
                    </Link>
                )}
            >
                <PrismicPreview repositoryName={repositoryName}>
                    <Component {...pageProps} />
                </PrismicPreview>
            </PrismicProvider>
        </>
    )
}

export default MyApp
