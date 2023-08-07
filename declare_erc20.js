import {Account, RpcProvider} from 'starknet';

import { readFile } from 'fs/promises';

const casm = JSON.parse(
  await readFile(
    new URL('./contracts/erc20/erc20.casm.json', import.meta.url)
  )
);

const sierra = JSON.parse(
    await readFile(
      new URL('./contracts/erc20/erc20.sierra.json', import.meta.url)
    )
);

const provider = new RpcProvider({
    nodeUrl: "http://localhost:9944",
});

const account = new Account(provider, '0x4', '0x1234', '1');

const declareResult = await account.declare(
    {
        contract: sierra,
        casm: casm,
    },
    {
        nonce: account.value,
        version: 2,
    }
);
console.log("declareResult", declareResult);