import { React } from "../deps/react.ts";

export enum IconSize {
  XS = "xs",
  S = "s",
  M = "m",
  L = "l",
  XL = "xl",
}

export interface IconProps {
  iconSet: string;
  iconName: string;
  size: IconSize;
  Component?: string;
  className?: string;
}

export const Icon = ({
  iconSet, iconName, size,
  Component = "i",
  className,
}: React.Props<IconProps>) => {
  let iconCls;
  switch (iconSet) {
      case "qp":
          iconCls = `qp-icon qp-icon-${size} qp-pic-${iconName}`;
          break;
      case "fa":
          iconCls = `fa fa-${iconName}`;
          break;
      default:
          iconCls = "";
          break;
  }

  return (
    <Component className={`${className} ${iconCls}`}></Component>
  )
};
