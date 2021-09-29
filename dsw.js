import './bitcoinjs.min.js';
import * as bitcoinjsNotInNode from './bitcoinjs.min.js';

if(!bitcoinjs) {
    bitcoinjs = bitcoinjsNotInNode;
}

/**
 * Abstract Class DSW.
 *
 * @class DSW
 */
 export class DSW {

    constructor(network) {
        if (this.constructor == DSW) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this._network = network;
    }

    checkAddress(address) {
        try {
            // check the base58 encoding and the checksum value
            bitcoinjs.address.fromBase58Check(address);
            // check the validity of the network parameters
            bitcoinjs.address.toOutputScript(address, this._network);
            return true;
        } catch {
            return false;
        }
    }
}