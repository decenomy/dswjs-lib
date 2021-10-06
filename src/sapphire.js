'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Sapphire = void 0;
const dsw_js_1 = require('./dsw.js');
class Sapphire extends dsw_js_1.DSW {
  get COIN_TYPE() {
    return 0x340;
  }
  constructor(bitcoinjs, bip39) {
    super(bitcoinjs, bip39, {
      messagePrefix: '\x18DarkNet Signed Message:\n',
      bech32: 'bc',
      bip32: {
        public: 0x022d2563,
        private: 0x0221312b, // boost::assign::list_of(0x02)(0x21)(0x31)(0x2B)
      },
      pubKeyHash: 0x3f,
      scriptHash: 0x12,
      wif: 0x19, // std::vector<unsigned char>(1, 25)
    });
  }
}
exports.Sapphire = Sapphire;
