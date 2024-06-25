import {useEffect, useState} from "react"
import { useWallet } from "cloud-social-wallet"
import Button from "./Button"
import styles from './SendBalance.module.scss'
import {NETWORK} from "../Network.ts";

const GetBalance = ({setVisibility}:{setVisibility?: any}) => {
    const {client} = useWallet()
    const [recipient, setRecipient] = useState('')
    const [balance, setBalance] = useState(0)
    
    const getBalance = async () => {
        try{
            if(client && recipient) {
                // @ts-ignore
                const bal = await client?.getBalance(recipient, NETWORK.denom)
                setBalance(bal.amount / 1000000)
            }
        }catch (e){
            setBalance(0)
        }
    }

    useEffect(() => {
        getBalance()
    }, [client, recipient])

    useEffect(() => {
        const interval  = setInterval(getBalance,5000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return <div className="sendBalance">
        <h1>Query Balance</h1>
        <label >Address:</label>
        <input type={"text"} value={recipient} onChange={(e) => setRecipient(e.target.value)}
               placeholder={'Address'}/>

        { recipient && <p className={styles.balance}>Available: <span className={styles.amount}>{balance} {NETWORK.denom}</span> </p> }
        <div className="sendBalancebuttons">
            <Button className={styles.close} outline type={'button'} onClick={() => setVisibility('main')}>close</Button>
        </div>
    </div>
}

export default GetBalance