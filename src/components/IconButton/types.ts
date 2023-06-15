import { HTMLProps, ReactNode } from "react";

export interface IIconButton extends HTMLProps<HTMLButtonElement> {
    icon?: ReactNode,
    iconSize?: number | string,
    type?: "button" | "submit" | "reset",
    isNewAction?: boolean
}