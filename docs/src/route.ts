import FEATURE_TOGGLE from './featureToggle';

const ROUTES = {
  home: '/',
  productCore: '/core/',
  productAdvanced: '/x/',
  productTemplates: '/templates/',
  productDesignKits: '/design-kits/',
  careers: '/careers/',
  pricing: '/pricing/',
  about: '/about/',
  handbook: 'https://www.notion.so/mui-org/Handbook-f086d47e10794d5e839aef9dc67f324b',
  baseDocs: '/base/getting-started/installation/',
  materialDocs: '/material/getting-started/installation/',
  systemDocs: '/system/basics/',
  materialIcons: FEATURE_TOGGLE.enable_redirects
    ? '/material/material-icons/'
    : '/components/material-icons/',
  freeTemplates: FEATURE_TOGGLE.enable_redirects
    ? '/material/getting-started/templates/'
    : '/getting-started/templates/',
  components: FEATURE_TOGGLE.enable_redirects
    ? '/material/getting-started/supported-components/'
    : '/getting-started/supported-components/',
  customization: FEATURE_TOGGLE.enable_redirects
    ? '/material/customization/how-to-customize/'
    : '/customization/how-to-customize/',
  theming: FEATURE_TOGGLE.enable_redirects
    ? '/material/customization/theming/'
    : '/customization/theming/',
  documentation: FEATURE_TOGGLE.enable_redirects
    ? '/material/getting-started/installation/'
    : '/getting-started/installation/',
  communityHelp: FEATURE_TOGGLE.enable_redirects
    ? '/material/getting-started/support/#community-help-free'
    : '/getting-started/support/#community-help-free',
  blog: FEATURE_TOGGLE.enable_blog_index ? '/blog/' : 'https://medium.com/material-ui',
  showcase: FEATURE_TOGGLE.enable_redirects
    ? '/material/discover-more/showcase/'
    : '/discover-more/showcase',
  roadmap: 'https://github.com/mui-org/material-ui-x/projects/1',
  languages: FEATURE_TOGGLE.enable_redirects
    ? '/material/discover-more/languages/'
    : '/discover-more/languages',
  vision: FEATURE_TOGGLE.enable_redirects
    ? '/material/discover-more/vision/'
    : '/discover-more/vision/',
  support: FEATURE_TOGGLE.enable_redirects
    ? '/material/getting-started/support/#professional-support-premium'
    : '/getting-started/support/#professional-support-premium',
  goldSponsor: FEATURE_TOGGLE.enable_redirects
    ? '/material/discover-more/backers/#gold'
    : '/discover-more/backers/#gold/',
  store: 'https://mui.com/store/',
  dataGridDocs: FEATURE_TOGGLE.enable_redirects
    ? '/x/react-data-grid/getting-started/'
    : '/components/data-grid/getting-started/',
  dataGridFeatures: FEATURE_TOGGLE.enable_redirects
    ? '/x/react-data-grid/#features'
    : '/components/data-grid/#features',
  dataGridFeaturesComparison: FEATURE_TOGGLE.enable_redirects
    ? '/x/react-data-grid/getting-started/#feature-comparison'
    : '/components/data-grid/getting-started/#feature-comparison',
  storePopular: 'https://mui.com/store/#populars',
  storeDesign: 'https://mui.com/store/#design',
  storeFigma: 'https://mui.com/store/items/figma-react/',
  storeSketch: 'https://mui.com/store/items/sketch-react/',
  storeXD: 'https://mui.com/store/items/adobe-xd-react/',
  storeTemplateMaterialApp: 'https://mui.com/store/items/material-app/',
  storeTemplateBarza: 'https://mui.com/store/items/bazar-pro-react-ecommerce-template/',
  storeTemplateMinimalFree: 'https://mui.com/store/items/minimal-dashboard-free/',
  storeTemplateMinimalDashboard: 'https://mui.com/store/items/minimal-dashboard/',
  storeTemplateBerry: 'https://mui.com/store/items/berry-react-material-admin/',
  storeTemplateWebbee: 'https://mui.com/store/items/webbee-landing-page/',
  storeTheFront: 'https://mui.com/store/items/the-front-landing-page/',
  storeFlexy: 'https://mui.com/store/items/flexy-react-admin-dashboard/',
};

export default ROUTES;
