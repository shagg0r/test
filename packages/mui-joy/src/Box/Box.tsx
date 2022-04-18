import { createBox } from '@mui/system';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '../className';
import { BoxTypeMap } from './BoxProps';
import defaultTheme from '../styles/defaultTheme';
import styleFunctionSx from '../styles/styleFunctionSx';

const Box = createBox({
  defaultTheme,
  defaultClassName: 'MuiBox-root',
  generateClassName: ClassNameGenerator.generate,
  styleFunctionSx,
}) as OverridableComponent<BoxTypeMap>;

Box.propTypes /* remove-proptypes */ = {
  // --------------------------------- Warning ---------------------------------
  // | The propTypes for the system components are NOT automatically generated |
  // |  If you are updating the props, make sure to update the propTypes too   |
  // ---------------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Box;
