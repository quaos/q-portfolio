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
  iconSubSet?: string;
  iconName: string;
  size?: IconSize;
}

export const Icon = ({
  className = "",
  Component = "i",
  iconSet,
  iconSubSet,
  iconName,
  size = IconSize.S,
}: IconProps) => {
  let iconCls;
  switch (iconSet) {
    case "q":
      iconCls = [
        "q-icon",
        size ? `q-icon-${size}` : undefined,
        `q-pic-${iconName}`,
      ]
        .filter((part) => !!part).join(" ");
      break;
    case "fa":
      iconCls = [
        "fa",
        iconSubSet ? `fa-${iconSubSet}` : undefined,
        `fa-${iconName}`,
      ]
        .filter((part) => !!part).join(" ");
      break;
    default:
      iconCls = "";
      break;
  }

  return <Component className={`${iconCls} ${className}`}></Component>;
};
