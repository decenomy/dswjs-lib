import { DSW } from './dsw.js'

export class Jackpot extends DSW {

    get COIN_TYPE() {
        return 0x341;
    } 

    constructor(bitcoinjs: any, bip39: any) {
        super(bitcoinjs, bip39, {
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