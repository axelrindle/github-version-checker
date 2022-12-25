// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'github-version-checker',
  tagline: '🔍 Simple version checker working with GitHub releases and the GitHub API.',
  url: 'https://axelrindle.github.io',
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
          sidebarPath: undefined,
          versions: {
            current: {
              label: '🔜 Next'
            }
          },
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            const result = sidebarItems.map((item) => {
                if (item.type === 'category' && item.customProps?.reverse) {
                    return {...item, items: item.items.reverse()};
                }
                return item;
            });
            return result;
          },
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
            id: 'changelog',
            path: 'changelog',
            routeBasePath: 'changelog',
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
            label: 'Changelog',
            docsPluginId: 'changelog',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
          },
          {
            href: 'https://github.com/axelrindle/github-version-checker',
            position: 'right',
            className: 'nav-icon-link nav-github-link',
            'aria-label': 'GitHub',
          },
          {
            href: 'https://www.npmjs.com/package/github-version-checker',
            position: 'right',
            className: 'nav-icon-link nav-npm-link',
            'aria-label': 'npm',
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
        copyright: `Copyright © ${new Date().getFullYear()} Axel Rindle & Contributors. Built with <a href="https://docusaurus.io/">Docusaurus</a>. Illustrations by <a href="https://undraw.co/">Katerina Limpitsouni</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
