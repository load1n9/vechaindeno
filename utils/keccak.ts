import { Buffer } from "https://deno.land/x/node_buffer@1.1.0/mod.ts";
import { keccak_256 as keccak  } from 'https://cdn.skypack.dev/js-sha3';

export function keccak256(...data: Array<any | string>) {
  const h = keccak.create();
  data.forEach((d) => {
    if (Buffer.isBuffer(d)) {
      h.update(d);
    } else {
      h.update(Buffer.from(d, "utf-8"));
    }
  });
  return Buffer.from(h.digest());
}
