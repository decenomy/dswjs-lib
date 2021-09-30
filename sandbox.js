import bitcoinjs from 'bitcoinjs-lib';
import bip39 from 'bip39';
import { Sapphire, Jackpot } from './index.js'

// let network = {
//     messagePrefix: '\x18DarkNet Signed Message:\n',
//     bech32: 'bc', // we don't have it, however leave it like in Bitcoin
//     bip32: {
//         public: 0x022d2563, // boost::assign::list_of(0x02)(0x2D)(0x25)(0x63)
//         private: 0x0221312b, // boost::assign::list_of(0x02)(0x21)(0x31)(0x2B)
//     },
//     pubKeyHash: 0x3F, // std::vector<unsigned char>(1, 63)
//     scriptHash: 0x12, // std::vector<unsigned char>(1, 18)
//     wif: 0x19, // std::vector<unsigned char>(1, 25)
// };

// let master = bitcoinjs.bip32.fromBase58(
//     'TDt9EWvD5T5T44hAZm3pGYyn3tEa9MtyDUJqTnRbSS4gGmK1RwjkJRNiAXDe29WNQTAYBBWKb6ZK6Wf186SsgNyJ4BgxkEzgLAZbGXo8UF3toxj',
//     network);

// let child = master.derivePath("m/44'/119'/0'/0'/0'"); // 4pvrsoxZXjKaK93ikcR3qD58ixb7iX1XZQXUNoWyqyqtbbRMgW3y 2021-04-23T14:57:04Z label=Default # addr=SPEvfQMtAtdNFfJT79GfauzodjK5N5eH1r hdkeypath=m/44'/119'/0'/0'/0'

// const { address } = bitcoinjs.payments.p2pkh({
//     pubkey: child.publicKey,
//     network,
// });

// console.log(address);
// if(!child.isNeutered) {
//     console.log(c.toWIF());
// }

// console.log(bitcoinjs.address.fromBase58Check('SPEvfQMtAtdNFfJT79GfauzodjK5N5eH1r'));

const sapphire = new Sapphire(bitcoinjs, bip39);

console.log(sapphire.checkAddress('SPEvfQMtAtdNFfJT79GfauzodjK5N5eH1r')); // good address
console.log(sapphire.checkAddress('SPEvfQMtAtdNFdJT79GfauzodjK5N5eH1r')); // bad address
console.log(sapphire.checkAddress('bMcbjoJRwrim4bmEByXkpMD1VWmQMKtHPe')); // address from other chain

const jackpot = new Jackpot(bitcoinjs, bip39);

console.log(jackpot.checkAddress('75gbzE5cjtCcEHREeNJh2oFHq9X77Kbkee')); // good address
console.log(jackpot.checkAddress('75gbzE5cjtCcEHrEeNJh2oFHq9X77Kbkee')); // bad address
console.log(jackpot.checkAddress('bMcbjoJRwrim4bmEByXkpMD1VWmQMKtHPe')); // address from other chain

console.log(await sapphire.createNewWallet());