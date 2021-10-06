'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Kyanite = void 0;
const dsw_js_1 = require('./dsw.js');
class Kyanite extends dsw_js_1.DSW {
  get COIN_TYPE() {
    return 0x342;
  }
  constructor(bitcoinjs, bip39) {
    super(bitcoinjs, bip39, {
      messagePrefix: '\x18DarkNet Signed Message:\n',
      bech32: 'bc',
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4, // boost::assign::list_of(0x04)(0x88)(0xAD)(0xE4)
      },
      pubKeyHash: 0x2e,
      scriptHash: 0x10,
      wif: 0x2b, // std::vector<unsigned char>(1, 43)
    });
  }
}
exports.Kyanite = Kyanite;
