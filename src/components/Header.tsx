import {Fragment, useEffect, useState} from "react"
import classNames from "classnames";

import {copyToClipboard, shortAddress} from "../lib/utils"
import styles from './Header.module.scss'
import Button from "./Button"
import { useWallet } from "cloud-social-wallet";
import {NETWORK} from "../Network.ts";
const Header = ({setVisibility}: { setVisibility: any}) => {
    const {address, client, login, logout} = useWallet()
    const [balance, setBalance] = useState(0)

    const getBalance = async () => {
        try{
            if(client && address) {
                // @ts-ignore
                const bal = await client?.getBalance(address, NETWORK.denom)
                setBalance(bal.amount / 1000000)
            }
        }catch (e){
            setBalance(0)
        }
    }

    useEffect(() => {
        balance <= 0 && getBalance()
    }, [address, client])

    useEffect(() => {
        const interval  = setInterval(getBalance,5000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <div className={styles.wallet}>
        <div className={styles.main}>
            <h3>Loop Cloud Wallet</h3>
            <div className={styles.address}>
                <span onClick={() => copyToClipboard(address)}>{
                    shortAddress(address)
                }</span>
            </div>
        </div>
            <div className={styles.footer}>
                {
                    address ? <Fragment>
                            <p className={styles.balance}>Available: <span className={styles.amount}>{balance} {NETWORK.prefix}</span> </p>
                        <div className={styles.mainButtons}>
                        <div className={styles.buttons}>
                            <Button onClick={() => setVisibility('send')} outline className={styles.button}>Send</Button>
                            <Button onClick={() => setVisibility('query')} outline className={styles.button}>Query Balance</Button>
                        </div>
                            <Button onClick={logout} className={classNames(styles.button, styles.logout)} >Logout</Button>
                        </div>
                    </Fragment> : <div className={styles.buttons}>
                        <p onClick={()=> login('google')}>Connect</p>
                    </div>
                }
            </div>
        </div>
    )
}
export default Header