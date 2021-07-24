import React, { DOMAttributes } from "react";
import classNames from "classnames";
import { ReactComponent as ArrowLeft } from "ui-kit/assets/icons/ArrowLeft.svg";
import { ReactComponent as ArrowRight } from "ui-kit/assets/icons/ArrowRight.svg";
import styles from "./Icon.module.scss";

export type IconType = "ArrowLeft" | "ArrowRight";

const iconTypes = new Map([
  ["ArrowLeft", <ArrowLeft key={Date.now()} />],
  ["ArrowRight", <ArrowRight key={Date.now()} />],
]);

export interface IIconProps extends DOMAttributes<HTMLSpanElement> {
  className?: string;
  type: IconType;
}

const getIcon = (type: IconType): JSX.Element =>
  iconTypes.get(type) as JSX.Element;

export const Icon: React.FC<IIconProps> = ({ className, type, ...rest }) => {
  return (
    <div className={classNames(styles.Icon, className)} {...rest}>
      {getIcon(type)}
    </div>
  );
};
