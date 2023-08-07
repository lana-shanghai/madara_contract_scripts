import { RpcProvider } from 'starknet';


const provider = new RpcProvider({
    nodeUrl: "http://localhost:9944",
});

const lastBlock = await provider.getBlock('latest');
console.log("lastBlock", lastBlock);


async function main() {
    
}