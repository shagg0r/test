import * as React from 'react';

export default function getChildRef(child) {
  if (!child || !React.isValidElement(child) || React.Child.count(child) !== 1) {
    return null;
  }
  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to child in React 18
  // below check is to ensure 'ref' is accessible in both cases
  return child.props.propertyIsEnumerable('ref') ? child.props.ref : child.ref;
}
