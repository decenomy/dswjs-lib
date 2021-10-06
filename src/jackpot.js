'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Jackpot = void 0;
const dsw_js_1 = require('./dsw.js');
class Jackpot extends dsw_js_1.DSW {
  get COIN_TYPE() {
    return 0x341;
  }
  constructor(bitcoinjs, bip39) {
    super(bitcoinjs, bip39, {
      messagePrefix: '\x18DarkNet Signed Message:\n',
      bech32: 'bc',
      bip32: {
        public: 0x022d2573,
        private: 0x0221312b, // boost::assign::list_of(0x02)(0x21)(0x31)(0x2B)
      },
      pubKeyHash: 0x0f,
      scriptHash: 0x10,
      wif: 0x2b, // std::vector<unsigned char>(1, 43)
    });
  }
}
exports.Jackpot = Jackpot;
