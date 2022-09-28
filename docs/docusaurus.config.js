// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'github-version-checker',
  tagline: '🔍 Simple version checker working with GitHub releases and the GitHub API.',
  url: 'https://axelrindle.github.io/',
  baseUrl: '/github-version-checker/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'axelrindle', // Usually your GitHub org/user name.
  projectName: 'github-version-checker', // Usually your repo name.
  deploymentBranch: 'main',
  trailingSlash: true,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
        '@cmfcmf/docusaurus-search-local',
        {
            indexBlog: false
        }
    ],
    [
        '@docusaurus/plugin-content-docs',
        {
            id: 'examples',
            path: 'examples',
            routeBasePath: 'examples',
            sidebarPath: require.resolve('./sidebars.js'),
            // ... other options
        },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'github-version-checker',
        logo: {
          alt: 'github-version-checker logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Examples',
            docsPluginId: 'examples'
          },
          {
            href: 'https://github.com/axelrindle/github-version-checker',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Axel Rindle & Contributors. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
