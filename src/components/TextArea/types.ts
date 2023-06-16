import { HTMLProps } from "react";

export interface ITextArea extends HTMLProps<HTMLTextAreaElement> {
    height?: number | string
}