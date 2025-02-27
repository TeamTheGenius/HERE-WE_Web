import { Children, isValidElement, ReactNode } from 'react';

export const filterChildrenByComponent = (children: ReactNode, component: JSX.Element['type']) => {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter((child) => isValidElement(child) && child.type === component);
};
