import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let HardwareSmartphone = (props) => (
  <SvgIcon {...props}>
    <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
  </SvgIcon>
);
HardwareSmartphone = pure(HardwareSmartphone);
HardwareSmartphone.displayName = 'HardwareSmartphone';
HardwareSmartphone.muiName = 'SvgIcon';

export default HardwareSmartphone;
