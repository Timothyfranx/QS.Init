'use client'

import dynamic from 'next/dynamic'

const CreateSplitContent = dynamic(() => import('./CreateSplitContent'), { ssr: false })

export default function CreateSplitPage() {
  return <CreateSplitContent />
}
