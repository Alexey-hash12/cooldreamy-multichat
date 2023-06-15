import { HTMLProps, ReactNode } from "react";

export interface IInput extends HTMLProps<HTMLInputElement> {
    beforeIcon?: ReactNode,
    afterIcon?: ReactNode

}