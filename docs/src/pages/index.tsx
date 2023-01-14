import React from 'react'
// import Layout from '@theme/Layout'
import ErrorBoundary from '@docusaurus/ErrorBoundary'
import { PageMetadata } from '@docusaurus/theme-common'
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal'
import AnnouncementBar from '@theme/AnnouncementBar'
import ErrorPageContent from '@theme/ErrorPageContent'
import Footer from '@theme/Footer'
import LayoutProvider from '@theme/Layout/Provider'
import Navbar from '@theme/Navbar'
import SkipToContent from '@theme/SkipToContent'
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
