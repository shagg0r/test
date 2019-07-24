import React from 'react';
import { assert } from 'chai';
import { createMount } from '@material-ui/core/test-utils';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';

describe('<Select> integration', () => {
  let mount;

  before(() => {
    // StrictModeViolation: unknown
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describe('with Dialog', () => {
    function SelectAndDialog(props) {
      const [value, setValue] = React.useState(10);
      function handleChange(event) {
        setValue(Number(event.target.value));
      }

      return (
        <Dialog open>
          <Select {...props} value={value} onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </Dialog>
      );
    }

    it('should focus the selected item', done => {
      const wrapper = mount(<SelectAndDialog />);
      const portalLayer = document.querySelector('[data-mui-test="Modal"]');
      const selectDisplay = portalLayer.querySelector('[data-mui-test="SelectDisplay"]');

      wrapper.setProps({
        MenuProps: {
          onExited: () => {
            assert.strictEqual(
              document.activeElement,
              selectDisplay,
              'should focus back the select input',
            );
            done();
          },
        },
      });

      // Let's open the select component
      selectDisplay.focus();
      selectDisplay.click();

      const dialogPortalLayer = document.querySelectorAll('[data-mui-test="Modal"]')[1];

      assert.strictEqual(
        document.activeElement,
        dialogPortalLayer.querySelectorAll('li')[1],
        'should focus the selected menu item',
      );

      // Now, let's close the select component
      const backdrop = dialogPortalLayer.querySelector('[data-mui-test="Backdrop"]');
      backdrop.click();
    });

    it('should be able to change the selected item', done => {
      const wrapper = mount(<SelectAndDialog />);
      const portalLayer = document.querySelector('[data-mui-test="Modal"]');
      const selectDisplay = portalLayer.querySelector('[data-mui-test="SelectDisplay"]');

      wrapper.setProps({
        MenuProps: {
          onExited: () => {
            assert.strictEqual(
              document.activeElement,
              selectDisplay,
              'should focus back the select input',
            );
            done();
          },
        },
      });

      // Let's open the select component
      selectDisplay.focus();
      selectDisplay.click();

      const dialogPortalLayer = document.querySelectorAll('[data-mui-test="Modal"]')[1];

      assert.strictEqual(
        document.activeElement,
        dialogPortalLayer.querySelectorAll('li')[1],
        'should focus the selected menu item',
      );

      // Now, let's close the select component
      dialogPortalLayer.querySelectorAll('li')[2].click();
    });
  });
});
