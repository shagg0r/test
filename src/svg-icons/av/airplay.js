import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let AvAirplay = (props) => (
  <SvgIcon {...props}>
    <path d="M6 22h12l-6-6zM21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V5h18v12h-4v2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
  </SvgIcon>
);
AvAirplay = pure(AvAirplay);
AvAirplay.displayName = 'AvAirplay';
AvAirplay.muiName = 'SvgIcon';

export default AvAirplay;
