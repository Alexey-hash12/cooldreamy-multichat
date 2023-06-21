export interface IButton extends React.HTMLProps<HTMLButtonElement> {
    variant?: buttonVariants,
    text?: string,
    type?: "button" | "submit" | "reset"
}


export type buttonVariants = 'default'