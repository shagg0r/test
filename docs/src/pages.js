import findPages from /* preval */ 'docs/src/modules/utils/findPages';

const pages = [
  {
    pathname: '/getting-started',
    children: [
      { pathname: '/getting-started/installation' },
      { pathname: '/getting-started/usage' },
      { pathname: '/getting-started/example-projects' },
      { pathname: '/getting-started/page-layout-examples' },
      { pathname: '/getting-started/learn' },
      { pathname: '/getting-started/faq', title: 'FAQs' },
      { pathname: '/getting-started/supported-components' },
      { pathname: '/getting-started/supported-platforms' },
    ],
  },
  {
    pathname: '/components',
    children: [
      {
        pathname: '/components',
        subheader: '/components/layout',
        children: [
          { pathname: '/components/box' },
          { pathname: '/components/container' },
          { pathname: '/components/grid' },
          { pathname: '/components/grid-list' },
          { pathname: '/components/hidden' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/inputs',
        children: [
          { pathname: '/components/autocomplete' },
          { pathname: '/components/buttons' },
          { pathname: '/components/checkboxes' },
          { pathname: '/components/pickers' },
          { pathname: '/components/radio-buttons' },
          { pathname: '/components/selects' },
          { pathname: '/components/switches' },
          { pathname: '/components/text-fields' },
          { pathname: '/components/transfer-list' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/navigation',
        children: [
          { pathname: '/components/bottom-navigation' },
          { pathname: '/components/breadcrumbs' },
          { pathname: '/components/drawers' },
          { pathname: '/components/links' },
          { pathname: '/components/menus' },
          { pathname: '/components/steppers' },
          { pathname: '/components/tabs' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/surfaces',
        children: [
          { pathname: '/components/app-bar' },
          { pathname: '/components/paper' },
          { pathname: '/components/cards' },
          { pathname: '/components/expansion-panels' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/feedback',
        children: [
          { pathname: '/components/progress' },
          { pathname: '/components/dialogs' },
          { pathname: '/components/snackbars' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/data-display',
        children: [
          { pathname: '/components/avatars' },
          { pathname: '/components/badges' },
          { pathname: '/components/chips' },
          { pathname: '/components/dividers' },
          { pathname: '/components/icons' },
          { pathname: '/components/lists' },
          { pathname: '/components/tables' },
          { pathname: '/components/tooltips' },
          { pathname: '/components/typography' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/utils',
        children: [
          { pathname: '/components/click-away-listener' },
          { pathname: '/components/css-baseline', title: 'CSS Baseline' },
          { pathname: '/components/modal' },
          { pathname: '/components/no-ssr', title: 'No SSR' },
          { pathname: '/components/popover' },
          { pathname: '/components/popper' },
          { pathname: '/components/portal' },
          { pathname: '/components/transitions' },
          { pathname: '/components/use-media-query', title: 'useMediaQuery' },
        ],
      },
      {
        pathname: '/components',
        subheader: '/components/lab',
        children: [
          { pathname: '/components/about-the-lab' },
          { pathname: '/components/slider' },
          { pathname: '/components/speed-dial' },
          { pathname: '/components/toggle-button' },
        ],
      },
    ],
  },
  { title: 'Component API', ...findPages[0] },
  {
    pathname: '/styles',
    children: [
      { pathname: '/styles/basics' },
      { pathname: '/styles/advanced' },
      { pathname: '/styles/api', title: 'API' },
    ],
  },
  {
    pathname: '/system',
    children: [
      { pathname: '/system/basics' },
      { pathname: '/system/borders' },
      { pathname: '/system/display' },
      { pathname: '/system/flexbox' },
      { pathname: '/system/palette' },
      { pathname: '/system/positions' },
      { pathname: '/system/shadows' },
      { pathname: '/system/sizing' },
      { pathname: '/system/spacing' },
      { pathname: '/system/typography' },
      { pathname: '/system/api', title: 'API' },
    ],
  },
  {
    pathname: '/customization',
    children: [
      {
        pathname: '/customization',
        subheader: '/customization/theme',
        children: [
          { pathname: '/customization/themes', title: 'Overview' },
          { pathname: '/customization/palette' },
          { pathname: '/customization/typography' },
          { pathname: '/customization/spacing' },
          { pathname: '/customization/breakpoints' },
          { pathname: '/customization/z-index', title: 'z-index' },
          { pathname: '/customization/globals' },
        ],
      },
      { pathname: '/customization/components' },
      { pathname: '/customization/color' },
      { pathname: '/customization/default-theme', title: 'Default Theme' },
    ],
  },
  {
    pathname: '/guides',
    children: [
      { pathname: '/guides/api', title: 'API Design Approach' },
      { pathname: '/guides/typescript', title: 'TypeScript' },
      { pathname: '/guides/interoperability', title: 'Style Library Interoperability' },
      { pathname: '/guides/minimizing-bundle-size' },
      { pathname: '/guides/composition' },
      { pathname: '/guides/server-rendering' },
      { pathname: '/guides/responsive-ui', title: 'Responsive UI' },
      { pathname: '/guides/migration-v3', title: 'Migration From v3 to v4' },
      { pathname: '/guides/migration-v0x', title: 'Migration From v0.x to v1' },
      { pathname: '/guides/testing' },
      { pathname: '/guides/right-to-left', title: 'Right-to-left' },
      { pathname: '/guides/flow' },
    ],
  },
  {
    pathname: 'https://themes.material-ui.com/',
    title: 'Premium Themes',
  },
  {
    pathname: '/discover-more',
    children: [
      { pathname: '/discover-more/showcase' },
      { pathname: '/discover-more/related-projects' },
      { pathname: '/discover-more/roadmap' },
      { pathname: '/discover-more/backers', title: 'Sponsors & Backers' },
      { pathname: '/discover-more/vision' },
      { pathname: '/discover-more/team' },
      { pathname: '/discover-more/community' },
      { pathname: '/discover-more/changelog' },
      { pathname: '/discover-more/languages' },
      { pathname: '/discover-more/governance' },
    ],
  },
  {
    pathname: '/blog',
    children: [
      { pathname: '/blog/may-2019-update' },
      {
        pathname: '/blog/material-ui-v4-is-out',
        title: 'Material-UI v4 is out',
      },
      { pathname: '/blog/april-2019-update' },
      { pathname: '/blog/march-2019-update' },
      { pathname: '/blog/2019-developer-survey-results' },
    ],
  },
  { pathname: '/versions', displayNav: false },
  { pathname: '/', displayNav: false, title: false },
];

export default pages;
