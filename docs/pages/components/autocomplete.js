import * as React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import {
  demos,
  docs,
  demoComponents,
  resolveDemoImports,
} from 'docs/src/pages/components/autocomplete/autocomplete.md?@mui/markdown';

export default function Page() {
  return (
    <MarkdownDocs
      demos={demos}
      docs={docs}
      demoComponents={demoComponents}
      resolveDemoImports={resolveDemoImports}
    />
  );
}
