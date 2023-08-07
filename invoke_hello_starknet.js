import {Account, Contract, RpcProvider} from 'starknet';

import { readFile } from 'fs/promises';

const casm = JSON.parse(
  await readFile(
    new URL('./contracts/HelloStarknet/HelloStarknet.casm.json', import.meta.url)
  )
);

const sierra = JSON.parse(
    await readFile(
      new URL('./contracts/HelloStarknet/HelloStarknet.sierra.json', import.meta.url)
    )
);

const provider = new RpcProvider({
    nodeUrl: "http://localhost:9944",
});

const account = new Account(provider, '0x4', '0x1234', '1');

const testAddress = ""; // get from deployResponse.contract_address 

const myTestContract = new Contract(sierra.abi, testAddress, provider);

myTestContract.connect(account);

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const txs = async () => {
  const bal1 = await myTestContract.get_balance();
  console.log("Initial balance =", bal1.toString());
  await sleep(1000)
  const inc = await myTestContract.increase_balance(100);
  console.log("increased balance: ", inc);
  await sleep(5000)
  const bal2 = await myTestContract.get_balance();
  console.log("Final balance =", bal2.toString());
}

txs()





