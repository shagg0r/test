import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let EditorWrapText = (props) => (
  <SvgIcon {...props}>
    <path d="M4 19h6v-2H4v2zM20 5H4v2h16V5zm-3 6H4v2h13.25c1.1 0 2 .9 2 2s-.9 2-2 2H15v-2l-3 3 3 3v-2h2c2.21 0 4-1.79 4-4s-1.79-4-4-4z"/>
  </SvgIcon>
);
EditorWrapText = pure(EditorWrapText);
EditorWrapText.displayName = 'EditorWrapText';
EditorWrapText.muiName = 'SvgIcon';

export default EditorWrapText;
