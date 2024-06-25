import { useWallet } from "cloud-social-wallet"
import { copyToClipboard, shortAddress } from "../lib/utils"
import styles from './ReceiveToken.module.scss'

const ReceiveToken = () => {
    const {address} = useWallet()
    return (
        <span className={styles.container} onClick={() => copyToClipboard(address)}>{
            shortAddress(address)
            }
            <span>Click to copy</span>
        </span>
    )
}

export default ReceiveToken