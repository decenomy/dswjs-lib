import bitcoinjs from 'bitcoinjs-lib';
import bip39 from 'bip39';
import { Bitcoin, Sapphire, Jackpot } from './index.js'


/* =================================== Check Address ======================================= */

const sapphire = new Sapphire(bitcoinjs, bip39);

console.log(sapphire.checkAddress('SPEvfQMtAtdNFfJT79GfauzodjK5N5eH1r')); // good address
console.log(sapphire.checkAddress('SPEvfQMtAtdNFdJT79GfauzodjK5N5eH1r')); // bad address
console.log(sapphire.checkAddress('bMcbjoJRwrim4bmEByXkpMD1VWmQMKtHPe')); // address from other chain

const jackpot = new Jackpot(bitcoinjs, bip39);

console.log(jackpot.checkAddress('75gbzE5cjtCcEHREeNJh2oFHq9X77Kbkee')); // good address
console.log(jackpot.checkAddress('75gbzE5cjtCcEHrEeNJh2oFHq9X77Kbkee')); // bad address
console.log(jackpot.checkAddress('bMcbjoJRwrim4bmEByXkpMD1VWmQMKtHPe')); // address from other chain

let wallet = await sapphire.createNewWallet();
console.log(wallet);
console.log(await sapphire.recoverWallet(wallet.mnemonic));

let { path, address } = sapphire.derive(wallet.xprv, 0, Sapphire.ChangeType.EXTERNAL, 0);

console.log(path);
console.log(address);

console.log(sapphire.checkAddress(address));

({ path, address } = sapphire.derive(wallet.xprv, 0, Sapphire.ChangeType.INTERNAL, 0));

console.log(path);
console.log(address);

console.log(sapphire.checkAddress(address));

/* =================================== Derivation ======================================= */

const masterPrivKey = "TDt9EWvD5T5T44hAZz5vzwQh4zrANciH1JtpxfEmD6YG87ByJ9y2DVxgjzvuguo6C8cmb1kCZtHgzVzofpF966ZpYQPvXfSoswBcr8n4BpeS7Yj";
const masterPubKey = "ToEGyTbQh9Zvm9796xAFJuqijJuAe1LuNxcoSpJWtG5TVjaQM5qfLrd11GJx9uWzpFtx5ecPxSt934uAwspHTJ32sadQprkCY9P6q3tBpnRQVMf";

// m/44'/832'/0'/0'/0' Receiving address on core wallet
({ path, address } = sapphire.derive(masterPrivKey, 0, Sapphire.ChangeType.EXTERNAL, 0, false)); // SWuzQunVE1YVsw27mVhYo5LcoVo8SZtm17

console.log(path);
console.log(address);

console.log(sapphire.checkAddress(address));

// m/44'/832'/0'/1'/0' Change address on core wallet
({ path, address } = sapphire.derive(masterPrivKey, 0, Sapphire.ChangeType.INTERNAL, 0, false)); // SeTreBBhB6nBuLSpyHppo4gA57UDBWAUyV

console.log(path);
console.log(address);

console.log(sapphire.checkAddress(address));

// m/44'/832'/0'/3/73
({ path, address } = sapphire.deriveEcommerce(masterPubKey, 73)); // ScwsYWDnJVvj4REzRSamFoEvABeEKpqYTr

console.log(path);
console.log(address);

console.log(sapphire.checkAddress(address));

// m/44'/832'/0'/3/73
({ path, address } = sapphire.derive(masterPrivKey, 0, Sapphire.ChangeType.ECOMMERCE, 73)); // ScwsYWDnJVvj4REzRSamFoEvABeEKpqYTr

console.log(path);
console.log(address);

console.log(sapphire.checkAddress(address));

/* =============================== Accounts ============================= */

let account = sapphire.getWalletAccountXPub(masterPrivKey, 0);

console.log(account);

// m/44'/832'/0'/0/0 Receiving address on mobile wallet for account 0 on Sapphire and index 0
({ path, address } = sapphire.deriveFromAccount(account.xpub, Sapphire.ChangeType.EXTERNAL, 0)); // SecZRT28YUoMyvXbFzvVbS3CFcnM9rGDx5

console.log(path);
console.log(address);

console.log(sapphire.checkAddress(address));

// m/44'/832'/0'/1/0 Change address on mobile wallet for account 0 on Sapphire and index 0
({ path, address } = sapphire.deriveFromAccount(account.xpub, Sapphire.ChangeType.INTERNAL, 0)); // SSdwtuwwHx4ewkBV7MKKoxE9ExdBhfkJGz

console.log(path);
console.log(address);

console.log(sapphire.checkAddress(address));