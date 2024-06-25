import {ReactNode, useEffect, useState} from "react";
import BalanceContext from "./BalanceContext.ts";
import { useWallet } from "cloud-social-wallet";
import {NETWORK} from "../Network.ts";

function BalanceProvider({children}: { children: ReactNode }) {
    const {address, client} = useWallet()
    const [balance, setBalance] = useState(0)
    
    const getBalance = async () => {
        if(client){
            // @ts-ignore
            const balance = await client?.getBalance(address, NETWORK.denom)
            setBalance(balance.amount/1000000)
        }
    }

    useEffect(() => {
        (client && balance <= 0) && getBalance()
    }, [address, client])

    useEffect(() => {
    const interval  = setInterval(getBalance,5000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    
    return (
        <BalanceContext.Provider value={{balance, refetch: getBalance}}>
            {children}
        </BalanceContext.Provider>
    )
}

export default BalanceProvider