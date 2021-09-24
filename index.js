import bitcoinjs from 'bitcoinjs-lib';

/**
 * Abstract Class DSW.
 *
 * @class DSW
 */
class DSW {

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

/**
 * Sapphire.
 *
 * @class Sapphire
 * @extends {DSW}
 */
export class Sapphire extends DSW {

    constructor() {
        super({
            messagePrefix: '\x18DarkNet Signed Message:\n',
            bech32: 'bc', // we don't have it, however leave it like in Bitcoin
            bip32: {
                public: 0x022d2563, // boost::assign::list_of(0x02)(0x2D)(0x25)(0x63)
                private: 0x0221312B, // boost::assign::list_of(0x02)(0x21)(0x31)(0x2B)
            },
            pubKeyHash: 0x3F, // std::vector<unsigned char>(1, 63)
            scriptHash: 0x12, // std::vector<unsigned char>(1, 18)
            wif: 0x19, // std::vector<unsigned char>(1, 25)
        });
    }

}

/**
 * Jackpot.
 *
 * @class Jackpot
 * @extends {DSW}
 */
 export class Jackpot extends DSW {

    constructor() {
        super({
            messagePrefix: '\x18DarkNet Signed Message:\n',
            bech32: 'bc', // we don't have it, however leave it like in Bitcoin
            bip32: {
                public: 0x022D2573, // boost::assign::list_of(0x02)(0x2D)(0x25)(0x73)
                private: 0x0221312B, // boost::assign::list_of(0x02)(0x21)(0x31)(0x2B)
            },
            pubKeyHash: 0x0F, // std::vector<unsigned char>(1, 15)
            scriptHash: 0x10, // std::vector<unsigned char>(1, 16)
            wif: 0x2B, // std::vector<unsigned char>(1, 43)
        });
    }
}