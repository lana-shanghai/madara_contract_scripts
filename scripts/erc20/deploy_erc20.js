import { Account } from 'starknet';
import { provider, erc20ClassHash, preDeployedAddress, preDeployedPrivateKey } from '../../utils/constants.js';


const account = new Account(provider, preDeployedAddress, preDeployedPrivateKey, "0");

const deployResponse = await account.deployContract(
    {
        classHash: erc20ClassHash,
        constructorCalldata: [
          1, // Token Name
          1, // Token Symbol
          1, // Token Decimals
          "0xffffffffffffffffffffffffffffffff", // Initial Supply
          "0xffffffffffffffffffffffffffffffff", // Initial Supply Cont { since u256 }
          account.address, // Recipient
        ],
    }
);

await provider.waitForTransaction( deployResponse.transaction_hash);

console.log("deployResponse", deployResponse);
