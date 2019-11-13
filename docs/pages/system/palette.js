import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';

const req = require.context('docs/src/pages/system/palette', false, /\.(md|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../../src/pages/system/palette',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/system/palette';

export default function Page() {
  return <MarkdownDocs req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}
