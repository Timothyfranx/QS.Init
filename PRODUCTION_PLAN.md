# 🏆 QuickSplit.INIT: Production Masterplan

**Submission Deadline:** April 26th, 2026 (11:00 PM UTC)  
**Main Track:** DeFi  
**Secondary Tracks:** AI & Gaming

---

## 📍 1. Current Phase: [1/4] Infrastructure & Core Logic
We have completed the conceptual merge and initial scaffolding. We are now transitioning to a **Linux Mint** environment to handle the Initia Appchain deployment.

### Current File Inventory:
*   `contracts/QuickSplit.sol`: Main settlement logic.
*   `contracts/KarmaNFT.sol`: Reputation & Gaming layer.
*   `frontend/src/app/providers.tsx`: Initia InterwovenKit setup.
*   `frontend/src/services/sweeper.ts`: AI "Dust Sweeper" strategy engine.
*   `.initia/submission.json`: Official hackathon metadata.

---

## 🏛️ 2. System Architecture

### A. The Settlement Layer (Minitia)
We are deploying a **MiniEVM** (Solidity-compatible) rollup. 
*   **Why:** Fastest development speed for DeFi logic and allows us to use standard ERC20 interfaces for all bridged assets.
*   **Mechanism:** Every time a user bridges a token (INIT, USDC, TIA) to our rollup, it is represented as an ERC20. Our `QuickSplit` contract manages these balances.

### B. The AI Strategy Agent (The Sweeper)
A client-side AI agent that uses **Auto-signing**.
*   **Logic:** It queries the balances of all other rollups in the Interwoven ecosystem.
*   **Task:** If a user owes $10, the AI finds $2 on Chain A, $5 on Chain B, and $3 on Chain C. It generates the bridge route and executes the "Sweep" in a single session, requiring only one initial user approval.

### C. The Gaming Layer (Karma)
*   **Object:** `KarmaNFT.sol`.
*   **Gamification:** Users earn "Reliability XP" for paying debts before the due date. The NFT metadata updates on-chain to change the avatar's appearance (Bronze -> Silver -> Gold -> Diamond).

---

## 🗓️ 3. The 11-Day Roadmap

### Phase 1: The Heartbeat (Days 1-3) - *Current*
*   [ ] **Setup:** Complete Linux Mint environment configuration (Go, Docker, Weave).
*   [ ] **Init:** Run `weave init` to generate the rollup config.
*   [ ] **Launch:** Start the local engine (`weave engine start`) and verify the IBC relayer.
*   [ ] **Deploy:** Push `QuickSplit.sol` and `KarmaNFT.sol` to the rollup.

### Phase 2: The Interwoven Bridge (Days 4-6)
*   [ ] **InterwovenKit:** Build the "Connect Wallet" and "Network Switcher" UI.
*   [ ] **Bridge Hooks:** Implement the logic where bridging a token to the rollup automatically triggers the `contribute()` function in our contract.
*   [ ] **Unified Balance:** Show the user their "Total Ecosystem Wealth" (Sum of all chains).

### Phase 3: The AI & Session UX (Days 7-9)
*   [ ] **Session Keys:** Implement Initia's **Auto-signing** so the AI can "sweep" tokens without 50 popups.
*   [ ] **Strategy UI:** A "Magic Pay" button that shows the AI-calculated route (e.g., "Sweeping from 3 chains...").
*   [ ] **Karma Minting:** Allow users to mint their initial Karma NFT on their first split.

### Phase 4: Polish & Ship (Days 10-11)
*   [ ] **UI/UX:** Mobile-first responsive design using Tailwind CSS.
*   [ ] **Demo Video:** Record an end-to-end split from two different chains.
*   [ ] **Submit:** Final push to GitHub and submission via the hackathon portal.

---

## 🛠️ 4. Technical Commands for Linux
*(Keep these handy once you boot into Mint)*

1.  **Verify Setup:** `go version && docker --version && node -v`
2.  **Install Weave:** `go install github.com/initia-labs/weave/cmd/weave@latest`
3.  **Launch Chain:** `weave init --vm evm && weave engine start`
4.  **Frontend Dev:** `cd frontend && npm run dev`

---
**Status:** 🟩 Infrastructure Ready | ⬜ Chain Live | ⬜ Logic Deployed | ⬜ UI Connected
