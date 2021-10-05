import { DSW } from './dsw.js'

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

    constructor(bitcoinjs, bip39) {
        super(bitcoinjs, bip39, bitcoin.networks.bitcoin);
    }

}

/**
 * Bitcoin.
 *
 * @class Bitcoin Testnet
 * @extends {DSW}
 */
 export class BitcoinTestnet extends DSW {

    get COIN_TYPE() {
        return 0x1;
    } 

    constructor(bitcoinjs, bip39) {
        super(bitcoinjs, bip39, bitcoin.networks.testnet);
    }

}