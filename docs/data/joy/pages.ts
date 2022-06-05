const pages = [
  {
    pathname: '/joy-ui/getting-started',
    scopePathnames: ['/joy-ui/core-features'],
    icon: 'DescriptionIcon',
    children: [
      { pathname: '/joy-ui/getting-started/overview' },
      { pathname: '/joy-ui/getting-started/usage' },
      { pathname: '/joy-ui/getting-started/tutorial' },
      { pathname: '/joy-ui/getting-started/templates' },
      {
        pathname: '/joy-ui/core-features',
        subheader: 'core-features',
        children: [
          { pathname: '/joy-ui/core-features/global-variant' },
          { pathname: '/joy-ui/core-features/automatic-adjustment' },
        ],
      },
    ],
  },
  {
    pathname: '/joy-ui/react-',
    title: 'Components',
    icon: 'ToggleOnIcon',
    children: [
      {
        pathname: '/joy-ui/components/inputs',
        subheader: 'inputs',
        children: [{ pathname: '/joy-ui/react-button' }, { pathname: '/joy-ui/react-slider' }],
      },
      {
        pathname: '/joy-ui/components/data-display',
        subheader: 'data-display',
        children: [
          { pathname: '/joy-ui/react-aspect-ratio' },
          { pathname: '/joy-ui/react-avatar' },
          { pathname: '/joy-ui/react-badge' },
          { pathname: '/joy-ui/react-chip' },
        ],
      },
      {
        pathname: '/joy-ui/components/surfaces',
        subheader: 'surfaces',
        children: [{ pathname: '/joy-ui/react-card' }],
      },
    ],
  },
];

export default pages;
