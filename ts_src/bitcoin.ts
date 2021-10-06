import { DSW } from './dsw'

/**
 * Bitcoin.
 *
 * @class Bitcoin
 * @extends {DSW}
 */
export class Bitcoin extends DSW {

    get COIN_TYPE() {
        return 0x0;
    } 

    constructor(bitcoinjs: any, bip39: any) {
        super(bitcoinjs, bip39, bitcoinjs.networks.bitcoin);
    }

}

/**
 * Bitcoin Testnet.
 *
 * @class BitcoinTestnet
 * @extends {DSW}
 */
 export class BitcoinTestnet extends DSW {

    get COIN_TYPE() {
        return 0x1;
    } 

    constructor(bitcoinjs: any, bip39: any) {
        super(bitcoinjs, bip39, bitcoinjs.networks.testnet);
    }

}