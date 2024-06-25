import {ReactNode} from "react";

export type Tab = {
    key: string,
    title: string,
    component: ReactNode,
    path: string
}

export type Tabs = Tab[]

export {};

declare global {
    type NETWORK = {
        name: string,
        title: string,
        chainId: string,
        chain: string,
        rpc: string,
        socket: string,
        rest?: string,
        denom: string,
        prefix: string,
        token: string,
        tokens: Tokens
    }

    type Token = {
        token: string,
        isNative: boolean,
        address: string
    }

    type Tokens = {
        [type: string]:  Token
    }
}