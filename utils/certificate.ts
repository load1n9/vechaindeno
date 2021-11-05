import { Address, blake2b256, Secp256k1 } from "./mod.ts";
import { Buffer } from "https://deno.land/x/node_buffer@1.1.0/mod.ts";
import fastJsonStableStringify from "https://cdn.skypack.dev/fast-json-stable-stringify";

export interface Certificate {
  purpose: string;
  payload: {
    type: string;
    content: string;
  };

  domain: string;
  timestamp: number;
  signer: string;

  signature?: string;
}

export class Certificate {
  public static safeToLowerCase(str: string) {
    return typeof str === "string" ? str.toLowerCase() : str;
  }

  public static encode(cert: Certificate) {
    return fastJsonStableStringify({
      ...cert,
      signer: Certificate.safeToLowerCase(cert.signer),
      signature: cert.signature
        ? Certificate.safeToLowerCase(cert.signature)
        : cert.signature,
    }) as string;
  }

  public static verify(cert: Certificate) {
    if (!cert.signature) {
      throw new Error("signature missing");
    }
    const signature = cert.signature;
    if (!/^0x[0-9a-f]+$/i.test(signature) || signature.length % 2 !== 0) {
      throw new Error("invalid signature");
    }

    const encoded = Certificate.encode({ ...cert, signature: undefined });
    const signingHash = blake2b256(encoded);

    const pubKey = Secp256k1.recover(
      signingHash,
      Buffer.from(signature.slice(2), "hex"),
    );

    if (
      Address.fromPublicKey(pubKey) !== Certificate.safeToLowerCase(cert.signer)
    ) {
      throw new Error("signature does not match with signer");
    }
  }
}
