import styles from './Button.module.scss'
import classNames from "classnames"
import {ButtonHTMLAttributes, ReactNode} from "react";

interface ButtonProps {
    children?: string | ReactNode,
    className?: string,
    outline?: boolean
}
type ButtonAttrs = ButtonHTMLAttributes<HTMLButtonElement>
type Button = ButtonProps & ButtonAttrs
const Button = ({children,className, outline, ...props}: Button) => {
    return (<button  {...props} className={classNames(styles.button, outline ? styles.outline : "", className)}>
        {children}
    </button>)
}

export default Button