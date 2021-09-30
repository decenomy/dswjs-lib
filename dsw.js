/**
 * Abstract Class DSW.
 *
 * @class DSW
 */
export class DSW {

    static ChangeType = class {
        static get EXTERNAL() {
            return 0;
        }

        static get INTERNAL() {
            return 1;
        }

        // static get STAKING() {
        //     return 2;
        // }

        static get ECOMMERCE() {
            return 3;
        }
    }

    get COIN_TYPE() {
        return 0x0;
    }

    constructor(bitcoinjs, bip39, network) {
        if (this.constructor == DSW) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this._network = network;
        this._bitcoinjs = bitcoinjs;
        this._bip39 = bip39;
    }

    async createNewWallet() {
        let mnemonic = this._bip39.generateMnemonic(256); // 24 words
        return await this.recoverWallet(mnemonic);
    }

    async recoverWallet(mnemonic) {
        let seed = await this._bip39.mnemonicToSeed(mnemonic);
        let node = this._bitcoinjs.bip32.fromSeed(seed, this._network);
        let xprv = node.toBase58(this._network);
        return { mnemonic, xprv };
    }

    // m / purpose' / coin_type' / account'
    getWalletAccountXPub(xprv, account) {
        const path = `m/44'/${this.COIN_TYPE}'/${account}'`;
        let node = this._bitcoinjs.bip32.fromBase58(xprv, this._network).derivePath(path);
        let xpub = node.neutered().toBase58(this._network);
        return { path, xpub };
    }

    // m / purpose' / coin_type' / account' / change['] / address_index[']
    derive(xprv, account, change, address_index, mobile = true) {
        if (change !== DSW.ChangeType.EXTERNAL &&
            change !== DSW.ChangeType.INTERNAL &&
            change !== DSW.ChangeType.ECOMMERCE) {
            throw new Error('invalid change type');
        }
        const path = `m/44'/${this.COIN_TYPE}'/${account}'/${change}${mobile ? "" : "'"}/${address_index}${mobile ? "" : "'"}`;
        const { address } = this._bitcoinjs.payments.p2pkh({ pubkey: this._bitcoinjs.bip32.fromBase58(xprv, this._network).derivePath(path).publicKey, network: this._network });
        return { path, address };
    }

    // m / purpose' / coin_type' / 0' / ECOMMERCE / address_index
    deriveEcommerce(xpub, address_index) {
        const path = `m/44'/${this.COIN_TYPE}'/0'/${DSW.ChangeType.ECOMMERCE}/${address_index}`;
        const { address } = this._bitcoinjs.payments.p2pkh({ pubkey: this._bitcoinjs.bip32.fromBase58(xpub, this._network).derivePath(`${address_index}`).publicKey, network: this._network });
        return { path, address };
    }

    // (m / purpose' / coin_type' / account' / ) change / address_index
    deriveFromAccount(xpub, change, address_index) {
        if (change !== DSW.ChangeType.EXTERNAL &&
            change !== DSW.ChangeType.INTERNAL) {
            throw new Error('invalid change type');
        }
        const path = `${change}/${address_index}`;
        const { address } = this._bitcoinjs.payments.p2pkh({ pubkey: this._bitcoinjs.bip32.fromBase58(xpub, this._network).derivePath(path).publicKey, network: this._network });
        return { path, address };
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