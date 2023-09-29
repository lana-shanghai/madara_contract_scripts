import { Account } from 'starknet';
import { provider, preDeployedAddress, preDeployedPrivateKey, classHashNoValidate } from '../../utils/constants.js';


const account = new Account(provider, preDeployedAddress, preDeployedPrivateKey, "0");

const deployResponse = await account.deployContract(
    { 
        classHash: classHashNoValidate 
    },
    {
        nonce: account.nonce,
        version: 2,
        maxFee: 100000,
    }
);

await provider.waitForTransaction( deployResponse.transaction_hash);

console.log("deployResponse", deployResponse);
