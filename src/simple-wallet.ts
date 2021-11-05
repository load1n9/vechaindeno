import { Buffer } from "https://deno.land/x/node_buffer@1.1.0/mod.ts";
import { Wallet } from './types.ts'
import { Secp256k1, Address } from '../utils/mod.ts'

export class SimpleWallet implements Wallet {
    private readonly keys = [] as KeyEntity[]

    get list(): any[] {
        return this.keys.map(k => {
            return {
                address: k.address,
                sign(msgHash:typeof  Buffer) {
                    return Promise.resolve(Secp256k1.sign(msgHash, k.privateKey))
                }
            }
        })
    }

    public import(privateKey: string): string {
        if (privateKey.startsWith('0x')) {
            privateKey = privateKey.slice(2)
        }
        if (!/^[0-9a-f]{64}$/i.test(privateKey)) {
            throw new Error('invalid private key')
        }
        const buf = Buffer.from(privateKey, 'hex')
        const addr = Address.fromPublicKey(Secp256k1.derivePublicKey(buf))
        this.keys.push({ address: addr, privateKey: buf })
        return addr
    }

    public remove(addr: string): boolean {
        const i = this.keys.findIndex(k => k.address === addr.toLowerCase())
        if (i >= 0) {
            this.keys.splice(i, 1)
            return true
        }
        return false
    }
}

interface KeyEntity {
    privateKey: any
    address: string
}