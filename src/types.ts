import { Buffer } from "https://deno.land/x/node_buffer@1.1.0/mod.ts";

export interface Net {
  readonly baseURL: string;

  http(
    method: "GET" | "POST",
    path: string,
    params?: Params,
  ): Promise<any>;

  openWebSocketReader(path: string): WebSocketReader;
}

export interface Params {
  query?: Record<string, string>;
  body?: any;
  headers?: Record<string, string>;
  validateResponseHeader?: (headers: Record<string, string>) => void;
}

export interface WebSocketReader {
  read(): Promise<any>;
  close(): void;
}

export interface Wallet {
  readonly list: Key[];
}

export interface Key {
  address: string;
  sign(msgHash: typeof Buffer): Promise<typeof Buffer>;
}
