import { provider } from './utils/constants.js';

const lastBlock = await provider.getBlock('latest');
console.log("lastBlock", lastBlock);


async function main() {
    
}