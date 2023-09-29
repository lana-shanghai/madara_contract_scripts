## Scripts for using starknet.js with Madara

`node --version`
`v20.7.0`

`npm install`

Test that Madara is running and you can fetch the latest block from the RPC 

`node index.js`

### Declare, deploy and invoke contracts from a predeployed address:

`node scripts/hello_starknet/declare_hello_starknet.js`
`node scripts/hello_starknet/deploy_hello_starknet.js`

After deployment, fetch the address of the new contract to use in invocations from `deployResponse`:

```
deployResponse {
  transaction_hash: '0x4c43c287fa7441e2d0587a69277acbe3f336ee9f4af07d893c4b1bfc8f3ca4b',
  contract_address: '0x536a7c262d957b781e9daa9c495fb2b757860f6e3e7f76cfe90bccd888052d4',
  address: '0x536a7c262d957b781e9daa9c495fb2b757860f6e3e7f76cfe90bccd888052d4',
  deployer: '0x2',
  unique: '0x1',
  classHash: '0x4a20f823b3f215e19f1767bbe220345d841ef8cdf374523913e8dcbc4f44f80',
  calldata_len: '0x0',
  calldata: [],
  salt: '0x632ebe8e6d00bc4d682559e07bf7f058bc43196db1db55275661ebba89a45a'
}
```

Now invoke the contract: 

`node scripts/hello_starknet/invoke_hello_starknet.js`

### Test erc20

`node scripts/erc20/declare_erc20.js`
`node scripts/erc20/deploy_erc20.js`

Fetch contract address for the invoke: 

`node scripts/erc20/invoke_erc20.js`

### Deploy your own Argent address and test the same flows from your own account 

Using your Argent private key:

`node scripts/argent_account/compute_argent_address.js` -> fetch precomputed address

Transfer balance to your precomputed address from the predeployed address:

`node scripts/argent_account/transfer_balance.js`

Deploy an Argent account on Madara: 

`node scripts/argent_account/deploy_argent_address.js`


