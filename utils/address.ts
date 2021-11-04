import { keccak256 } from './mod.ts'

export class Address {
    static fromPublicKey(pub: any) {
        return '0x' + keccak256(pub.slice(1)).slice(12).toString()
    }
    static test(v: any): v is string {
        return typeof v === 'string' && /^0x[0-9a-f]{40}$/i.test(v)
    }
    toChecksumed(addr: string) {
        if (!Address.test(addr)) {
            throw new Error('invalid address')
        }
        addr = addr.slice(2).toLowerCase()
        const hash = keccak256(addr)

        let checksumed = '0x'
        for (let i = 0; i < addr.length; i++) {
            let byte = hash[i >> 1]
            if (i % 2 === 0) {
                byte >>= 4
            }

            if (byte % 16 >= 8) {
                checksumed += addr[i].toUpperCase()
            } else {
                checksumed += addr[i]
            }
        }
        return checksumed
    }

}
