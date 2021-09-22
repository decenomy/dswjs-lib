const bitcoin = require('bitcoinjs-lib');

let network = {
    messagePrefix: '\x18DarkNet Signed Message:\n',
    bech32: 'bc', // we don't have it, however leave it like in Bitcoin
    bip32: {
        public: 0x022d2563, // boost::assign::list_of(0x02)(0x2D)(0x25)(0x63)
        private: 0x0221312b, // boost::assign::list_of(0x02)(0x21)(0x31)(0x2B)
    },
    pubKeyHash: 0x3F, // std::vector<unsigned char>(1, 63)
    scriptHash: 0x12, // std::vector<unsigned char>(1, 18)
    wif: 0x19, // std::vector<unsigned char>(1, 25)
};

let master = bitcoin.bip32.fromBase58(
    'TDt9EWvD5T5T44hAZm3pGYyn3tEa9MtyDUJqTnRbSS4gGmK1RwjkJRNiAXDe29WNQTAYBBWKb6ZK6Wf186SsgNyJ4BgxkEzgLAZbGXo8UF3toxj',
    network);

let child = master.derivePath("m/44'/119'/0'/0'/0'"); // 4pvrsoxZXjKaK93ikcR3qD58ixb7iX1XZQXUNoWyqyqtbbRMgW3y 2021-04-23T14:57:04Z label=Default # addr=SPEvfQMtAtdNFfJT79GfauzodjK5N5eH1r hdkeypath=m/44'/119'/0'/0'/0'

const { address } = bitcoin.payments.p2pkh({
    pubkey: child.publicKey,
    network,
});

console.log(address);
if(!child.isNeutered) {
    console.log(c.toWIF());
}