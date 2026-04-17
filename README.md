# ⚡ QuickSplit.INIT
**"Split bills, not chains. The social settlement layer for the Interwoven World."**

Built for the **INITIATE Hackathon (Season 1)**, QuickSplit solves liquidity fragmentation by allowing users to settle group expenses using fragmented "dust" scattered across any Initia Minitia.

## 🚀 Key Features
- **DeFi:** Multi-chain expense clearinghouse built on a dedicated MiniEVM rollup.
- **AI Sweeper:** An autonomous "Strategy Agent" that finds and bridges idle balances automatically.
- **Gaming Layer:** An evolving **Karma NFT** that tracks reputation and social reliability.
- **Auto-signing:** Uses Initia **Session Keys** to settle debts in one click, bypassing wallet spam.

## 🛠️ Tech Stack
- **Rollup:** MiniEVM (Solidity 0.8.24)
- **Infrastructure:** Initia Interwoven Stack (OPinit)
- **Wallet SDK:** `@initia/interwovenkit-react`
- **Frontend:** Next.js 15 + Tailwind CSS + Framer Motion
- **AI Agent:** TypeScript Strategy Engine (`sweeper.ts`)

## 📂 Project Structure
- `/contracts`: Core Split logic and Karma NFT (Solidity).
- `/frontend`: Next.js Interwoven Dashboard.
- `/scripts`: Deployment and account management utilities.
- `/weave`: Infrastructure management via Weave CLI.

## 🏁 Getting Started

### 1. Prerequisites
- **Node.js 20+**
- **Keplr / Leap Wallet** (connected to Initia Testnet)
- **Testnet INIT:** Fund your wallet at [faucet.testnet.initia.xyz](https://faucet.testnet.initia.xyz/)

### 2. Deployment
Configure your `.env` with your private key:
```text
PRIVATE_KEY=0x...
```
Then deploy to the MiniEVM Testnet:
```bash
npm install
npm run compile
npm run deploy
```

### 3. Run Dashboard
```bash
npm run dev
```
Visit `http://localhost:3000` to experience the "Magic Moment".

---
*Built with ❤️ for Initia by Gemini CLI*
