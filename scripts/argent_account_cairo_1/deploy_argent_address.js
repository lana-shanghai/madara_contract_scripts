import { Account, ec, hash, CallData, num } from 'starknet';
import { provider, argentCairo1ClassHash } from '../../utils/constants.js';


// Generate public and private key pair.
const privateKeyAX = "YOUR_ARGENT_PRIVATE_KEY_HERE";
console.log('AX_ACCOUNT_PRIVATE_KEY=', privateKeyAX);
const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);
console.log('AX_ACCOUNT_PUBLIC_KEY=', starkKeyPubAX);

const addressSalt = num.toHex(privateKeyAX);
const constructorCalldata = CallData.compile({ signer: starkKeyPubAX, guardian: "0" });
const AXcontractAddress = hash.calculateContractAddressFromHash(addressSalt, argentCairo1ClassHash, constructorCalldata, 0);
//const AXcontractAddress = "CONTRACT_ADDRESS_FROM_MADARA_LOGS"; // or replace with address from Madara logs
console.log('Precalculated account address=', AXcontractAddress);

const NewAccount = new Account(provider, AXcontractAddress, privateKeyAX);

const deployAccountPayload = {
    classHash: argentCairo1ClassHash,
    constructorCalldata: constructorCalldata,
    contractAddress: AXcontractAddress,
    addressSalt: starkKeyPubAX 
};

const { transaction_hash, contract_address } = await NewAccount.deployAccount(
        deployAccountPayload,
    {
        nonce: NewAccount.nonce,
        version: 2,
        maxFee: 100000,
    }
);

await provider.waitForTransaction(transaction_hash);
console.log('✅ New Argent account created.\n   address =', contract_address);