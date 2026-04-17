# Initia Hackathon Skills Reference

This document contains all the AI agent skills recommended for building on the Initia ecosystem during the INITIATE Hackathon.

---

## 🎯 Core Initia Skills (Must-Have)

### `initia-labs/agent-skills@initia-appchain-dev`
**Source:** Official Initia Labs  
**Installs:** 140+  
**Security:** Medium Risk (Snyk assessment)  

**Why this skill:**
- End-to-end Initia development guide
- Smart contracts (MoveVM/WasmVM/EVM)
- React frontend with InterwovenKit
- Weave CLI for launching Interwoven Rollups
- Appchain/rollup deployment and operations
- Transaction integration debugging

**Install Command:**
```bash
npx skills add initia-labs/agent-skills@initia-appchain-dev -g -y
```

**When to use:**
- Building Initia smart contracts
- Creating React frontends with InterwovenKit
- Deploying appchains/rollups with Weave CLI
- Debugging appchain/transaction integration

---

## 🔐 Smart Contract Development

### `wshobson/agents@solidity-security`
**Installs:** 8.4K+  
**Use Case:** Smart contract security best practices and auditing  

```bash
npx skills add wshobson/agents@solidity-security -g -y
```

### `openzeppelin/openzeppelin-skills@setup-solidity-contracts`
**Installs:** 183+  
**Use Case:** OpenZeppelin contract templates and standards  

```bash
npx skills add openzeppelin/openzeppelin-skills@setup-solidity-contracts -g -y
```

### `pluginagentmarketplace/custom-plugin-blockchain@solidity-development`
**Installs:** 154+  
**Use Case:** Solidity development patterns  

```bash
npx skills add pluginagentmarketplace/custom-plugin-blockchain@solidity-development -g -y
```

---

## 🎨 Frontend Development

### `vercel-labs/agent-skills@vercel-react-best-practices`
**Installs:** 311K+  
**Use Case:** React and Next.js best practices, performance optimization  

```bash
npx skills add vercel-labs/agent-skills@vercel-react-best-practices -g -y
```

### `vercel-labs/agent-skills@vercel-react-native-skills`
**Installs:** 89K+  
**Use Case:** Mobile gaming or cross-platform apps  

```bash
npx skills add vercel-labs/agent-skills@vercel-react-native-skills -g -y
```

### `pluginagentmarketplace/custom-plugin-blockchain@web3-frontend`
**Installs:** 151+  
**Use Case:** Web3-specific frontend patterns and wallet integration  

```bash
npx skills add pluginagentmarketplace/custom-plugin-blockchain@web3-frontend -g -y
```

---

## ⛓️ Blockchain & Web3 Skills

### `sickn33/antigravity-awesome-skills@blockchain-developer`
**Installs:** 554+  
**Use Case:** General blockchain development  

```bash
npx skills add sickn33/antigravity-awesome-skills@blockchain-developer -g -y
```

### `wshobson/agents@web3-testing`
**Installs:** 4.3K+  
**Use Case:** Web3 testing patterns and frameworks  

```bash
npx skills add wshobson/agents@web3-testing -g -y
```

### `vasilyu1983/ai-agents-public@software-crypto-web3`
**Installs:** 278+  
**Use Case:** Crypto and web3 development  

```bash
npx skills add vasilyu1983/ai-agents-public@software-crypto-web3 -g -y
```

---

## 🎮 Gaming & Interactive

### `freshtechbro/claudedesignskills@web3d-integration-patterns`
**Installs:** 238+  
**Use Case:** 3D and interactive gaming integrations  

```bash
npx skills add freshtechbro/claudedesignskills@web3d-integration-patterns -g -y
```

---

## 🤖 AI Integration

### `polymarket/agent-skills@web3-polymarket`
**Installs:** 305+  
**Use Case:** AI agents in prediction markets and DeFi  

```bash
npx skills add polymarket/agent-skills@web3-polymarket -g -y
```

---

## 📊 Quick Install All (Recommended Set)

For the INITIATE Hackathon, this minimal set covers 90% of use cases:

```bash
# Core Initia (REQUIRED)
npx skills add initia-labs/agent-skills@initia-appchain-dev -g -y

# Frontend
npx skills add vercel-labs/agent-skills@vercel-react-best-practices -g -y
npx skills add pluginagentmarketplace/custom-plugin-blockchain@web3-frontend -g -y

# Smart Contracts
npx skills add wshobson/agents@solidity-security -g -y
npx skills add openzeppelin/openzeppelin-skills@setup-solidity-contracts -g -y

# Blockchain Testing
npx skills add wshobson/agents@web3-testing -g -y
```

---

## 🎯 Skill Selection by Track

### Gaming Track
1. `initia-labs/agent-skills@initia-appchain-dev`
2. `vercel-labs/agent-skills@vercel-react-best-practices`
3. `freshtechbro/claudedesignskills@web3d-integration-patterns`

### DeFi Track
1. `initia-labs/agent-skills@initia-appchain-dev`
2. `wshobson/agents@solidity-security`
3. `openzeppelin/openzeppelin-skills@setup-solidity-contracts`
4. `polymarket/agent-skills@web3-polymarket`

### AI Track
1. `initia-labs/agent-skills@initia-appchain-dev`
2. `polymarket/agent-skills@web3-polymarket`
3. `vasilyu1983/ai-agents-public@software-crypto-web3`

---

## 🔍 Finding More Skills

Search for additional skills:
```bash
npx skills find [keyword]
```

Browse the leaderboard:
https://skills.sh/

---

## ⚠️ Security Notes

- Always check security assessments before installing
- Prefer skills with 1K+ installs from reputable sources
- Official sources (vercel-labs, initia-labs, openzeppelin, microsoft) are most trustworthy
- Review source repositories with <100 stars with caution

---

## 📝 Hackathon Checklist

Before starting your Initia project:

- [ ] Install core `initia-appchain-dev` skill
- [ ] Verify Weave CLI is installed and functional
- [ ] Check Docker availability for local chain deployment
- [ ] Confirm Go environment for chain operations
- [ ] Install frontend skills for your chosen framework
- [ ] Install security skills for smart contract work

---

*Last updated: 2026-04-13 for INITIATE Hackathon Season 1*
