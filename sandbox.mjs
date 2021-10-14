import bitcoinjs from 'bitcoinjs-lib';
import bip39 from 'bip39';
import { Bitcoin, BitcoinTestnet, Sapphire, Jackpot, Kyanite, ChangeType } from './src/index.js'


// /* =================================== Check Address ======================================= */

// const sapphire = new Sapphire(bitcoinjs, bip39);

// console.log(sapphire.checkAddress('SPEvfQMtAtdNFfJT79GfauzodjK5N5eH1r')); // good address
// console.log(sapphire.checkAddress('SPEvfQMtAtdNFdJT79GfauzodjK5N5eH1r')); // bad address
// console.log(sapphire.checkAddress('bMcbjoJRwrim4bmEByXkpMD1VWmQMKtHPe')); // address from other chain

// const jackpot = new Jackpot(bitcoinjs, bip39);

// console.log(jackpot.checkAddress('75gbzE5cjtCcEHREeNJh2oFHq9X77Kbkee')); // good address
// console.log(jackpot.checkAddress('75gbzE5cjtCcEHrEeNJh2oFHq9X77Kbkee')); // bad address
// console.log(jackpot.checkAddress('bMcbjoJRwrim4bmEByXkpMD1VWmQMKtHPe')); // address from other chain

// let wallet = await sapphire.createNewWallet();
// console.log(wallet);
// console.log(await sapphire.recoverWallet(wallet.mnemonic));

// let { path, address } = sapphire.derive(wallet.xprv, 0, ChangeType.EXTERNAL, 0);

// console.log(path);
// console.log(address);

// console.log(sapphire.checkAddress(address));

// ({ path, address } = sapphire.derive(wallet.xprv, 0, ChangeType.INTERNAL, 0));

// console.log(path);
// console.log(address);

// console.log(sapphire.checkAddress(address));

// /* =================================== Derivation ======================================= */

// let masterPrivKey = "TDt9EWvD5T5T44hAZz5vzwQh4zrANciH1JtpxfEmD6YG87ByJ9y2DVxgjzvuguo6C8cmb1kCZtHgzVzofpF966ZpYQPvXfSoswBcr8n4BpeS7Yj";
// let masterPubKey = "ToEGyTbQh9Zvm9796xAFJuqijJuAe1LuNxcoSpJWtG5TVjaQM5qfLrd11GJx9uWzpFtx5ecPxSt934uAwspHTJ32sadQprkCY9P6q3tBpnRQVMf";

// // m/44'/832'/0'/0'/0' Receiving address on core wallet
// ({ path, address } = sapphire.derive(masterPrivKey, 0, ChangeType.EXTERNAL, 0, false)); // SWuzQunVE1YVsw27mVhYo5LcoVo8SZtm17

// console.log(path);
// console.log(address);

// console.log(sapphire.checkAddress(address));

// // m/44'/832'/0'/1'/0' Change address on core wallet
// ({ path, address } = sapphire.derive(masterPrivKey, 0, ChangeType.INTERNAL, 0, false)); // SeTreBBhB6nBuLSpyHppo4gA57UDBWAUyV

// console.log(path);
// console.log(address);

// console.log(sapphire.checkAddress(address));

// // m/44'/832'/0'/3/73
// ({ path, address } = sapphire.deriveEcommerce(masterPubKey, 73)); // ScwsYWDnJVvj4REzRSamFoEvABeEKpqYTr

// console.log(path);
// console.log(address);

// console.log(sapphire.checkAddress(address));

// // m/44'/832'/0'/3/73
// ({ path, address } = sapphire.derive(masterPrivKey, 0, ChangeType.ECOMMERCE, 73)); // ScwsYWDnJVvj4REzRSamFoEvABeEKpqYTr

// console.log(path);
// console.log(address);

// console.log(sapphire.checkAddress(address));

// /* =============================== Accounts ============================= */

// let account = sapphire.getWalletAccountXPub(masterPrivKey, 0);

// console.log(account);

// // m/44'/832'/0'/0/0 Receiving address on mobile wallet for account 0 on Sapphire and index 0
// ({ path, address } = sapphire.deriveFromAccount(account.xpub, ChangeType.EXTERNAL, 0)); // SecZRT28YUoMyvXbFzvVbS3CFcnM9rGDx5

// console.log(path);
// console.log(address);

// console.log(sapphire.checkAddress(address));

// // m/44'/832'/0'/1/0 Change address on mobile wallet for account 0 on Sapphire and index 0
// ({ path, address } = sapphire.deriveFromAccount(account.xpub, ChangeType.INTERNAL, 0)); // SSdwtuwwHx4ewkBV7MKKoxE9ExdBhfkJGz

// console.log(path);
// console.log(address);

// console.log(sapphire.checkAddress(address));

// const kyanite = new Kyanite(bitcoinjs, bip39);

// masterPrivKey = "xprv9s21ZrQH143K3QemfPR8jiFhkLZ7uTJ2bvjgot2rXD3FDeHoGDTkZws5iUFQXfhapS5epUALv4wxTUeY3Lq9uT9qhJ4QbXLKCLRAWx83NWY";
// masterPubKey = "xpub6EBcL2QgkVkqhcYemCGYxNRZgmAFX7wEmwkfCKxJoKCyWZjTamM7nekwXbQyTgbduVeQzWxAwV75hLVURQSjqP1ZQY6uARQS3ubSBWuW9q1";

// account = kyanite.getWalletAccountXPub(masterPrivKey, 0);

// console.log(account);

// // m/44'/834'/0'/0/0 Receiving address on mobile wallet for account 0 on Kyanite and index 0
// ({ path, address } = kyanite.deriveFromAccount(account.xpub, ChangeType.EXTERNAL, 0)); 

// console.log(path);
// console.log(address);

// console.log(sapphire.checkAddress(address));

// // m/44'/834'/0'/1/0 Change address on mobile wallet for account 0 on Kyanite and index 0
// ({ path, address } = kyanite.deriveFromAccount(account.xpub, ChangeType.INTERNAL, 0));

// console.log(path);
// console.log(address);

// console.log(kyanite.checkAddress(address));

/* =============================== MultiWallet ============================= */

const bitcoin = new Bitcoin(bitcoinjs, bip39);
const sapphire = new Sapphire(bitcoinjs, bip39);
const kyanite = new Kyanite(bitcoinjs, bip39);

// lets start by creating the wallet's seed using the Bitcoin network parameters
// its doesn't matter because we will store the seed in hex format without any base58 formatting
let wallet = await bitcoin.createNewWallet();

// from that wallet we get the master seed and mnemonic
const { seed, mnemonic } = wallet; 

console.log(seed);
console.log(mnemonic);

// now we will create a xpriv key suitable to use on Sapphire
const { xprv: sapp_xpriv } = sapphire.getXPriv(seed);

console.log(sapp_xpriv);

// lets create the first account for SAPP (BTW it can have more than one account at the same time)
const sapp_account = sapphire.getWalletAccountXPub(sapp_xpriv, 0);

console.log(sapp_account.xpub);

// lets create the first external address for the SAPP wallet
const { address: sapp_address } = sapphire.deriveFromAccount(sapp_account.xpub, ChangeType.EXTERNAL, 0);

console.log(sapp_address);

// lets do the same for kyanite
const { xprv: kyan_xpriv } = kyanite.getXPriv(seed);
console.log(kyan_xpriv);
const kyan_account = kyanite.getWalletAccountXPub(kyan_xpriv, 0);
const { address: kyan_address } = kyanite.deriveFromAccount(kyan_account.xpub, ChangeType.EXTERNAL, 0);
console.log(kyan_account.xpub);
console.log(kyan_address);
