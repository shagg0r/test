import * as React from 'react';

export default function getChildRef(child) {
  if (process.env.NODE_ENV !== 'production') {
    if (!React.isValidElement(child)) {
      throw new Error(
       'MUI: getChildRef expected to receive a single React element child.'
      );
    }
  }
  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to children in React 18
  // below check is to ensure 'ref' is accessible in both cases
  return child.props.propertyIsEnumerable('ref') ? child.props.ref : child.ref;
}
