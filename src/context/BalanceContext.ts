import React, {createContext} from "react";

const BalanceContext = createContext({
    balance: 0,
    refetch: ():void => {}
})

export function useBalance() {
    return React.useContext(BalanceContext)
}

export default  BalanceContext