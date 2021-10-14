/// <reference types="node" />
import { ChangeType } from './changeType';
export declare class DSW {
    _bitcoinjs: any;
    _bip39: any;
    _network: any;
    get COIN_TYPE(): number;
    constructor(bitcoinjs: any, bip39: any, network: any);
    createNewWallet(): Promise<any>;
    recoverWallet(mnemonic: string): Promise<any>;
    getXPriv(seed: string | Buffer): {
        xprv: any;
        seed: string;
    };
    getWalletAccountXPub(xprv: string, account: number): any;
    derive(xprv: string, account: number, change: ChangeType, address_index: number, mobile?: boolean): any;
    deriveEcommerce(xpub: string, address_index: number): {
        path: string;
        address: any;
    };
    deriveFromAccount(xpub: string, change: ChangeType, address_index: number): {
        path: string;
        address: any;
    };
    checkAddress(address: string): boolean;
}
