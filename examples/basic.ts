import { Account, Connex } from "../mod.ts";

const instance = new Connex("https://sync-testnet.vechain.org");

console.log(
  await instance.getAccount(
    new Account("0x5034aa590125b64023a0262112b98d72e3c8e40e"),
  ),
);

console.log(
  await instance.getTransaction(
    "0xc61b01eae38e5511e5104656f553e1cc350847716cf090f70ff6a0410ac5d85a",
  ),
);

console.log(
  await instance.createTransaction(
    "0xf86981ba800adad994000000000000000000000000000000000000746f82271080018252088001c0b8414792c9439594098323900e6470742cd877ec9f9906bca05510e421f3b013ed221324e77ca10d3466b32b1800c72e12719b213f1d4c370305399dd27af962626400",
  ),
);
