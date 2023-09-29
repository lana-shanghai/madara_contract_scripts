import { Account } from 'starknet';
import { provider, preDeployedAddress, preDeployedPrivateKey } from '../../utils/constants.js';

import { readFile } from 'fs/promises';

const casm = JSON.parse(
  await readFile(
    new URL('../../contracts/HelloStarknet/HelloStarknet.casm.json', import.meta.url)
  )
);

const sierra = JSON.parse(
    await readFile(
      new URL('../../contracts/HelloStarknet/HelloStarknet.sierra.json', import.meta.url)
    )
);


const account = new Account(provider, preDeployedAddress, preDeployedPrivateKey, "0");

const declareResult = await account.declare(
    {
        contract: sierra,
        casm: casm,
    },
    {
        nonce: account.nonce,
        version: 2,
        maxFee: 10000,
    }
);
console.log("declareResult", declareResult);

