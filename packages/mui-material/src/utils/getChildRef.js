import * as React from 'react';

export default function getChildRef(child) {
  if (process.env.NODE_ENV !== 'production') {
    if (!React.isValidElement(child)) {
      console.error(
        [
          "MUI: getChildRef doesn't accept array as a child.",
          'Consider providing a single element instead.',
        ].join('\n'),
      );
    }
  }
  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to children in React 18
  // below check is to ensure 'ref' is accessible in both cases
  return child.props.propertyIsEnumerable('ref') ? child.props.ref : child.ref;
}
