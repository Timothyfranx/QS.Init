# 🚀 QuickSplit.INIT: Master Production Plan

**Project:** QuickSplit.INIT  
**Hackathon:** INITIATE: The Initia Hackathon (Season 1)  
**Submission Deadline:** April 26th, 2026 (11:00 PM UTC)  
**Status:** Phase 1 (Infrastructure & Core Logic)

---

## 🏛️ 1. Technical Architecture & Key Symbols

### A. Settlement Layer (MiniEVM Rollup)
- **Contract:** `contracts/QuickSplit.sol`
  - **Key Symbols:** `createSplit`, `contribute`, `pay`, `withdraw`.
  - **Function:** Handles group expense clearinghouse logic on a dedicated appchain.
- **Contract:** `contracts/KarmaNFT.sol`
  - **Key Symbols:** `mint`, `addKarma`, `getKarma`.
  - **Function:** Tracks "Reliability XP" and updates NFT metadata (Bronze -> Diamond).

### B. AI Strategy Agent (The Sweeper)
- **Service:** `frontend/src/services/sweeper.ts`
  - **Key Symbols:** `DustSweeper`, `scanForDust`, `calculateSweep`.
  - **Function:** Client-side agent using Initia **Auto-signing** to find and bridge "dust" balances from other rollups.

### C. Infrastructure (Weave CLI)
- **Source:** `weave/`
  - **Key Commands:** `weave init`, `weave engine start`.
  - **Function:** Manages Minitia rollup deployment, IBC relayers, and OPinit bots.

---

## 🗓️ 2. The 10-Day Implementation Roadmap

### Phase 1: Infrastructure & Chain Launch (Days 1-2)
*   [ ] **Env Setup:** Verify Go 1.22+, Docker, Node.js 20+.
*   [ ] **Initialize:** Run `weave init --vm evm` to set up `quicksplit-1`.
*   [ ] **Deployment:** Deploy `QuickSplit.sol` and `KarmaNFT.sol` to Testnet/Local.
*   [ ] **Verification:** Confirm contracts are visible on the Initia Explorer.

### Phase 2: Interwoven Frontend (Days 3-4)
*   [ ] **Kit Setup:** Configure `InterwovenKit` in `frontend/src/app/providers.tsx`.
*   [ ] **Dashboard:** Build the "Unified Balance" view showing wealth across all chains.
*   [ ] **Bridge UI:** Implement the "Connect Wallet" and "Network Switcher".

### Phase 3: AI & Session UX (Days 5-7)
*   [ ] **Session Keys:** Integrate auto-signing to allow the Sweeper to execute bridge + pay in one click.
*   [ ] **Magic Pay:** Connect `sweeper.ts` logic to the UI "Sweep" button.
*   [ ] **Bridge Hooks:** Trigger `contribute()` automatically after bridging finishes.

### Phase 4: Gamification & Polish (Days 8-9)
*   [ ] **NFT Evolution:** Link contract `addKarma` events to frontend NFT metadata updates.
*   [ ] **Mobile UX:** Ensure Tailwind designs are fully responsive.
*   [ ] **End-to-End Test:** Perform a full split with 3 chains and 1.2s settlement.

### Phase 5: Delivery (Day 10)
*   [ ] **Demo:** Record the 30s "Magic Moment" video.
*   [ ] **Submission:** Finalize `.initia/submission.json` and push to GitHub.

---

## 🛠️ 3. Critical Technical Commands

### 🐧 Linux Environment Setup
```bash
# Verify Prerequisites
go version && docker --version && node -v

# Install Weave
go install github.com/initia-labs/weave/cmd/weave@latest

# Start Infrastructure
weave engine start
```

### ⚛️ Frontend Dev
```bash
cd frontend
npm install
npm run dev
```

---

## 📝 4. Research Notes (from Codebase Investigator)
- **Infrastructure:** The `weave/cmd/init.go` is the primary entry point for chain setup.
- **AI Agent:** The `sweeper.ts` requires robust error handling for multi-chain RPC timeouts.
- **UX:** Session Keys (Auto-signing) is the "killer feature" that must be prioritized for the demo.

---

**Current Action:** Proceed to Phase 1 Infrastructure Setup.
