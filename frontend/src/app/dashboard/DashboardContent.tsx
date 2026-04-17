'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInterwovenKit, usePortfolio } from '@initia/interwovenkit-react'
import { 
  Plus, 
  Users, 
  History, 
  LayoutDashboard,
  Wallet,
  Globe,
  RefreshCw,
  LogOut,
  Zap
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function DashboardContent() {
  const router = useRouter()
  const { address, disconnect } = useInterwovenKit()
  const { totalValue, assetGroups, isLoading, refresh } = usePortfolio()
  const [activeTab, setActiveTab] = useState('overview')

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-4)}`
  }

  return (
    <div className="flex min-h-screen bg-[#050505] industrial-grid">
      {/* SIDEBAR - REINFORCED */}
      <aside className="w-72 sidebar-glow hidden lg:flex flex-col z-50">
        <div className="p-10 border-b-2 border-primary/20">
          <div className="flex items-center gap-4">
             <Logo className="text-primary" size={36} />
             <span className="text-2xl font-black uppercase italic tracking-tighter">QS.INIT</span>
          </div>
        </div>
        
        <nav className="flex-grow p-6 space-y-4">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'splits', icon: Users, label: 'Settlements' },
            { id: 'history', icon: History, label: 'History' },
            { id: 'assets', icon: Globe, label: 'Omni-Chain' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-5 font-black uppercase tracking-[0.2em] text-[10px] transition-all
                ${activeTab === item.id 
                  ? 'bg-primary text-white shadow-[6px_6px_0_0_#000000]' 
                  : 'text-slate-500 hover:text-white'}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t-2 border-primary/10">
          <button 
            onClick={() => { disconnect(); router.push('/'); }}
            className="w-full flex items-center gap-4 px-6 py-4 font-black uppercase tracking-widest text-[10px] text-red-500 hover:text-white hover:bg-red-500 transition-all"
          >
            <LogOut size={18} />
            Disconnect
          </button>
        </div>
      </aside>

      {/* MAIN DASHBOARD AREA */}
      <main className="flex-grow flex flex-col p-12 gap-12 overflow-y-auto">
        
        {/* HEADER */}
        <header className="flex items-center justify-between pb-10 border-b-4 border-primary">
          <div>
            <h1 className="text-6xl font-black italic tracking-tighter">COMMAND CENTER</h1>
            <div className="flex items-center gap-3 mt-4">
              <span className="px-4 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em]">
                {address ? truncateAddress(address) : 'INITIATION-2'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8">
             <ThemeToggle />
             <button 
               onClick={() => router.push('/create')}
               className="btn-elite flex items-center gap-4 h-20"
             >
               <Plus size={28} strokeWidth={4} />
               New Split
             </button>
          </div>
        </header>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           <div className="card-elite bg-primary text-white border-none shadow-[10px_10px_0px_0px_#000000]">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-80 mb-6 block">Net Portfolio Value</span>
              <div className="text-6xl font-black italic tracking-tighter">
                {isLoading ? '---' : `$${totalValue?.toFixed(2) || '0.00'}`}
              </div>
              <Wallet className="absolute -right-8 -bottom-8 w-40 h-40 opacity-10 pointer-events-none" />
           </div>

           <div className="card-elite">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6 block">Settlements</span>
              <div className="text-6xl font-black italic tracking-tighter">04</div>
              <Users className="absolute -right-8 -bottom-8 w-40 h-40 opacity-5 pointer-events-none" />
           </div>

           <div className="card-elite">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6 block">Omni-Nodes</span>
              <div className="flex items-center justify-between">
                 <span className="text-6xl font-black italic tracking-tighter">
                   {isLoading ? '0' : assetGroups?.length || '0'}
                 </span>
                 <button onClick={() => refresh?.()} className="p-4 bg-white/5 hover:bg-primary/20 transition-colors">
                    <RefreshCw size={24} className={isLoading ? 'animate-spin text-primary' : 'text-slate-400'} />
                 </button>
              </div>
           </div>
        </div>

        {/* DATA GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           <div className="lg:col-span-8 flex flex-col gap-8">
              <h3 className="text-3xl font-black italic border-b-2 border-primary/20 pb-4">Multi-Chain Distribution</h3>
              <div className="space-y-4">
                {isLoading ? (
                  [1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 animate-pulse border-2 border-white/5"></div>)
                ) : assetGroups?.map((group, i) => (
                    <div key={i} className="card-elite flex items-center justify-between p-6">
                       <div className="flex items-center gap-8">
                          <div className="w-16 h-16 bg-primary/20 border-2 border-primary flex items-center justify-center font-black text-2xl text-primary">
                             {group.symbol.slice(0, 2)}
                          </div>
                          <div>
                             <div className="text-2xl font-black uppercase tracking-tighter">{group.symbol}</div>
                             <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                               {group.assets[0]?.chain?.name || 'Initia Rollup'}
                             </div>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="text-3xl font-black tracking-tighter">${group.value?.toFixed(2)}</div>
                          <div className="text-xs font-bold text-primary tracking-widest uppercase">
                            {group.amount?.toFixed(4)} {group.symbol}
                          </div>
                       </div>
                    </div>
                  ))}
              </div>
           </div>

           <div className="lg:col-span-4 flex flex-col gap-10">
              <h3 className="text-3xl font-black italic border-b-2 border-primary/20 pb-4">Activity</h3>
              <div className="card-elite bg-white/5 flex flex-col items-center justify-center py-24 border-dashed border-primary/20">
                 <Users size={64} className="text-primary/20 mb-6" />
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">No active settlement groups</p>
              </div>
              
              <div className="card-elite border-primary/40 bg-primary/5">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">AI Sweeper</span>
                    <Zap size={20} className="text-primary animate-pulse" fill="currentColor" />
                 </div>
                 <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest italic">Scanning Rollups for Dust...</p>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}
