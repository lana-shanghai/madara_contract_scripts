import { Account, json } from 'starknet';
import { provider, preDeployedAddress, preDeployedPrivateKey } from '../../utils/constants.js';
import fs from "fs";

const casm = json.parse(fs.readFileSync("/path/to/madara_contract_scripts/contracts/HelloStarknet/HelloStarknet.casm.json"));
const sierra = json.parse(fs.readFileSync("/path/to/madara_contract_scripts/contracts/HelloStarknet/HelloStarknet.sierra.json"));

const account = new Account(provider, preDeployedAddress, preDeployedPrivateKey, "0");

const declareResult = await account.declare(
    {
        contract: sierra,
        casm: casm,
    },
    {
        nonce: account.nonce,
        version: 2,
        maxFee: 100000,
    }
);
console.log("declareResult", declareResult);

