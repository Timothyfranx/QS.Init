'use client'

import dynamic from 'next/dynamic'

const JoinContent = dynamic(() => import('./JoinContent'), { ssr: false })

export default function JoinPage() {
  return <JoinContent />
}
