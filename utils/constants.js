import { RpcProvider } from "starknet"; 
import { readFile } from 'fs/promises';

export const provider = new RpcProvider({
    nodeUrl: "http://localhost:9944",
});

export const preDeployedPrivateKey = "0x00c1cf1490de1352865301bb8705143f3ef938f97fdf892f1090dcb5ac7bcd1d";
export const preDeployedAddress = "0x0000000000000000000000000000000000000000000000000000000000000002";
export const feeAddress = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"; 

//new Argent X account v0.2.3
export const argentXproxyClassHash = "0x0424b7f61e3c5dfd74400d96fdea7e1f0bf2757f31df04387eaa957f095dd7b9";
export const argentXaccountClassHash = "0x06f0d6f6ae72e1a507ff4b65181291642889742dbf8f1a53e9ec1c595d01ba7d";

export const classHashHelloStarknet = "0x4a20f823b3f215e19f1767bbe220345d841ef8cdf374523913e8dcbc4f44f80";
export const erc20ClassHash = "0x4596fa4856bbf13f3448a376d607f8852148b0e6be4b958cde2ca8471a72ede";

export const classHashNoValidate = "0x35ccefcf9d5656da623468e27e682271cd327af196785df99e7fee1436b6276";

export const feeABI = JSON.parse(
    await readFile(
      new URL('../contracts/FeeContract/erc20.json', import.meta.url)
    )
);
