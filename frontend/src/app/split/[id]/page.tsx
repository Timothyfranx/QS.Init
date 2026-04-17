'use client'

import dynamic from 'next/dynamic'

const SplitDetailContent = dynamic(() => import('./SplitDetailContent'), { ssr: false })

export default function SplitDetailPage() {
  return <SplitDetailContent />
}
