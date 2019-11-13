import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/components/transfer-list', false, /\.(md|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/components/transfer-list',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/components/transfer-list';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
