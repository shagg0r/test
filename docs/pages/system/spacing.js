import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';

const pageFilename = 'system/spacing';
const requireDemo = require.context('docs/src/pages/system/spacing', false, /\.(js|tsx)$/);
const requireRaw = require.context(
  '!raw-loader!../../src/pages/system/spacing',
  false,
  /\.(js|md|tsx)$/,
);

export default function Page({ demos, docs }) {
  return (
    <MarkdownDocs
      demos={demos}
      docs={docs}
      pageFilename={pageFilename}
      requireRaw={requireRaw}
      requireDemo={requireDemo}
    />
  );
}

Page.getInitialProps = () => {
  const { demos, docs } = prepareMarkdown({ pageFilename, requireRaw });
  return { demos, docs };
};
