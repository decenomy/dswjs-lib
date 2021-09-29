/**
 * Abstract Class DSW.
 *
 * @class DSW
 */
 export class DSW {

    constructor(bitcoinjs, network) {
        if (this.constructor == DSW) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this._network = network;
        this._bitcoinjs = bitcoinjs;
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