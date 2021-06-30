import getCodemodUtilities from '../util/getCodemodUtilities';
/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {
  const printOptions = options.printOptions || { quote: 'single' };
  const utils = getCodemodUtilities(file, api);

  const { root, jscodeshift: j } = utils;

  const imports = root.find(j.ImportDeclaration).paths();
  const lastImport = imports[imports.length - 1];

  root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@material-ui/core/withWidth')
    .forEach(() => {
      lastImport.insertAfter(
        '// FIXME checkout https://material-ui.com/components/use-media-query/#migrating-from-withwidth\nconst withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;',
      );
    })
    .remove();

  let shouldRemoveImport = false;
  const collection = root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === '@material-ui/core')
    .forEach(({ node }) => {
      node.specifiers
        .filter((s) => s.imported.name === 'withWidth')
        .forEach((s) => {
          lastImport.insertAfter(
            '// FIXME checkout https://material-ui.com/components/use-media-query/#migrating-from-withwidth\nconst withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width="xs" />;'.replace(
              /withWidth/g,
              s.local.name,
            ),
          );
        });

      if (node.specifiers.length > 1) {
        node.specifiers = node.specifiers.filter((s) => s.imported.name !== 'withWidth');
      } else {
        shouldRemoveImport = true;
      }
    });
  if (shouldRemoveImport) {
    collection.remove();
  }

  return utils.root.toSource(printOptions);
}
