import { Account, cairo, Contract } from 'starknet';
import { provider, preDeployedAddress, preDeployedPrivateKey, feeABI, feeAddress } from '../../utils/constants.js';


const account = new Account(provider, preDeployedAddress, preDeployedPrivateKey, "0");
const feeContract = new Contract(feeABI.abi, feeAddress, provider);
feeContract.connect(account);

const recipientAddress = "YOUR_COMPUTED_ADDRESS_HERE"; // get from "scripts/argent_account/compute_address.js"
const amount = cairo.uint256(100000000000000);

const { transaction_hash: transferTxHash } = await feeContract.transfer(
        recipientAddress, 
        amount, 
    {
        nonce: account.nonce,
        version: 1,
        maxFee: 200000,
    });

console.log(`Waiting for Tx to be Accepted - Transfer...`);

const transferResult = await provider.waitForTransaction(transferTxHash);

console.log("Transaction result balance transfer: ", transferResult);


const bal = await feeContract.balanceOf(recipientAddress);
console.log("Final balance =", bal.balance);