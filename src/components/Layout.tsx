import './Layout.css'
import {ReactNode, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useWallet} from "cloud-social-wallet";
import Button from './Button.tsx';
import {useGetBalance, useScreen} from "../hooks";
import {COPNTEST, network, NETWORK} from "../Network.ts";

const Layout = ({children}: { children?: ReactNode }) => {
    const [initLoading, setInitLoading] = useState(true)
    const {address, login, logout} = useWallet()
    const location = useLocation();
    const {pathname} = location;
    const active = {'/send': 'send', '/receive': 'receive'}[pathname]
    const {balance} = useGetBalance({token: COPNTEST})
    const screenWidth = useScreen()

    useEffect(() => {
        const timer = setTimeout(() => setInitLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    return (initLoading ?  <div className={"body"}>
            <div className="loading">
                Loading...
            </div>
        </div>
        : address ? <div className={"body"}>
            {
                screenWidth <= 656 ? <div className={"content content-sm"}>
                        <div className={"balance-sm"}>
                            <div className={"balance"}>
                                <h6>Balance</h6>
                                <h2>{balance} <span>{NETWORK.tokens?.[COPNTEST]?.token ?? ''}</span></h2>
                            </div>
                            <div className={"logout-sm"}>
                                <p onClick={logout}>logout</p>
                            </div>
                        </div>
                        {children}
                    </div> :
                    <>
                        <div id="nav-bar">
                            <input id="nav-toggle" type="checkbox"/>
                            <div id="nav-header">
                                <div className={"balance"}>
                                    <h6>Balance</h6>
                                    <h2>{balance} <span>{NETWORK.tokens?.[COPNTEST]?.token ?? ''}</span></h2>
                                </div>
                                {/*<label htmlFor="nav-toggle"><span id="nav-toggle-burger"></span></label>*/}
                                <hr/>
                            </div>
                            <div id="nav-content">
                                <Link to={'/send'}
                                      className={`nav-button ${active == 'send' || pathname === '/' ? 'active' : ''}`}><i
                                    className="fas"></i><span>Send</span></Link>
                                <Link to={'receive'} className={`nav-button ${active == 'receive' ? 'active' : ''}`}><i
                                    className="fas"></i><span>Receive</span></Link>
                                {/*<hr />*/}
                                <div id="nav-content-highlight"></div>
                            </div>
                            <input id="nav-footer-toggle" type="checkbox"/>
                            <div id="nav-footer">
                                <div id="nav-footer-heading" className={"logout-btn"} onClick={logout}>
                                    <div id="nav-footer-titlebox">
                                        <div id="nav-footer-title">Logout</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"content"}>
                            {
                                network === 'mainnet' && <h1 className="network">{network}
                                </h1>
                            }
                            {children}
                        </div>
                    </>
            }
        </div> : <div className={"body"}>
            <div className="connect-wallet">
                <Button outline type={'button'} onClick={() => login('google')}>Login with Google</Button>
            </div>
        </div>
    )
}

export default Layout