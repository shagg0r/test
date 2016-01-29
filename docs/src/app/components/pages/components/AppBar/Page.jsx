import React from 'react';
import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import appBarReadmeText from './README';
import AppBarExampleIcon from './ExampleIcon';
import appBarExampleIconCode from '!raw!./ExampleIcon';
import AppBarExampleIconButton from './ExampleIconButton';
import appBarExampleIconButtonCode from '!raw!./ExampleIconButton';
import AppBarExampleIconMenu from './ExampleIconMenu';
import appBarExampleIconMenuCode from '!raw!./ExampleIconMenu';
import AppBarExampleIconMultiple from './ExampleIconMultiple';
import appBarExampleIconMultipleCode from '!raw!./ExampleIconMultiple';
import appBarCode from '!raw!material-ui/lib/app-bar';

const descriptions = {
  icon: 'A simple example of `AppBar` with an icon on the right. ' +
  'By default, the left icon is a navigation-menu.',
  iconButton: 'This example uses an [IconButton](/#/components/icon-button) on the left, has a clickable `title` ' +
  'through the `onTouchTap` property, and a [FlatButton](/#/components/flat-button) on the right.',
  iconMenu: 'This example uses an [IconMenu](/#/components/icon-menu) for `iconElementRight`.',
  iconMultiple: 'This example uses an array of [FlatButton](/#/components/flat-button) and ' +
  '[IconButton](/#/components/icon-button) for `iconElementRight`.',
};

const AppBarPage = () => (
  <div>
    <MarkdownElement text={appBarReadmeText} />
    <CodeExample
      code={appBarExampleIconCode}
      title="Simple example"
      description={descriptions.icon}
    >
      <AppBarExampleIcon />
    </CodeExample>
    <CodeExample
      code={appBarExampleIconButtonCode}
      title="Buttons"
      description={descriptions.iconButton}
    >
      <AppBarExampleIconButton />
    </CodeExample>
    <CodeExample
      code={appBarExampleIconMenuCode}
      title="Icon Menu"
      description={descriptions.iconMenu}
    >
      <AppBarExampleIconMenu />
    </CodeExample>
    <CodeExample
      code={appBarExampleIconMultipleCode}
      title="Multiple Right Icons"
      description={descriptions.iconMultiple}
    >
      <AppBarExampleIconMultiple />
    </CodeExample>
    <PropTypeDescription code={appBarCode} />
  </div>
);

export default AppBarPage;
