import { Account, Contract } from 'starknet';
import { provider, erc20ClassHash, preDeployedAddress, preDeployedPrivateKey } from '../../utils/constants.js';
import { readFile } from 'fs/promises';


const sierra = JSON.parse(
    await readFile(
      new URL('../../contracts/erc20/erc20.sierra.json', import.meta.url)
    )
);


const account = new Account(provider, preDeployedAddress, preDeployedPrivateKey, "0");

const erc20Address = "YOUR_ERC20_CONTRACT_ADDRESS"; // get from deployResponse.contract_address 

const myTestContract = new Contract(sierra.abi, erc20Address, provider);

myTestContract.connect(account);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const txs = async () => {
  const bal1 = await myTestContract.balance_of(account.address);
  console.log("Initial balance =", bal1.toString());
  await sleep(1000)
  const inc = await myTestContract.transfer(1, "0x1000");
  console.log("Sent: ", inc);
  await sleep(5000)
  const bal2 = await myTestContract.balance_of(account.address);
  console.log("Final balance =", bal2.toString());
}

txs()

