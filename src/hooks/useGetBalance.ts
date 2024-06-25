import {useWallet} from "cloud-social-wallet"
import {useEffect, useState} from "react"
import {isNative} from "../lib/utils.ts";

const useGetBalance = ({token}:{ token?: string}) => {
    const {address, client} = useWallet()
    const [loading, setLoading] = useState(false)
    const [balance, setBalance] = useState(0)
    const getBalance = async () => {
        setLoading(true);
//        try {
            if (client && address) {
                if (isNative(token)) {
                    // @ts-ignore
                    const bal = await client?.getBalance(address, token)
                    setBalance(bal.amount / 1000000)
                } else {
                    // @ts-ignore
                    const bal = await client?.queryContractSmart(token, {
                        balance: {
                            address
                        }
                    })
                    setBalance(bal.balance / 1000000)
                }
            }
//        } catch (e) {
//            setBalance(0)
//        }
    }

    useEffect(() => {
        getBalance()?.finally(() => {
            setLoading(false);
        })
    }, [address, client, token])

    return {balance, refetch: getBalance, loading, reset: () => setBalance(0)}
}

export default useGetBalance