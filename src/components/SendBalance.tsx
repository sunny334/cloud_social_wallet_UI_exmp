import {useEffect, useState} from "react"
import {calculateFee, coin, GasPrice} from "@cosmjs/stargate"
import {useWallet} from "cloud-social-wallet";
import classNames from "classnames"
import {toast} from "react-toastify";
import {Tooltip} from "react-tooltip";
import Button from "./Button";
import styles from './SendBalance.module.scss'
import {useGetBalance} from "../hooks";
import SelectBox from "./SelectBox";
import {COPNTEST, NETWORK} from "../Network.ts";
import {isNative} from "../lib/utils.ts";

const SendBalance = () => {
    const {address, client} = useWallet()
    const [token, setToken] = useState(COPNTEST)
    const {balance, refetch} = useGetBalance({token})

    const [loading, setLoading] = useState(false)
    const [recipient, setRecipient] = useState('')
    const [amount, setAmount] = useState<string | number>()
    const [tx, setTx] = useState<any>({})
    const [error, setError] = useState(undefined)

    const resetForm = () => {
        setAmount('');
        setRecipient('');
    }
    const send = async () => {
        setLoading(true)
        setError(undefined)
        setTx({})
        const gasPrice = GasPrice.fromString("0.03" + "upoa");
        const txFee = calculateFee(2000000, gasPrice);
        try {
            let tx = undefined
            if (isNative(token)) {
                // @ts-ignore
                tx = await client?.sendTokens(
                    address,
                    recipient,
                    [coin(Number(amount) * 1000000, token)],
                    txFee,
                    "Successfully Transferred"
                );
            } else {
                console.log("msg", {
                    token,
                    txFee,
                    transfer: {
                        owner: address,
                        recipient: recipient,
                        amount: Number(amount) * 1000000
                    }
                })
                // @ts-ignore
                tx = await client?.execute(
                    address,
                    token,
                    {
                        transfer: {
                            owner: address,
                            recipient: recipient,
                            amount: `${Number(amount) * 1000000}`
                        }
                    },
                    txFee,
                    "Transferred"
                );
            }
            console.log(tx);
            setTx(tx)
            setError(undefined)
            resetForm();
            refetch?.()
            toast.success('Successfully Transferred')
        } catch (e: any) {
            setTx({})
            const msg = e.message.substring(e.message.indexOf("failed to execute message;"))?.substring(0, 800);
            console.error("e", e.message)
            toast.error(msg)
            setError(msg)
        }
        setLoading(false)
    }
    const invalid = Number(amount) > balance
    const disable = !client || !address || loading || recipient.length <= 0 || Number(amount) <= 0 || invalid

    const onChangeToken = (t: string) => {
        setToken(t);
    }

    useEffect(() => {
        onChangeToken(token)
    }, [])

    return (<div className="sendBalance">
        <label>Token<span className={"required"}>*</span>:</label>
        <SelectBox onSelect={onChangeToken}/>
        <label>Recipient <span className={"required"}>*</span>:</label>
        <input type={"text"} value={recipient} onChange={(e) => setRecipient(e.target.value)}
               placeholder={'Recipient'}/>
        <div className={styles.amountLabel}>
            <label>Amount <span className={"required"}>*</span>:</label>
            <small
                onClick={() => !isNative(token) ? setAmount(balance) : balance > 0.5 ? setAmount(balance - 0.5) : setAmount(0)}>{balance.toFixed(6)} {NETWORK.tokens?.[token]?.token ?? token}</small>
        </div>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={'Amount'}/>
        {
            invalid && <small className={styles.error}>insufficient balance</small>
        }
        <div className="sendBalancebuttons">
            <Button
                data-tooltip-id="low-balance"
                data-tooltip-content={balance <= 0 ? "Low Balance" : ""}
                className={classNames(styles.submit, disable ? styles.disabled : '')}
                type={'button'}
                onClick={send}
                disabled={disable}
            >{loading ? "Sending..." : "Send"}
            </Button>
            {loading ? <p className="cancel-btn" onClick={() => setLoading(false)}>cancel tx</p> : ""}
            <Tooltip id="low-balance"/>
        </div>
        <div className={"error"}>
            {
                error && <small>{error}</small>
            }
        </div>
        <div className={"msg"}>
            {
                !error && (Object.keys(tx).length && tx?.transactionHash) ?
                    <small>Successfully Transferred</small> : null
            }
        </div>
    </div>)
}

export default SendBalance