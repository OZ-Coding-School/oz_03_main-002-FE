// declarations.d.ts
declare module 'crypto-js';
declare module 'uuid';

declare module 'crypto-js/sha256' {
  import { Hash } from 'crypto-js';

  const sha256: (message: string | any) => Hash;
  export = sha256;
}
