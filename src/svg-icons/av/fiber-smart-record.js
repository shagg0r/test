import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let AvFiberSmartRecord = (props) => (
  <SvgIcon {...props}>
    <g><circle cx="9" cy="12" r="8"/><path d="M17 4.26v2.09c2.33.82 4 3.04 4 5.65s-1.67 4.83-4 5.65v2.09c3.45-.89 6-4.01 6-7.74s-2.55-6.85-6-7.74z"/></g>
  </SvgIcon>
);
AvFiberSmartRecord = pure(AvFiberSmartRecord);
AvFiberSmartRecord.displayName = 'AvFiberSmartRecord';
AvFiberSmartRecord.muiName = 'SvgIcon';

export default AvFiberSmartRecord;
