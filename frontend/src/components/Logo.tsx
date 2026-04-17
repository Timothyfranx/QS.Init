'use client'

import React from 'react'

export function Logo({ size = 40, className = "" }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top Dot as Lightning */}
      <path d="M50 5L42 25H58L50 45" stroke="currentColor" strokeWidth="8" strokeLinecap="square"/>
      
      {/* Division Line */}
      <rect x="15" y="46" width="70" height="8" fill="currentColor"/>
      
      {/* Bottom Dot as Lightning */}
      <path d="M50 55L42 75H58L50 95" stroke="currentColor" strokeWidth="8" strokeLinecap="square"/>
    </svg>
  )
}
