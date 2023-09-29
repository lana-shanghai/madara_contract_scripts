import { Account, Contract } from 'starknet';
import { provider, preDeployedAddress, preDeployedPrivateKey } from '../../utils/constants.js';
import { readFile } from 'fs/promises';


const sierra = JSON.parse(
    await readFile(
      new URL('../../contracts/HelloStarknet/HelloStarknet.sierra.json', import.meta.url)
    )
);

const account = new Account(provider, preDeployedAddress, preDeployedPrivateKey, "0");
const testAddress = "YOUR_HELLO_STARKNET_CONTRACT_ADDRESS"; // get from deployResponse.contract_address 
const myTestContract = new Contract(sierra.abi, testAddress, provider);
myTestContract.connect(account);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const txs = async () => {
  const bal1 = await myTestContract.get_balance();
  console.log("Initial balance =", bal1.toString());
  await sleep(1000)
  const inc = await myTestContract.increase_balance(100);
  console.log("increased balance: ", inc);
  await sleep(10000)
  const bal2 = await myTestContract.get_balance();
  console.log("Final balance =", bal2.toString());
}

txs()





