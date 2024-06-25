import {toast} from "react-toastify";

export const shortAddress = (address: string) => {
    return address ? `${address?.substring(0,10)}.....${address?.substring(address.length - 10,address.length)}` : ""
}
export const copyToClipboard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text ?? "");
        toast.success("Copied to clipboard");
    } catch (error) {
        console.log("error", error);
    }
}

export const isNative = (token?: string | undefined) => {
    return token?.startsWith('u') || token?.startsWith('token')
}