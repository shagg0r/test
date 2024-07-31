import * as React from 'react';

/**
 * Returns the ref of an element handling differences between React 19 and older versions
 *
 * @param element React.ReactElement<any>
 * @returns React.Ref<any> | null
 */
export default function getElementRef(element: React.ReactElement<any>): React.Ref<any> | null {
  if (!element || !React.isValidElement(element)) {
    return null;
  }

  // 'ref' is passed as prop in React 19, whereas 'ref' is directly attached to children in older versions
  return (element.props as any).propertyIsEnumerable('ref')
    ? (element.props as any).ref
    : // @ts-expect-error element.ref is not included in the ReactElement type
      // We cannot check for it, but isValidElement is true at this point
      element.ref;
}
