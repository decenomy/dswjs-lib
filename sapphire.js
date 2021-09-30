import { DSW } from './dsw.js'

/**
 * Sapphire.
 *
 * @class Sapphire
 * @extends {DSW}
 */
export class Sapphire extends DSW {

    get COIN_TYPE() {
        return 0x340;
    } 

    constructor(bitcoinjs, bip39) {
        super(bitcoinjs, bip39, {
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