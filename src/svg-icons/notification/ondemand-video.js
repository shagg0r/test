import React from 'react';
import pure from 'recompact/pure';
import SvgIcon from '../../SvgIcon';

let NotificationOndemandVideo = (props) => (
  <SvgIcon {...props}>
    <path d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2zm0 14H3V5h18v12zm-5-6l-7 4V7z"/>
  </SvgIcon>
);
NotificationOndemandVideo = pure(NotificationOndemandVideo);
NotificationOndemandVideo.displayName = 'NotificationOndemandVideo';
NotificationOndemandVideo.muiName = 'SvgIcon';

export default NotificationOndemandVideo;
