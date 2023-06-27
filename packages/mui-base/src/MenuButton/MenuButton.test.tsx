import * as React from 'react';
import { createMount, createRenderer, describeConformanceUnstyled } from 'test/utils';
import MenuButton from '@mui/base/MenuButton';
import { MenuContext, MenuContextValue } from '@mui/base/useMenu';
import menuButtonClasses from './menuButtonClasses';

const testContext: MenuContextValue = {
  dispatch: () => {},
  popupId: 'menu-popup',
  registerPopup: () => {},
  registerTrigger: () => {},
  state: { open: true },
  triggerElement: null,
};

describe('<MenuButton />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  describeConformanceUnstyled(<MenuButton />, () => ({
    inheritComponent: 'button',
    render: (node) => {
      return render(<MenuContext.Provider value={testContext}>{node}</MenuContext.Provider>);
    },
    mount: (node: React.ReactNode) => {
      const wrapper = mount(
        <MenuContext.Provider value={testContext}>{node}</MenuContext.Provider>,
      );
      return wrapper.childAt(0);
    },
    refInstanceof: window.HTMLButtonElement,
    muiName: 'MuiMenuButton',
    slots: {
      root: {
        expectedClassName: menuButtonClasses.root,
        testWithElement: null,
      },
    },
    skip: ['componentProp', 'reactTestRenderer'],
  }));
});
