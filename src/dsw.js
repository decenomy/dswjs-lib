'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DSW = void 0;
const changeType_1 = require('./changeType');
class DSW {
  constructor(bitcoinjs, bip39, network) {
    if (this.constructor == DSW) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this._network = network;
    this._bitcoinjs = bitcoinjs;
    this._bip39 = bip39;
  }
  get COIN_TYPE() {
    return -1;
  }
  createNewWallet() {
    return __awaiter(this, void 0, void 0, function* () {
      let mnemonic = this._bip39.generateMnemonic(256); // 24 words
      return yield this.recoverWallet(mnemonic);
    });
  }
  recoverWallet(mnemonic) {
    return __awaiter(this, void 0, void 0, function* () {
      let seed = yield this._bip39.mnemonicToSeed(mnemonic);
      let node = this._bitcoinjs.bip32.fromSeed(seed, this._network);
      let xprv = node.toBase58(this._network);
      return { mnemonic, xprv };
    });
  }
  // m / purpose' / coin_type' / account'
  getWalletAccountXPub(xprv, account) {
    const path = `m/44'/${this.COIN_TYPE}'/${account}'`;
    let node = this._bitcoinjs.bip32
      .fromBase58(xprv, this._network)
      .derivePath(path);
    let xpub = node.neutered().toBase58(this._network);
    return { path, xpub };
  }
  // m / purpose' / coin_type' / account' / change['] / address_index[']
  derive(xprv, account, change, address_index, mobile = true) {
    if (
      change !== changeType_1.ChangeType.EXTERNAL &&
      change !== changeType_1.ChangeType.INTERNAL &&
      change !== changeType_1.ChangeType.ECOMMERCE
    ) {
      throw new Error('invalid change type');
    }
    const path = `m/44'/${this.COIN_TYPE}'/${account}'/${change}${
      mobile ? '' : "'"
    }/${address_index}${mobile ? '' : "'"}`;
    const { address } = this._bitcoinjs.payments.p2pkh({
      pubkey: this._bitcoinjs.bip32
        .fromBase58(xprv, this._network)
        .derivePath(path).publicKey,
      network: this._network,
    });
    return { path, address };
  }
  // m / purpose' / coin_type' / 0' / ECOMMERCE / address_index
  deriveEcommerce(xpub, address_index) {
    const path = `m/44'/${this.COIN_TYPE}'/0'/${changeType_1.ChangeType.ECOMMERCE}/${address_index}`;
    const { address } = this._bitcoinjs.payments.p2pkh({
      pubkey: this._bitcoinjs.bip32
        .fromBase58(xpub, this._network)
        .derivePath(`${address_index}`).publicKey,
      network: this._network,
    });
    return { path, address };
  }
  // (m / purpose' / coin_type' / account' / ) change / address_index
  deriveFromAccount(xpub, change, address_index) {
    if (
      change !== changeType_1.ChangeType.EXTERNAL &&
      change !== changeType_1.ChangeType.INTERNAL
    ) {
      throw new Error('invalid change type');
    }
    const path = `${change}/${address_index}`;
    const { address } = this._bitcoinjs.payments.p2pkh({
      pubkey: this._bitcoinjs.bip32
        .fromBase58(xpub, this._network)
        .derivePath(path).publicKey,
      network: this._network,
    });
    return { path, address };
  }
  checkAddress(address) {
    try {
      // check the base58 encoding and the checksum value
      this._bitcoinjs.address.fromBase58Check(address);
      // check the validity of the network parameters
      this._bitcoinjs.address.toOutputScript(address, this._network);
      return true;
    } catch (_a) {
      return false;
    }
  }
}
exports.DSW = DSW;
