import elliptic from "https://cdn.skypack.dev/elliptic";
import { Buffer } from "https://deno.land/x/node_buffer@1.1.0/mod.ts";
import randomBytes from 'https://cdn.skypack.dev/randombytes';


const EC = elliptic.ec;
const curve = new EC("secp256k1");

const N = Buffer.from(
  "fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141",
  "hex",
);
const ZERO = Buffer.alloc(32, 0);

function isValidPrivateKey(key: any) {
  return Buffer.isBuffer(key) && key.length === 32 && !key.equals(ZERO);
}

function isValidMessageHash(hash: typeof Buffer) {
  return Buffer.isBuffer(hash) && hash.length === 32;
}

/** secp256k1 methods set */
export class Secp256k1 {
  public static generatePrivateKey(rng?: () => typeof Buffer) {
    rng = rng || (() => randomBytes(32));
    for (;;) {
      const privKey = rng();
      if (isValidPrivateKey(privKey)) {
        return privKey;
      }
    }
  }

  public static derivePublicKey(privKey: any) {
    if (!isValidPrivateKey(privKey)) {
      throw new Error("invalid private key");
    }
    const keyPair = curve.keyFromPrivate(privKey);
    return Buffer.from(keyPair.getPublic().encode("array", false) as any);
  }

  /**
   * sign a message using elliptic curve algorithm on the curve secp256k1
   * @param msgHash hash of message
   * @param privKey serialized private key
   */
  public static sign(msgHash: typeof Buffer, privKey: typeof Buffer) {
    if (!isValidMessageHash(msgHash)) {
      throw new Error("invalid message hash");
    }

    if (!isValidPrivateKey(privKey)) {
      throw new Error("invalid private key");
    }

    const keyPair = curve.keyFromPrivate(privKey);
    const sig = keyPair.sign(msgHash, { canonical: true });

    const r = Buffer.from(sig.r.toArray("be", 32));
    const s = Buffer.from(sig.s.toArray("be", 32));

    return Buffer.concat([r, s, Buffer.from([sig.recoveryParam!])], 32);
  }

  public static recover(msgHash: any, sig: any) {
    if (!isValidMessageHash(msgHash)) {
      throw new Error("invalid message hash");
    }
    if (!Buffer.isBuffer(sig) || sig.length !== 65) {
      throw new Error("invalid signature");
    }
    const recovery = sig[64];
    if (recovery !== 0 && recovery !== 1) {
      throw new Error("invalid signature recovery");
    }

    const r = sig.slice(0, 32);
    const s = sig.slice(32, 64);

    return Buffer.from(
      curve.recoverPubKey(
        msgHash,
        { r, s },
        recovery,
      ).encode("array", false),
    );
  }
}
