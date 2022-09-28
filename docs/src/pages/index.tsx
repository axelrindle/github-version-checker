import React from 'react'
import Layout from '@theme/Layout'
import HomepageFeatures from '../components/Home/Features'
import HomepageHeader from '../components/Home/Header'

export default function Home() {
    return (
        <Layout>
            <HomepageHeader />
            <HomepageFeatures />
        </Layout>
    )
}
