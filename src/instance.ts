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
      body: /*JSON.stringify({ 
        raw
       })*/'{"raw":"0xf87c278743b11e180ba16912dfde94f2e7617c45c42967fde0514b5aa6bba56e3e11dd872386f26fc1000080808252088088dd0e2a8c3986a7c5c0b841b610b19940246633b63b4f8cb8abdf10ea4086e5649cbf3554829ad4458f12a717b0840bcab1d30f83148a001d8cffab11fea7ac4a21b02ee00e6a0479d03f0401"}',
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
