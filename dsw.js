/**
 * Abstract Class DSW.
 *
 * @class DSW
 */
 export class DSW {

    constructor(bitcoinjs, bip39, network) {
        if (this.constructor == DSW) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this._network = network;
        this._bitcoinjs = bitcoinjs;
        this._bip39 = bip39;
        this._coinType = 0;
    }

    async createNewWallet() {
        let mnemonic = this._bip39.generateMnemonic(256); // 24 words
        let seed = await this._bip39.mnemonicToSeed(mnemonic);
        return { mnemonic, seed };
    }

    recoverWallet(mnemonic) {

    }

    checkAddress(address) {
        try {
            // check the base58 encoding and the checksum value
            this._bitcoinjs.address.fromBase58Check(address);
            // check the validity of the network parameters
            this._bitcoinjs.address.toOutputScript(address, this._network);
            return true;
        } catch {
            return false;
        }
    }
}