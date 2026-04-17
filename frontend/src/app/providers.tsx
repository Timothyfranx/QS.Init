'use client'

import { InterwovenKitProvider, TESTNET, initiaPrivyWallet } from '@initia/interwovenkit-react'
import '@initia/interwovenkit-react/styles.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { ThemeProvider, useTheme } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'
import { config } from '../config/wagmi'

const queryClient = new QueryClient()

function InterwovenKitWithTheme({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = (resolvedTheme === 'dark' ? 'dark' : 'light') as 'dark' | 'light'

  if (!mounted) return <>{children}</>

  return (
    <InterwovenKitProvider
      {...TESTNET}
      defaultChainId="initiation-2"
      theme={currentTheme}
      // Pass the social wallet to the selection list
      cosmosWallets={[...(TESTNET.cosmosWallets || []), initiaPrivyWallet() as any]}
    >
      {children}
    </InterwovenKitProvider>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <InterwovenKitWithTheme>
            {children}
          </InterwovenKitWithTheme>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
