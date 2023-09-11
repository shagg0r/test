import * as React from 'react';
import RootSvg, { RootSvgProps } from 'docs/src/icons/RootSvg';

export default function SvgMuiLogomark(props: RootSvgProps) {
  return (
    <RootSvg
      xmlns="http://www.w3.org/2000/svg"
      width={35}
      height={32}
      viewBox="0 0 35 32"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.992 6.412 1.504.877A1 1 0 0 0 0 1.741v15.627a2 2 0 0 0 .971 1.715l2.514 1.508A1 1 0 0 0 5 19.734v-9.01a1 1 0 0 1 1.496-.87l4.512 2.579a2 2 0 0 0 1.984 0l4.512-2.578a1 1 0 0 1 1.496.868v4.116a2 2 0 0 1-1.008 1.737l-5.236 2.992A1.5 1.5 0 0 0 12 20.87v4.06a2 2 0 0 0 .89 1.664l7.081 4.72a2 2 0 0 0 2.102.073l12.171-6.955A1.5 1.5 0 0 0 35 23.13V12.265a1 1 0 0 0-1.514-.857l-2.515 1.508A2 2 0 0 0 30 14.632v5.485a1.5 1.5 0 0 1-.771 1.312l-7.43 4.127a1.5 1.5 0 0 1-1.56-.063l-2.424-1.616a1 1 0 0 1 .04-1.69l5.174-3.104A2 2 0 0 0 24 17.368V1.74a1 1 0 0 0-1.504-.864l-9.488 5.535a2 2 0 0 1-2.016 0Z M34.029 7.583 31.514 9.09A1 1 0 0 1 30 8.234V4.132a2 2 0 0 1 .971-1.715L33.486.91A1 1 0 0 1 35 1.766v4.102a2 2 0 0 1-.971 1.715Z"
        fill="#007FFF"
      />
    </RootSvg>
  );
}
