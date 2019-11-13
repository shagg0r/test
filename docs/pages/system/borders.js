import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/system/borders', false, /\.(md|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/system/borders',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/system/borders';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
