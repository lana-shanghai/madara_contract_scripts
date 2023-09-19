import {Account, RpcProvider} from 'starknet';

const provider = new RpcProvider({
    nodeUrl: "http://localhost:9944",
});

const account = new Account(provider, "0x00c1cf1490de1352865301bb8705143f3ef938f97fdf892f1090dcb5ac7bcd1d", "0x0000000000000000000000000000000000000000000000000000000000000002", "1");

const testClassHash = "0x9cf5ef6166edaa87767d05bbfd54ad02fd110028597343a200e82949ce05cf";

const deployResponse = await account.deployContract({ classHash: testClassHash });
await provider.waitForTransaction( deployResponse.transaction_hash);

console.log("deployResponse", deployResponse);
