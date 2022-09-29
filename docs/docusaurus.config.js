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
          editUrl: 'https://github.com/axelrindle/github-version-checker/tree/main/docs',
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
        },
    ],
    [
        '@docusaurus/plugin-content-docs',
        {
            id: 'upgrading',
            path: 'upgrading',
            routeBasePath: 'upgrading',
            sidebarPath: require.resolve('./sidebars.js'),
        },
    ],
    [
        '@docusaurus/plugin-content-docs',
        {
            id: 'changelog',
            path: 'changelog',
            routeBasePath: 'changelog',
            sidebarPath: require.resolve('./sidebars.js'),
            async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
                const sidebarItems = await defaultSidebarItemsGenerator(args);
                const result = sidebarItems.map((item) => {
                    if (item.type === 'category') {
                        return {...item, items: item.items.reverse()};
                    }
                    return item;
                });
                return result;
              },
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
            label: 'Upgrading',
            docsPluginId: 'upgrading',
          },
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Examples',
            docsPluginId: 'examples',
          },
          {
            type: 'doc',
            docId: 'index',
            position: 'left',
            label: 'Changelog',
            docsPluginId: 'changelog',
          },
          {
            href: 'https://github.com/axelrindle/github-version-checker',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://www.npmjs.com/package/github-version-checker',
            label: 'npm',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        logo: {
          alt: 'github-version-checker logo',
          src: 'img/logo.svg',
          href: '/',
          height: 32,
        },
        copyright: `Copyright © ${new Date().getFullYear()} Axel Rindle & Contributors. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
