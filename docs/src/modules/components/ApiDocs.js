/* eslint-disable material-ui/no-hardcoded-labels, react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import marked from 'marked/lib/marked';
import { withStyles } from '@material-ui/core/styles';
import { exactProp } from '@material-ui/utils';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import Ad from 'docs/src/modules/components/Ad';
import AdManager from 'docs/src/modules/components/AdManager';
import AdGuest from 'docs/src/modules/components/AdGuest';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdowElement from 'docs/src/modules/components/MarkdownElement';
import { SOURCE_CODE_ROOT_URL } from 'docs/src/modules/constants';
import MarkdownDocsFooter from './MarkdownDocsFooter';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  container: {
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  ad: {
    '& .description': {
      marginBottom: 198,
    },
    '& .description.ad': {
      marginBottom: 40,
    },
  },
  toc: {
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 175px)',
    },
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 175px - 240px)',
    },
  },
});

function ApiDocs(props) {
  const { classes, disableAd = false, disableToc = false, pageContent } = props;
  const t = useSelector((state) => state.options.t);
  const userLanguage = useSelector((state) => state.options.userLanguage);
  const {
    classDescriptions,
    classConditions,
    demos,
    filename,
    forwardsRefTo,
    inheritance,
    name,
    propDescriptions,
    props: componentProps,
    spread,
    styles: componentStyles,
  } = pageContent;

  const description = t('apiDescription').replace(/{{name}}/, name);

  const source = filename
    .replace(
      /\/packages\/material-ui(-(.+?))?\/src/,
      (match, dash, pkg) => `@material-ui/${pkg || 'core'}`,
    )
    // convert things like `/Table/Table.js` to ``
    .replace(/\/([^/]+)\/\1\.js$/, '');

  const sections = [
    'import',
    componentStyles.name && 'component-name',
    'props',
    componentStyles.classes.length && 'css',
    'demos',
  ];

  const toc = [];
  sections.forEach((sectionName) => {
    if (sectionName) {
      toc.push({
        text: t(sectionName),
        hash: sectionName,
        children: [
          ...(sectionName === 'props' && inheritance
            ? [{ text: t('inheritance'), hash: 'inheritance', children: [] }]
            : []),
        ],
      });
    }
  });

  // The `ref` is forwarded to the root element.
  let refHint = t('refRootElement');
  if (forwardsRefTo == null) {
    // The component cannot hold a ref.
    refHint = t('refNotHeld');
  }

  let spreadHint = '';
  if (spread) {
    // Any other props supplied will be provided to the root element ({{spreadHintElement}}).
    spreadHint = t('spreadHint').replace(
      /{{spreadHintElement}}/,
      inheritance ? `[${inheritance.component}](${inheritance.pathname})` : t('nativeElement'),
    );
  }

  let inheritanceSuffix = '';
  if (inheritance && inheritance.component === 'Transition') {
    inheritanceSuffix = t('inheritanceSuffixTransition');
  }

  function dangerousMarkdown(md) {
    return <span dangerouslySetInnerHTML={{ __html: marked(md) }} />;
  }

  function heading(hash, level = 2) {
    return dangerousMarkdown(
      [
        `<h${level}>`,
        `<a class="anchor-link" id="${hash}"></a>`,
        t(hash),
        `<a class="anchor-link-style" aria-hidden="true" aria-label="anchor" href="#${hash}">`,
        '<svg><use xlink:href="#anchor-link-icon" /></svg>',
        '</a>',
        `</h${level}>`,
      ].join(''),
    );
  }

  return (
    <AppFrame>
      <AdManager>
        <Head title={`${name} API - Material-UI`} description={description} />
        {disableAd ? null : (
          <AdGuest>
            <Ad placement="body" />
          </AdGuest>
        )}
        <div
          className={clsx(classes.root, {
            [classes.ad]: !disableAd,
            [classes.toc]: !disableToc,
          })}
        >
          <AppContainer className={classes.container}>
            <MarkdowElement>
              <div className={classes.actions}>
                <EditPage markdownLocation={filename} />
              </div>
              <h1>{name} API</h1>
              <Typography variant="h5" component="div" gutterBottom>
                {description}
              </Typography>
              {heading('import')}
              <HighlightedCode
                code={`
import ${name} from '${source}/${name}';
// ${t('or')}
import { ${name} } from '${source}';`}
                language="jsx"
              />
              {dangerousMarkdown(t('apiImportDifference'))}
              {componentStyles.name && (
                <React.Fragment>
                  {heading('component-name')}
                  {dangerousMarkdown(
                    t('apiStyleOverrides').replace(/{{pageStyles\.name}}/, componentStyles.name),
                  )}
                </React.Fragment>
              )}
              {heading('props')}
              <table>
                <thead>
                  <tr>
                    <th align="left">{t('name')}</th>
                    <th align="left">{t('type')}</th>
                    <th align="left">{t('default')}</th>
                    <th align="left">{t('description')}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(componentProps).map(
                    ([propName, propData]) =>
                      propData.description !== '@ignore' && (
                        <tr key={propName}>
                          <td align="left">
                            <span
                              className={clsx('prop-name', propData.required ? 'required' : null)}
                            >
                              {propName}
                              {propData.required ? <sup>*</sup> : null}
                            </span>
                          </td>
                          <td align="left">
                            <span className="prop-type" dangerouslySetInnerHTML={{ __html: propData.type.description}} />
                          </td>
                          <td align="left">
                            <span className="prop-default">
                              {propData.jsdocDefaultValue && propData.jsdocDefaultValue.value}
                            </span>
                          </td>
                          <td
                            align="left"
                            dangerouslySetInnerHTML={{
                              __html: marked(propDescriptions[userLanguage][propName] || ''),
                            }}
                          />
                        </tr>
                      ),
                  )}
                </tbody>
              </table>
              <br />
              {refHint}
              <br />
              {dangerousMarkdown(spreadHint)}
              {inheritance && [
                heading('inheritance', 3),
                dangerousMarkdown(
                  t('inheritanceDescription')
                    .replace(/{{component}}/, inheritance.component)
                    .replace(/{{pathname}}/, inheritance.pathname)
                    .replace(/{{suffix}}/, inheritanceSuffix)
                    .replace(/{{componentName}}/, name),
                ),
              ]}
              {componentStyles.classes.length ? (
                <React.Fragment>
                  {heading('css')}
                  <table>
                    <thead>
                      <tr>
                        <th align="left">Rule name</th>
                        <th align="left">Global class</th>
                        <th align="left">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {componentStyles.classes.map((className, id) => (
                        <tr key={id}>
                          <td align="left">
                            <span className="prop-name">{className}</span>
                          </td>
                          <td align="left">
                            <span className="prop-name">
                              {componentStyles.globalClasses[className]}
                            </span>
                          </td>
                          <td
                            align="left"
                            dangerouslySetInnerHTML={{
                              __html:
                                classDescriptions[userLanguage][className] &&
                                marked(
                                  classDescriptions[userLanguage][className].replace(
                                    /{{conditions}}/,
                                    classConditions[userLanguage][className],
                                  ),
                                ),
                            }}
                          />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br />
                  {dangerousMarkdown(
                    t('overrideStyles').replace(/{{URL}}/, `${SOURCE_CODE_ROOT_URL}${filename}`),
                  )}
                </React.Fragment>
              ) : null}
              {heading('demos')}
              {dangerousMarkdown(demos)}
              <NoSsr>
                <MarkdownDocsFooter />
              </NoSsr>
            </MarkdowElement>
          </AppContainer>
        </div>
        {disableToc ? null : <AppTableOfContents items={toc} />}
      </AdManager>
      <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <symbol id="anchor-link-icon" viewBox="0 0 16 16">
          <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
        </symbol>
      </svg>
    </AppFrame>
  );
}

ApiDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  pageContent: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  ApiDocs.propTypes = exactProp(ApiDocs.propTypes);
}

export default withStyles(styles)(ApiDocs);
