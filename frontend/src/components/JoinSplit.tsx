'use client'

import { useState } from 'react'
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { QuickSplitABI } from '../contracts/QuickSplitABI'
import { QUICKSPLIT_CONTRACT } from '../config/contract'
import { miniEVMTestnet } from '../config/wagmi'

interface JoinSplitProps {
  splitId: string
}

export default function JoinSplit({ splitId }: JoinSplitProps) {
  const [amount, setAmount] = useState('')
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const { data: splitData, isLoading: isLoadingSplit, refetch: refetchSplit } = useReadContract({
    address: QUICKSPLIT_CONTRACT.address as `0x${string}`,
    abi: QuickSplitABI,
    functionName: 'getSplit',
    args: [BigInt(splitId)],
    chainId: miniEVMTestnet.id,
  })

  const { data: contribution, refetch: refetchContribution } = useReadContract({
    address: QUICKSPLIT_CONTRACT.address as `0x${string}`,
    abi: QuickSplitABI,
    functionName: 'getContribution',
    args: [BigInt(splitId), address as `0x${string}`],
    chainId: miniEVMTestnet.id,
    query: {
      enabled: isConnected && !!address,
    },
  })

  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleContribute = () => {
    if (!amount) return

    writeContract({
      address: QUICKSPLIT_CONTRACT.address as `0x${string}`,
      abi: QuickSplitABI,
      functionName: 'contribute',
      args: [BigInt(splitId), BigInt(amount)],
      chainId: miniEVMTestnet.id,
    })
  }

  if (isSuccess) {
    refetchContribution()
    refetchSplit()
    setAmount('')
  }

  if (isLoadingSplit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
        <div className="text-white text-2xl">Loading split...</div>
      </div>
    )
  }

  if (!splitData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Split Not Found</h2>
          <p className="text-gray-600">This split ID doesn't exist.</p>
        </div>
      </div>
    )
  }

  const [creator, totalAmount, settlementToken, settled, cancelled, amountCollected, deadline, description] = splitData

  const progress = Number(amountCollected) / Number(totalAmount) * 100
  const isComplete = settled || cancelled
  const isExpired = Date.now() > Number(deadline) * 1000

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-2">{description || 'Bill Split'}</h1>
        <p className="text-gray-500 mb-6">Split ID: {splitId}</p>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-semibold">{totalAmount.toString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Collected:</span>
            <span className="font-semibold">{amountCollected.toString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <span className={`font-semibold ${settled ? 'text-green-600' : cancelled ? 'text-red-600' : isExpired ? 'text-orange-600' : 'text-blue-600'}`}>
              {settled ? 'Completed ✓' : cancelled ? 'Cancelled' : isExpired ? 'Expired' : 'Active'}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="text-gray-600">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all ${settled ? 'bg-green-500' : cancelled ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {isComplete ? (
          <div className={`p-4 rounded-lg text-center ${settled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <p className="font-semibold">
              {settled ? 'This split has been completed!' : 'This split has been cancelled.'}
            </p>
          </div>
        ) : isExpired ? (
          <div className="p-4 rounded-lg bg-orange-100 text-orange-800 text-center">
            <p className="font-semibold">This split has expired.</p>
          </div>
        ) : (
          <>
            {isConnected && address ? (
              <div className="space-y-4">
                {contribution && Number(contribution) > 0 && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Your contribution: <span className="font-semibold">{contribution.toString()}</span>
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Contribution
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Amount to contribute"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleContribute}
                  disabled={isPending || isConfirming || !amount}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Approving...' : isConfirming ? 'Confirming...' : 'Pay Now'}
                </button>

                {isSuccess && (
                  <div className="p-3 bg-green-100 text-green-800 rounded-lg text-center">
                    Payment successful! ✓
                  </div>
                )}

                <button
                  onClick={() => disconnect()}
                  className="w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector: connectors[0] })}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
              >
                Connect Wallet to Pay
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
