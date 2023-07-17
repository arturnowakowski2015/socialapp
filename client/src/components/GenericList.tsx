// TabBar.tsx
import React from "react";

interface IProps<T> {
  items: T[];
  childComp?: React.ReactNode;
}
export function GenericList<T>(props: any) {
  const { items, childComp } = props;

  return (
    <>
      {items &&
        items.map((item: any) => {
          return <> {React.cloneElement(childComp, { item })}</>;
        })}
    </>
  );
}
export default GenericList;
