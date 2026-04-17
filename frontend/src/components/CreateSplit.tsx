'use client'

import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { QuickSplitABI } from '../contracts/QuickSplitABI'
import { QUICKSPLIT_CONTRACT } from '../config/contract'
import { miniEVMTestnet } from '../config/wagmi'

export default function CreateSplit() {
  const [formData, setFormData] = useState({
    totalAmount: '',
    token: '',
    description: '',
    deadline: '',
    maxParticipants: '10',
  })

  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const deadlineTimestamp = Math.floor(new Date(formData.deadline).getTime() / 1000)

    writeContract({
      address: QUICKSPLIT_CONTRACT.address as `0x${string}`,
      abi: QuickSplitABI,
      functionName: 'createSplit',
      args: [
        BigInt(formData.totalAmount),
        formData.token as `0x${string}`,
        formData.description,
        BigInt(deadlineTimestamp),
        BigInt(formData.maxParticipants),
      ],
      chainId: miniEVMTestnet.id,
    })
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Split Created!</h2>
          <p className="text-gray-600 mb-4">Share this link with your friends:</p>
          <div className="flex gap-2">
            <code className="bg-gray-100 p-3 rounded-lg text-sm break-all flex-1">
              {typeof window !== 'undefined' && `${window.location.origin}/split/1`}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(`${window.location.origin}/split/1`)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: Update split ID after contract deployment
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2">Create Split</h1>
        <p className="text-gray-500 text-center mb-6">Split bills, not chains</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              required
              placeholder="Dinner with friends"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Amount (in token units)
            </label>
            <input
              type="number"
              required
              min="1"
              placeholder="100"
              value={formData.totalAmount}
              onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Token Address
            </label>
            <input
              type="text"
              required
              placeholder="0x..."
              value={formData.token}
              onChange={(e) => setFormData({ ...formData, token: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="datetime-local"
              required
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Participants
            </label>
            <input
              type="number"
              required
              min="2"
              max="100"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isPending || isConfirming}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Creating...' : isConfirming ? 'Confirming...' : 'Create Split'}
          </button>
        </form>
      </div>
    </div>
  )
}
