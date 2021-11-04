import { Buffer } from "https://deno.land/x/node_buffer@1.1.0/mod.ts";
import blake from 'https://cdn.skypack.dev/blakejs';

export function blake2b256(...data: Array<any | string>) {
    const ctx = blake.blake2bInit(32, null)
    data.forEach(d => {
        if (Buffer.isBuffer(d)) {
            blake.blake2bUpdate(ctx, d)
        } else {
            blake.blake2bUpdate(ctx, Buffer.from(d, 'utf8'))
        }
    })
    return Buffer.from(blake.blake2bFinal(ctx))
}