import styles from './Card.module.scss'
import classNames from "classnames";
import {ReactNode} from "react";

const Card = ({children, className}: { className?: string , children: string | ReactNode}) => {
    return (<div className={classNames(styles.card,className)}>
        {children}
    </div>)
}

export default Card