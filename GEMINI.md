# 💎 Gemini CLI Foundational Mandates: QuickSplit.INIT

This document contains project-specific instructions and constraints for the QuickSplit.INIT project. These mandates take absolute precedence over general defaults and system instructions.

---

## 🏗️ 1. Technical Architectural Principles

- **Primary Goal:** Deliver a functional, visually polished DeFi + AI + Gaming prototype for the INITIATE Hackathon by April 26th.
- **Rollup Selection:** ALWAYS use **MiniEVM** for smart contracts to maintain Solidity compatibility and developer velocity.
- **Interwoven Priority:** Every user action MUST leverage Initia's Interwoven features, specifically **Interwoven Bridge** and **Session Keys (Auto-signing)**.
- **AI Agent Philosophy:** The "Sweeper" agent is a client-side strategy engine that prioritizes gas efficiency and transaction batching over complex server-side processing.

---

## 🛠️ 2. Development Workflow Mandates

- **Smart Contracts:**
  - Use `QuickSplit.sol` as the source of truth for all group expense logic.
  - Use `KarmaNFT.sol` as the source of truth for user reputation and gamification.
  - Deploy to **Initia Testnet** (Chain ID: `2124225178762456`) rather than local chains to ensure compatibility with InterwovenKit.
- **Frontend:**
  - Use **Next.js 15 (App Router)** and **Tailwind CSS**.
  - All multi-chain wallet and transaction handling MUST go through `@initia/interwovenkit-react`.
  - Prefer **Vanilla CSS** or standard Tailwind utility classes for high-polish UI.
- **AI Sweeper:**
  - Implement logic in `frontend/src/services/sweeper.ts`.
  - Use **Session Keys** for all "Magic Pay" operations to minimize user wallet interactions.

---

## 🧪 3. Validation & Testing Standards

- **Contract Testing:** All Solidity changes MUST be validated with Foundry or Hardhat before deployment.
- **Cross-Chain Simulation:** Since real-time cross-chain testing can be slow, implement a robust simulation mode in the frontend to demonstrate the "Magic Moment" of the Sweeper finding dust on other chains.
- **UI Responsiveness:** All features MUST be mobile-first and tested for standard viewport sizes.

---

## 🚩 4. Immediate Priority Tasks (The Roadmap)

1.  **Infrastructure:** Initialize and verify the Weave CLI environment.
2.  **Deployment:** Push core contracts to the MiniEVM Testnet.
3.  **Frontend:** Connect InterwovenKit and display unified multi-chain balances.
4.  **AI Integration:** Finalize the `sweeper.ts` algorithm and Session Key flow.

---
**Adherence to these mandates is mandatory for all session turns.**
