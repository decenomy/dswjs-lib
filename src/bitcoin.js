'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.BitcoinTestnet = exports.Bitcoin = void 0;
const dsw_1 = require('./dsw');
/**
 * Bitcoin.
 *
 * @class Bitcoin
 * @extends {DSW}
 */
class Bitcoin extends dsw_1.DSW {
  get COIN_TYPE() {
    return 0x0;
  }
  constructor(bitcoinjs, bip39) {
    super(bitcoinjs, bip39, bitcoinjs.networks.bitcoin);
  }
}
exports.Bitcoin = Bitcoin;
/**
 * Bitcoin Testnet.
 *
 * @class BitcoinTestnet
 * @extends {DSW}
 */
class BitcoinTestnet extends dsw_1.DSW {
  get COIN_TYPE() {
    return 0x1;
  }
  constructor(bitcoinjs, bip39) {
    super(bitcoinjs, bip39, bitcoinjs.networks.testnet);
  }
}
exports.BitcoinTestnet = BitcoinTestnet;
