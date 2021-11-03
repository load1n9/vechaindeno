import { Account } from "./account.ts";
import { Transaction } from "./transaction.ts";

export class Connex {
  constructor(
    public baseUrl = "https://sync-mainnet.vechain.org"
  ) {}
  
  public async getAccount(acc: Account) {
    let data = await fetch(`${this.baseUrl}/accounts/${acc.publicKey}`);
    return await data.json();
  }

  public async getTransaction(transaction: Transaction) {
    let data = await fetch(`${this.baseUrl}/transactions/${transaction.id}`);
    return await data.json();
  }
}