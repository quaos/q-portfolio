import React, { DynamicComponent } from "../deps/react.ts";

export enum IconSize {
  XS = "xs",
  S = "s",
  M = "m",
  L = "l",
  XL = "xl",
}

export interface IconProps {
  className?: string;
  Component?: DynamicComponent;
  iconSet?: string;
  iconName: string;
  size?: IconSize;
}

export const Icon = ({
  className = "",
  Component = "i",
  iconSet,
  iconName,
  size = IconSize.S,
}: IconProps) => {
  let iconCls;
  switch (iconSet) {
    case "q":
      iconCls = `q-icon q-icon-${size} q-pic-${iconName}`;
      break;
    case "fa":
      iconCls = `fa fa-${iconName}`;
      break;
    default:
      iconCls = "";
      break;
  }

  return <Component className={`${iconCls} ${className}`}></Component>;
};
