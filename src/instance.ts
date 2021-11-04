import { Account } from "./account.ts";

export class Connex {
  constructor(
    public baseUrl = "https://sync-mainnet.vechain.org",
  ) {}

  public async getAccount(acc: Account) {
    const data = await fetch(`${this.baseUrl}/accounts/${acc.publicKey}`);
    return await data.json();
  }

  public async getTransaction(id: string) {
    const data = await fetch(`${this.baseUrl}/transactions/${id}`);
    return await data.json();
  }
  public async createTransaction(raw: string) {
    const data = await fetch(`${this.baseUrl}/transactions`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        raw
       }),
    });
    return await data.json();
  }
  public async getBlock(id = "best") {
    const data = await fetch(`${this.baseUrl}/blocks/${id}`);
    return await data.json();
  }
  public async getPeers() {
    const data = await fetch(`${this.baseUrl}/node/network/peers`);
    return await data.json();
  }
}
