import * as React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { SOURCE_CODE_ROOT_URL } from 'docs/src/modules/constants';
import Demo from 'docs/src/modules/components/Demo';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { exactProp } from '@material-ui/utils';
import ComponentLinkHeader from 'docs/src/modules/components/ComponentLinkHeader';

const markdownComponents = {
  'modules/components/ComponentLinkHeader.js': ComponentLinkHeader,
};
function MarkdownDocsBody(props) {
  const { rendered, headers, demos, requireDemo, disableAd } = props;
  const userLanguage = useSelector((state) => state.options.userLanguage);
  const t = useSelector((state) => state.options.t);

  return (
    <React.Fragment>
      {rendered.map((renderedMarkdownOrDemo, index) => {
        if (typeof renderedMarkdownOrDemo === 'string') {
          return <MarkdownElement key={index} renderedMarkdown={renderedMarkdownOrDemo} />;
        }

        if (renderedMarkdownOrDemo.component) {
          const Component = markdownComponents[renderedMarkdownOrDemo.component];
          return <Component key={index} headers={headers} options={renderedMarkdownOrDemo} />;
        }

        const name = renderedMarkdownOrDemo.demo;
        const demo = demos?.[name];
        if (demo === undefined) {
          const errorMessage = [
            `Missing demo: ${name}. You can use one of the following:`,
            Object.keys(demos),
          ].join('\n');

          if (userLanguage === 'en') {
            throw new Error(errorMessage);
          }

          if (process.env.NODE_ENV !== 'production') {
            console.error(errorMessage);
          }

          const warnIcon = (
            <span role="img" aria-label={t('emojiWarning')}>
              ⚠️
            </span>
          );
          return (
            <div key={index}>
              {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
              {warnIcon} Missing demo `{name}` {warnIcon}
            </div>
          );
        }

        return (
          <Demo
            key={index}
            demo={{
              raw: demo.raw,
              js: requireDemo(demo.module).default,
              rawTS: demo.rawTS,
              tsx: demo.moduleTS ? requireDemo(demo.moduleTS).default : null,
            }}
            disableAd={disableAd}
            demoOptions={renderedMarkdownOrDemo}
            githubLocation={`${SOURCE_CODE_ROOT_URL}/docs/src/${name}`}
          />
        );
      })}
    </React.Fragment>
  );
}

MarkdownDocsBody.propTypes = {
  demos: PropTypes.object.isRequired,
  disableAd: PropTypes.bool.isRequired,
  headers: PropTypes.object.isRequired,
  rendered: PropTypes.array.isRequired,
  requireDemo: PropTypes.func,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocsBody.propTypes = exactProp(MarkdownDocsBody.propTypes);
}

export default MarkdownDocsBody;
