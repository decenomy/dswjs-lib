import { ChangeType } from './changeType';

export class DSW {

    _bitcoinjs: any;
    _bip39: any;
    _network: any;

    get COIN_TYPE() {
        return -1;
    }

    constructor(bitcoinjs: any, bip39: any, network: any) {
        if (this.constructor == DSW) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this._network = network;
        this._bitcoinjs = bitcoinjs;
        this._bip39 = bip39;
    }

    async createNewWallet() : Promise<any> {
        let mnemonic = this._bip39.generateMnemonic(256); // 24 words
        return await this.recoverWallet(mnemonic);
    }

    async recoverWallet(mnemonic: string) : Promise<any> {
        let seed = await this._bip39.mnemonicToSeed(mnemonic);
        return { mnemonic, ...this.getXPriv(seed) };
    }

    getXPriv(seed: string | Buffer) {
        if (!Buffer.isBuffer(seed)) {
            seed = Buffer.from(seed, 'hex');
        }
        let node = this._bitcoinjs.bip32.fromSeed(seed, this._network);
        let xprv = node.toBase58(this._network);
        return { xprv, seed: seed.toString('hex') };
    }

    // m / purpose' / coin_type' / account'
    getWalletAccountXPub(xprv: string, account: number) : any {
        const path = `m/44'/${this.COIN_TYPE}'/${account}'`;
        let node = this._bitcoinjs.bip32.fromBase58(xprv, this._network).derivePath(path);
        let xpub = node.neutered().toBase58(this._network);
        return { path, xpub };
    }

    // m / purpose' / coin_type' / account' / change['] / address_index[']
    derive(xprv: string, account: number, change: ChangeType, address_index: number, mobile: boolean = true) : any {
        if (change !== ChangeType.EXTERNAL &&
            change !== ChangeType.INTERNAL &&
            change !== ChangeType.ECOMMERCE) {
            throw new Error('invalid change type');
        }
        const path = `m/44'/${this.COIN_TYPE}'/${account}'/${change}${mobile ? "" : "'"}/${address_index}${mobile ? "" : "'"}`;
        const node = this._bitcoinjs.bip32.fromBase58(xprv, this._network).derivePath(path);
        const { publicKey } = node;
        const wif = node.toWIF();
        const { address } = this._bitcoinjs.payments.p2pkh({ pubkey: publicKey, network: this._network });
        return { path, address, wif };
    }

    // m / purpose' / coin_type' / 0' / ECOMMERCE / address_index
    deriveEcommerce(xpub: string, address_index: number) {
        const path = `m/44'/${this.COIN_TYPE}'/0'/${ChangeType.ECOMMERCE}/${address_index}`;
        const { address } = this._bitcoinjs.payments.p2pkh({ pubkey: this._bitcoinjs.bip32.fromBase58(xpub, this._network).derivePath(`${address_index}`).publicKey, network: this._network });
        return { path, address };
    }

    // (m / purpose' / coin_type' / account' / ) change / address_index
    deriveFromAccount(xpub: string, change: ChangeType, address_index: number) {
        if (change !== ChangeType.EXTERNAL &&
            change !== ChangeType.INTERNAL) {
            throw new Error('invalid change type');
        }
        const path = `${change}/${address_index}`;
        const { address } = this._bitcoinjs.payments.p2pkh({ pubkey: this._bitcoinjs.bip32.fromBase58(xpub, this._network).derivePath(path).publicKey, network: this._network });
        return { path, address };
    }

    checkAddress(address: string) {
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