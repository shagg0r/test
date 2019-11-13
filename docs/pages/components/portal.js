import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/components/portal', false, /\.(md|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/components/portal',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/components/portal';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
