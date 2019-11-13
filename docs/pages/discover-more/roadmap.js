import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/discover-more/roadmap', false, /\.(md|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/discover-more/roadmap',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/discover-more/roadmap';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
