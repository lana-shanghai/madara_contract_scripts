import { Account, ec, hash, CallData } from 'starknet';
import { provider, argentXaccountClassHash, argentXproxyClassHash } from '../../utils/constants.js';


// Generate public and private key pair.
const privateKeyAX = "YOUR_ARGENT_PRIVATE_KEY_HERE";
console.log('AX_ACCOUNT_PRIVATE_KEY=', privateKeyAX);
const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);
console.log('AX_ACCOUNT_PUBLIC_KEY=', starkKeyPubAX);

// Calculate future address of the ArgentX account
const AXproxyConstructorCallData = CallData.compile({
    implementation: argentXaccountClassHash,
    selector: hash.getSelectorFromName("initialize"),
    calldata: CallData.compile({ signer: starkKeyPubAX, guardian: "0" }),
});
const AXcontractAddress = hash.calculateContractAddressFromHash(
    starkKeyPubAX,
    argentXproxyClassHash,
    AXproxyConstructorCallData,
    0
);
console.log('Precalculated account address=', AXcontractAddress);

const NewAccount = new Account(provider, AXcontractAddress, privateKeyAX);

const deployAccountPayload = {
    classHash: argentXproxyClassHash,
    constructorCalldata: AXproxyConstructorCallData,
    contractAddress: AXcontractAddress,
    addressSalt: starkKeyPubAX };

const { transaction_hash, contract_address } = await NewAccount.deployAccount(
    deployAccountPayload,
);

await provider.waitForTransaction(transaction_hash);
console.log('✅ New Argent account created.\n   address =', contract_address);