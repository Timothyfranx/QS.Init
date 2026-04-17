'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInterwovenKit, usePortfolio } from '@initia/interwovenkit-react'
import { 
  Plus, 
  Users, 
  ArrowUpRight, 
  History, 
  LayoutDashboard,
  Wallet,
  Globe,
  RefreshCw,
  LogOut
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function DashboardContent() {
  const router = useRouter()
  const { address, disconnect } = useInterwovenKit()
  const { totalValue, assetGroups, isLoading, refresh } = usePortfolio()
  const [activeTab, setActiveTab] = useState('overview')

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const handleDisconnect = () => {
    disconnect()
    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-black transition-colors duration-500 industrial-grid">
      {/* SIDEBAR */}
      <aside className="w-64 border-r-2 border-primary/20 glass hidden lg:flex flex-col">
        <div className="p-8 border-b-2 border-primary/10">
          <div className="flex items-center gap-3">
             <Logo className="text-primary" size={32} />
             <span className="text-2xl font-black uppercase italic tracking-tighter">QS.INIT</span>
          </div>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'splits', icon: Users, label: 'My Splits' },
            { id: 'history', icon: History, label: 'History' },
            { id: 'assets', icon: Globe, label: 'Multi-Chain' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 font-black uppercase tracking-widest text-[10px] transition-all
                ${activeTab === item.id 
                  ? 'bg-primary text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                  : 'hover:bg-primary/10 text-slate-500 hover:text-primary'}`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t-2 border-primary/10">
          <button 
            onClick={handleDisconnect}
            className="w-full flex items-center gap-3 px-4 py-3 font-black uppercase tracking-widest text-[10px] text-red-500 hover:bg-red-500 hover:text-white transition-all"
          >
            <LogOut size={16} />
            Disconnect
          </button>
        </div>
      </aside>

      {/* MAIN DASHBOARD AREA */}
      <main className="flex-grow flex flex-col p-6 lg:p-12 gap-8 overflow-y-auto">
        {/* TOP BAR */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b-2 border-primary/10">
          <div>
            <h1 className="text-4xl font-black italic">Command Center</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                {address ? truncateAddress(address) : 'Initializing...'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <ThemeToggle />
             <button 
               onClick={() => router.push('/create')}
               className="btn-industrial flex items-center gap-3"
             >
               <Plus size={20} strokeWidth={3} />
               Create Split
             </button>
          </div>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="card-industrial bg-primary text-white border-none shadow-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-4 block">Total Aggregated Wealth</span>
              <div className="flex items-end gap-2">
                 <span className="text-4xl font-black italic tracking-tighter">
                   {isLoading ? '---' : `$${totalValue?.toFixed(2) || '0.00'}`}
                 </span>
                 <span className="text-[10px] font-black mb-1.5 opacity-60 uppercase tracking-widest">USD Value</span>
              </div>
              <Wallet className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 pointer-events-none" />
           </div>

           <div className="card-industrial">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 block">Active Settlements</span>
              <div className="flex items-end gap-2">
                 <span className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white">04</span>
                 <span className="text-[10px] font-black mb-1.5 text-slate-400 uppercase tracking-widest">Unpaid Bills</span>
              </div>
              <Users className="absolute -right-4 -bottom-4 w-32 h-32 opacity-5 pointer-events-none" />
           </div>

           <div className="card-industrial">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4 block">Omni-Chain Nodes</span>
              <div className="flex items-center gap-4">
                 <span className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white">
                   {isLoading ? '0' : assetGroups?.length || '0'}
                 </span>
                 <button onClick={() => refresh?.()} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                    <RefreshCw size={16} className={`${isLoading ? 'animate-spin' : ''}`} />
                 </button>
              </div>
              <Globe className="absolute -right-4 -bottom-4 w-32 h-32 opacity-5 pointer-events-none" />
           </div>
        </div>

        {/* RECENT ACTIVITY & ASSETS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* PORTFOLIO BREAKDOWN */}
           <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black italic">Portfolio Distribution</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Interwoven Bridge Active</span>
              </div>
              
              <div className="space-y-4">
                {isLoading ? (
                  [1, 2, 3].map(i => <div key={i} className="h-16 bg-slate-100 dark:bg-slate-900/50 animate-pulse border border-border"></div>)
                ) : assetGroups && assetGroups.length > 0 ? (
                  assetGroups.map((group, i) => (
                    <div key={i} className="card-industrial group hover:border-primary transition-colors flex items-center justify-between py-4">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xs">
                             {group.symbol.slice(0, 2)}
                          </div>
                          <div>
                             <div className="font-black uppercase tracking-tighter text-sm">{group.symbol}</div>
                             <div className="text-[10px] font-bold text-slate-500 uppercase">{group.assets[0]?.chain?.name || 'Unknown Chain'}</div>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="font-black text-sm">${group.value?.toFixed(2)}</div>
                          <div className="text-[10px] font-bold text-primary">{group.amount?.toFixed(4)} {group.symbol}</div>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="card-industrial text-center py-12 text-slate-400">
                    No multi-chain assets found in the interwoven world.
                  </div>
                )}
              </div>
           </div>

           {/* SPLIT ACTIVITY */}
           <div className="lg:col-span-5 flex flex-col gap-6">
              <h3 className="text-2xl font-black italic">Recent Splits</h3>
              <div className="card-industrial bg-slate-50 dark:bg-slate-900/30 flex flex-col items-center justify-center py-20 border-dashed">
                 <Users size={48} className="text-slate-300 mb-4" />
                 <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">No active groups</p>
                 <button 
                  onClick={() => router.push('/create')}
                  className="mt-6 text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                 >
                   Start a new bill
                 </button>
              </div>
              
              <div className="card-industrial border-primary/20 bg-primary/5">
                 <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">AI Sweeper Active</span>
                    <Zap size={14} className="text-primary animate-pulse" />
                 </div>
                 <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Our agent is monitoring your Mini-Rollup dust for potential debt settlement.</p>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}
