import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let ImageLooksTwo = (props) => (
  <SvgIcon {...props}>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 8c0 1.11-.9 2-2 2h-2v2h4v2H9v-4c0-1.11.9-2 2-2h2V9H9V7h4c1.1 0 2 .89 2 2v2z"/>
  </SvgIcon>
);
ImageLooksTwo = pure(ImageLooksTwo);
ImageLooksTwo.displayName = 'ImageLooksTwo';
ImageLooksTwo.muiName = 'SvgIcon';

export default ImageLooksTwo;
