import { HTMLProps, ReactNode } from "react";

export interface IIconButton extends HTMLProps<HTMLButtonElement> {
    icon?: ReactNode,
    iconSize?: number | string,
    type?: "button" | "submit" | "reset",
    variant?: iconButtonVariants
    isNewAction?: boolean,
    isRound?: boolean
}


export type iconButtonVariants = 'violet' | 'simple' | 'danger'