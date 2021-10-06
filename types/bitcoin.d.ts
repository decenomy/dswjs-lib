import { DSW } from './dsw';
/**
 * Bitcoin.
 *
 * @class Bitcoin
 * @extends {DSW}
 */
export declare class Bitcoin extends DSW {
    get COIN_TYPE(): number;
    constructor(bitcoinjs: any, bip39: any);
}
/**
 * Bitcoin Testnet.
 *
 * @class BitcoinTestnet
 * @extends {DSW}
 */
export declare class BitcoinTestnet extends DSW {
    get COIN_TYPE(): number;
    constructor(bitcoinjs: any, bip39: any);
}
