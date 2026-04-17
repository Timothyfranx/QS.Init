import { Wallet } from 'ethers'

const privateKey = '0x41dc5e3ddb6d5e58898479fcd6dc409aa5dd6eabf0303f652c0526589a8915cd'
const wallet = new Wallet(privateKey)

console.log('EVM Address:', wallet.address)
