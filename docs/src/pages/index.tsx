import React from 'react'
// import Layout from '@theme/Layout'
import clsx from 'clsx'
import ErrorBoundary from '@docusaurus/ErrorBoundary'
import { PageMetadata, ThemeClassNames } from '@docusaurus/theme-common'
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal'
import SkipToContent from '@theme/SkipToContent'
import AnnouncementBar from '@theme/AnnouncementBar'
import Navbar from '@theme/Navbar'
import Footer from '@theme/Footer'
import LayoutProvider from '@theme/Layout/Provider'
import ErrorPageContent from '@theme/ErrorPageContent'
import type { Props } from '@theme/Layout'
import HomepageHeader from '../components/Home/Header'

export default function Home() {
    useKeyboardNavigation()

    return (
        <LayoutProvider>
            <PageMetadata />

            <SkipToContent />

            <AnnouncementBar />

            <Navbar />

            <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
                <HomepageHeader />
            </ErrorBoundary>

            <Footer />
        </LayoutProvider>
    )
}
