import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import clsx from 'clsx'
import React from 'react'
import styles from './header.module.css'
import Content from './Badges.mdx'

export default function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext()
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <h1 className="hero__title">{siteConfig.title}</h1>
                <p className="hero__subtitle">{siteConfig.tagline}</p>
                <Content />
                <div className={styles.buttons}>
                    <Link
                        className="button button--info button--outline button--lg"
                        to="/docs/">
                        Jump right in 🤸‍♂️
                    </Link>
                    <Link
                        className="button button--info button--outline button--lg"
                        to="/examples/">
                        tl;dr 👀
                    </Link>
                </div>
            </div>
        </header>
    )
}
