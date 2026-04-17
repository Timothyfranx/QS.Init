# AGENTS.md - Initia Hackathon Project Context

**Project:** QuickSplit.INIT  
**Hackathon:** INITIATE: The Initia Hackathon (Season 1)  
**Timeline:** 9 days remaining (as of conversation date)  
**Track:** DeFi (primary), with Gaming elements (secondary)  
**Status:** In development - switching to Linux environment

---

## 🎯 Project Overview

### Current Decision: QuickSplit.INIT

**Tagline:** "Split bills, not chains"

**Core Concept:**  
A cross-chain bill splitting application that allows groups to split expenses where participants can pay from any chain/token, and the recipient receives their preferred token on their preferred chain - all in one click via Initia's Interwoven Bridge and Session Keys.

**Why This Wins:**
- Solves a universal problem (splitting bills)
- Demonstrates Initia's key features (100ms blocks, Interwoven Bridge, Session Keys)
- Demoable in 30 seconds
- Realistic for 9-day timeline

---

## 📋 Hackathon Requirements (Must Satisfy)

### Submission Requirements:
1. ✅ Deploy as Initia appchain/rollup (testnet acceptable)
2. ✅ Use InterwovenKit (@initia/interwovenkit-react) for wallet/tx handling
3. ✅ Implement at least ONE Initia-native feature:
   - Auto-signing / Session UX ✅ (using this)
   - Interwoven Bridge ✅ (using this)
   - Initia Usernames (.init) ✅ (optional but good)
4. ✅ Include `.initia/submission.json` in repo
5. ✅ Include human-readable README.md
6. ✅ Include demo video

### Scoring Criteria:
- Originality & Track Fit: 20%
- Technical Execution & Initia Integration: 30% ⭐ (we're strong here)
- Product Value & UX: 20%
- Working Demo & Completeness: 20% ⭐ (critical)
- Market Understanding: 10%

---

## 💡 Ideas History (What Was Considered)

### 1. WISH.INIT (Original Concept)
**Concept:** Automated savings app that sweeps "dust" (small balances) from multiple chains into savings goals
- **Problem:** Cross-chain complexity + automated savings
- **Why Scrapped:** Too complex for 9 days, cross-chain scanning is infrastructure-heavy
- **Verdict:** Good idea, wrong timeline

### 2. WISH-PAY.INIT (Merged Vision)
**Concept:** Combined group splitting (PAY) + individual goals (WISH) with AI agent
- **Problem:** "Settle your past, fund your future"
- **Why Scrapped:** Scope creep - trying to do 3 apps in 1
- **Verdict:** "Kitchen sink syndrome" - 7 features, 0 done well

### 3. InitPay Review (Competitor Analysis)
**Concept:** Multi-chain payroll with 7 features (batch payments, streaming, NFTs, lottery, staking, swaps, intent routing)
- **Assessment:** "Feature creep on steroids"
- **Problem:** Fake "production ready" - testnet only, no real users
- **Lesson:** Don't build 7 mediocre features. Build 1 excellent feature.

### 4. QuickSplit.INIT (Current) ⭐
**Concept:** Simple cross-chain bill splitting
- **Winning Formula:** One feature, done well, demoable in 30 seconds
- **Status:** APPROVED for development

---

## 🏗️ Technical Architecture

### QuickSplit.INIT Stack

**Frontend:**
- Framework: Next.js 15 + TypeScript
- Styling: TailwindCSS
- Web3: InterwovenKit (@initia/interwovenkit-react), wagmi, viem

**Smart Contracts:**
- Language: Solidity 0.8.20
- Platform: Initia MiniEVM
- Deployment: Testnet (recommended for 9-day timeline)

**Key Initia Features:**
1. **Interwoven Bridge:** Cross-chain token settlement
2. **Session Keys:** One-click approvals (no wallet spam)
3. **100ms Block Times:** Near-instant finality
4. **.init Usernames:** Optional - for social features

---

## 📄 Smart Contract Reference

### QuickSplit.sol
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract QuickSplit {
    struct Split {
        address creator;
        uint256 totalAmount;
        uint256 amountPerPerson;
        uint256 participantCount;
        uint256 paidCount;
        address[] participants;
        mapping(address => bool) hasPaid;
        bool isComplete;
    }
    
    mapping(bytes32 => Split) public splits;
    
    event SplitCreated(bytes32 indexed splitId, address creator, uint256 totalAmount);
    event PaymentReceived(bytes32 indexed splitId, address participant, uint256 amount);
    event SplitComplete(bytes32 indexed splitId);
    
    function createSplit(
        uint256 _totalAmount, 
        uint256 _participantCount
    ) external returns (bytes32);
    
    function pay(bytes32 _splitId) external payable;
    
    function withdraw(bytes32 _splitId) external;
}
```

---

## 🗓️ 9-Day Development Plan

### Day 1: Setup & Smart Contract
- [ ] Set up Linux development environment
- [ ] Install Node.js, npm
- [ ] Create Next.js project: `npx create-next-app@latest quicksplit --typescript`
- [ ] Install dependencies: `npm install wagmi viem @initia/interwovenkit-react`
- [ ] Write QuickSplit.sol contract
- [ ] Get testnet INIT from faucet: https://faucet.testnet.initia.xyz

### Day 2: Contract Deployment
- [ ] Deploy contract to MiniEVM testnet
- [ ] Test basic functions (create, pay, withdraw)
- [ ] Save contract address
- [ ] Document ABI

### Day 3: Frontend Core - Create Split
- [ ] Build "Create Split" form (amount, description, recipient)
- [ ] Generate unique split link
- [ ] Basic UI styling

### Day 4: Frontend Core - Join Split
- [ ] Landing page from split link
- [ ] Display amount owed
- [ ] Wallet connection with InterwovenKit

### Day 5: Interwoven Bridge Integration (Part 1)
- [ ] Detect user's chain
- [ ] Show available token balances
- [ ] Bridge call structure

### Day 6: Interwoven Bridge Integration (Part 2)
- [ ] Handle token approvals
- [ ] Execute bridge + payment
- [ ] Error handling

### Day 7: Session Keys & Polish
- [ ] Implement Session Keys for one-click payment
- [ ] "Remember me for splits" option
- [ ] UI polish, animations
- [ ] Mobile responsive

### Day 8: Demo Preparation
- [ ] Record 30-second demo video
- [ ] Test end-to-end flow
- [ ] Prepare submission documents

### Day 9: Submission
- [ ] Final testing
- [ ] Create `.initia/submission.json`
- [ ] Polish README.md
- [ ] Submit to hackathon

---

## 🔧 Environment Setup (Linux)

### Prerequisites Check
```bash
# Check Node.js (need v20+)
node --version

# Check npm
npm --version

# Check Go (for Weave CLI)
go version

# Check Docker (optional, for local chain)
docker --version
docker compose version

# Check Git
git --version
```

### Weave CLI Installation (Linux)

**Option 1: Using wget (Recommended)**
```bash
# Get latest version
VERSION=$(curl -s https://api.github.com/repos/initia-labs/weave/releases/latest | grep '"tag_name":' | cut -d'"' -f4 | cut -c 2-)

# Download (AMD64)
wget https://github.com/initia-labs/weave/releases/download/v$VERSION/weave-$VERSION-linux-amd64.tar.gz

# Extract
tar -xvf weave-$VERSION-linux-amd64.tar.gz

# Move to PATH
sudo mv weave /usr/local/bin/

# Verify
weave version
```

**Option 2: Build from source**
```bash
git clone https://github.com/initia-labs/weave.git
cd weave
git checkout tags/v0.3.9
make install
# OR if make not available:
go build -o weave .
sudo mv weave /usr/local/bin/
```

**Initialize Weave:**
```bash
weave init
# Follow interactive prompts
# Set up Gas Station account
# Configure infrastructure (rollup, relayer, etc.)
```

---

## 🌐 Testnet Resources

### Initia Testnet
| Resource | URL |
|----------|-----|
| Explorer | https://scan.testnet.initia.xyz |
| Faucet | https://faucet.testnet.initia.xyz |
| L1 RPC | https://rpc.testnet.initia.xyz |
| L1 REST | https://rest.testnet.initia.xyz |
| L1 gRPC | grpc.testnet.initia.xyz:443 |

### MiniEVM Testnet (Where We Deploy)
| Resource | Value |
|----------|-------|
| Chain ID | 2124225178762456 |
| EVM RPC | https://evm-rpc.testnet.initia.xyz |
| Explorer | https://scan.testnet.initia.xyz/evm-1 |
| Currency | INIT |

### Getting Test Tokens
1. Go to https://faucet.testnet.initia.xyz
2. Connect wallet (MetaMask or similar)
3. Request INIT tokens
4. Tokens arrive in ~30 seconds

---

## 🎥 Demo Script (30 Seconds)

**Shot 1 (0-5s):** Create Split
- "Dinner with friends: $120"
- Click "Create Split"
- Copy link

**Shot 2 (5-15s):** Three People Pay
- Alice: Pays from Ethereum (USDC)
- Bob: Pays from Polygon (MATIC)
- You: Pays from Initia (INIT)
- All in one click each

**Shot 3 (15-25s):** Settlement
- "Received $120 in USDC on my preferred chain"
- Timer shows: "Settled in 1.2 seconds"

**Shot 4 (25-30s):** Tagline
- "QuickSplit.INIT — Split bills, not chains."

---

## 🛠️ Installed Skills Reference

### Core Skill (REQUIRED)
```bash
npx skills add initia-labs/agent-skills@initia-appchain-dev -g -y
```
**Provides:**
- Initia smart contract development (MoveVM/WasmVM/EVM)
- React frontend with InterwovenKit
- Weave CLI for launching Interwoven Rollups
- Appchain/rollup deployment
- Transaction debugging

### Supporting Skills
```bash
# Frontend
npx skills add vercel-labs/agent-skills@vercel-react-best-practices -g -y
npx skills add pluginagentmarketplace/custom-plugin-blockchain@web3-frontend -g -y

# Smart Contracts
npx skills add wshobson/agents@solidity-security -g -y
npx skills add openzeppelin/openzeppelin-skills@setup-solidity-contracts -g -y

# Testing
npx skills add wshobson/agents@web3-testing -g -y
```

---

## ⚠️ Critical Advice (Read This)

### What NOT To Do:
1. ❌ Don't add more features mid-development
2. ❌ Don't try to build local chain (use testnet)
3. ❌ Don't perfect the UI (good enough is good enough)
4. ❌ Don't spend >2 hours on any single bug
5. ❌ Don't build AI, gaming, AND DeFi - pick ONE

### What TO Do:
1. ✅ Demo early and often
2. ✅ Test on testnet daily
3. ✅ Record video day before submission
4. ✅ Have backup plan if feature fails
5. ✅ Focus on the "magic moment" (one-click cross-chain payment)

### Risk Areas:
| Risk | Mitigation |
|------|------------|
| Bridge fails mid-demo | Pre-bridge tokens for demo, have backup |
| Session Keys buggy | Fallback: manual approval flow |
| Gas estimation wrong | Hardcode buffer (estimate + 20%) |
| UI breaks on mobile | Test on phone Day 7 |

---

## 📝 Submission Checklist

Before submitting:

- [ ] `.initia/submission.json` exists and valid
- [ ] `README.md` explains project clearly
- [ ] Demo video uploaded (YouTube/Vimeo)
- [ ] Contracts deployed to testnet
- [ ] Frontend deployed (Vercel/Netlify) or working locally
- [ ] All team members credited
- [ ] Track specified (DeFi)
- [ ] No broken links in submission

### .initia/submission.json Template:
```json
{
  "name": "QuickSplit.INIT",
  "description": "Cross-chain bill splitting with one-click payments",
  "track": "DeFi",
  "features": [
    "Interwoven Bridge integration",
    "Session Keys for auto-approval",
    "Multi-chain payment settlement"
  ],
  "contracts": {
    "MiniEVM": "0x..."
  },
  "demo": "https://youtube.com/...",
  "repository": "https://github.com/...",
  "team": ["..."]
}
```

---

## 📚 Reference Links

- **Initia Docs:** https://docs.initia.xyz
- **Weave CLI Docs:** https://docs.initia.xyz/developers/developer-guides/tools/clis/weave-cli/introduction
- **InterwovenKit:** https://docs.initia.xyz/developers/developer-guides/tools/clis/interwoven-kit
- **Hackathon Guide:** https://docs.initia.xyz/hackathon
- **Testnet Explorer:** https://scan.testnet.initia.xyz

---

## 💬 Key Decisions Made

1. **Track:** DeFi (not AI or Gaming)
2. **Scope:** Single feature (bill splitting) not platform
3. **Chain:** Testnet (not local - saves time)
4. **Frontend:** Next.js + InterwovenKit
5. **Contract:** Solidity on MiniEVM
6. **Timeline:** 9 days (aggressive but doable)

---

**Switching to Linux now. Good luck! 🚀**

**Next immediate action:**
1. Set up Linux environment
2. Install Node.js, npm, Go
3. Install Weave CLI
4. Get testnet INIT from faucet
5. Start Day 1 tasks

**Questions?** Refer to Initia documentation or ask in Discord.
