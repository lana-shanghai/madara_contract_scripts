import { ec, hash, CallData, num } from 'starknet';
import { argentCairo1ClassHash } from '../../utils/constants.js';


// Generate public and private key pair.
const privateKeyAX = "YOUR_ARGENT_PRIVATE_KEY_HERE";
console.log('AX_ACCOUNT_PRIVATE_KEY=', privateKeyAX);
const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);
console.log('AX_ACCOUNT_PUBLIC_KEY=', starkKeyPubAX);

// // Calculate future address of the ArgentX account
const constructorCalldataV0 = CallData.compile({
    implementation: argentXaccountClassHash,
    selector: hash.getSelectorFromName("initialize"),
    calldata_len: 2,
    calldata: CallData.compile({ signer: starkKeyPubAX, guardian: "0" }),
});

const addressSalt = num.toHex(privateKeyAX);

const constructorCalldataV1 = CallData.compile({ signer: starkKeyPubAX, guardian: "0" });
const AXcontractAddress = hash.calculateContractAddressFromHash(starkKeyPubAX, argentCairo1ClassHash, constructorCalldataV1, 0);


console.log('Precalculated Argent account address=', AXcontractAddress);