import { DSW } from './dsw.js'

export class Kyanite extends DSW {

    get COIN_TYPE() {
        return 0x342;
    } 

    constructor(bitcoinjs: any, bip39: any) {
        super(bitcoinjs, bip39, {
            messagePrefix: '\x18DarkNet Signed Message:\n',
            bech32: 'bc', // we don't have it, however leave it like in Bitcoin
            bip32: {
                public: 0x0488B21E, // boost::assign::list_of(0x04)(0x88)(0xB2)(0x1E)
                private: 0x0488ADE4, // boost::assign::list_of(0x04)(0x88)(0xAD)(0xE4)
            },
            pubKeyHash: 0x2E, // std::vector<unsigned char>(1, 46)
            scriptHash: 0x10, // std::vector<unsigned char>(1, 16)
            wif: 0x2B, // std::vector<unsigned char>(1, 43)
        });
    }

}