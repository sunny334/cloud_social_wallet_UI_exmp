# Cloud Social Wallet

Usage:
```js
yarn add cloud-social-wallet
```

```js
import {WalletProvider} from "cloud-social-wallet";

function App() {
    return (
        <WalletProvider config={{rpc: '', backend_url: '', prefix: 'juno'}}>
            <WalletApp/>
        </WalletProvider>
    )
}
```


```js
import {useWallet} from "cloud-social-wallet";

function WalletApp() {
    const {address, logout, login} = useWallet()
    return (
        <>
            {
                address ? <>
                    <p>{address}</p>
                    <button onClick={logout}>Disconnect</p>
                </> : <>
                    <button onClick={() => login('google')}>Google Login</button>
                    <button onClick={() => login('facebook')}>Facebook Login</button>
                </>
            }
        </>
    )
}
```
