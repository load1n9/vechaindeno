import { Connex, Account, Transaction } from "../mod.ts";

let instance = new Connex("https://sync-testnet.vechain.org");

console.log(await instance.getAccount(
  new Account("0x5034aa590125b64023a0262112b98d72e3c8e40e")
));
console.log(await instance.getTransaction(
  new Transaction("0xc61b01eae38e5511e5104656f553e1cc350847716cf090f70ff6a0410ac5d85a")
));