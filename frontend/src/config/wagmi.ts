import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'

export const miniEVMTestnet = {
  id: 2124225178762456,
  name: 'MiniEVM Testnet',
  nativeCurrency: { name: 'INIT', symbol: 'INIT', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://json-rpc.minievm-2.initia.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Initia Scan', url: 'https://scan.testnet.initia.xyz/evm-1' },
  },
  testnet: true,
} as const

export const config = createConfig({
  chains: [miniEVMTestnet, mainnet],
  transports: {
    [miniEVMTestnet.id]: http(),
    [mainnet.id]: http(),
  },
})
