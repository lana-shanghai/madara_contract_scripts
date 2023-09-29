import { Account } from 'starknet';
import { provider, preDeployedAddress, preDeployedPrivateKey, classHashHelloStarknet } from '../../utils/constants.js';


const account = new Account(provider, preDeployedAddress, preDeployedPrivateKey, "0");

const deployResponse = await account.deployContract(
    { 
        classHash: classHashHelloStarknet 
    },
    {
        nonce: account.nonce,
        version: 2,
        maxFee: 100000,
    }
);

await provider.waitForTransaction( deployResponse.transaction_hash);

console.log("deployResponse", deployResponse);
