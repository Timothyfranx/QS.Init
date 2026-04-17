# 🐧 QuickSplit.INIT: Linux Development Guide

This guide details our project for the **INITIATE Hackathon** and how to set up your **Linux Mint** environment to build, deploy, and ship by **April 26th**.

---

## 🚀 1. The Project: QuickSplit.INIT
**"The Social Settlement Layer for the Interwoven World."**

We are building an autonomous cross-chain bill splitter. 

### Core Features:
1.  **Cross-Chain Payments (DeFi):** Pay your share of a bill using *any* token from *any* Minitia (rollup).
2.  **Autonomous Dust Sweeping (AI):** An agent that finds tiny balances across your wallets to pay off debts automatically.
3.  **Karma Reputation (Gaming):** An evolving NFT that tracks your social reliability.

---

## 🛠️ 2. Linux Mint Environment Setup

Open your terminal in Linux Mint and run these steps:

### A. Install Go (1.22+)
```bash
# Remove old versions
sudo rm -rf /usr/local/go
# Download and Extract (Update version if newer exists)
wget https://go.dev/dl/go1.22.2.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.22.2.linux-amd64.tar.gz
```

### B. Configure PATH
Add these lines to the end of your `~/.bashrc` file:
```bash
export PATH=$PATH:/usr/local/go/bin
export PATH=$PATH:$(go env GOPATH)/bin
```
Then refresh: `source ~/.bashrc`

### C. Install Docker
```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
# Allow your user to run docker without sudo
sudo usermod -aG docker $USER
```
*(Note: You may need to log out and back in for the docker group change to take effect).*

### D. Install Node.js & Weave CLI
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Initia Weave CLI
go install github.com/initia-labs/weave/cmd/weave@latest
```

---

## 🏗️ 3. Initializing the Appchain

Once `weave` is installed, follow these steps to launch our dedicated **QuickSplit Minitia**:

1.  **Initialize:**
    ```bash
    weave init
    ```
    *   **Track:** Select "DeFi" or "Custom".
    *   **VM:** Select **MiniEVM** (since our contracts are in Solidity).
    *   **Chain ID:** `quicksplit-1`

2.  **Start the Chain:**
    ```bash
    weave engine start
    ```

---

## 📂 4. Current Repository State
We have already scaffolded the core logic:
- `contracts/QuickSplit.sol`: The clearinghouse for splits.
- `contracts/KarmaNFT.sol`: The reputation layer.
- `frontend/`: Next.js project with InterwovenKit (Initia's wallet SDK).
- `frontend/src/services/sweeper.ts`: The AI Strategy Agent logic.

## 🎯 5. Next Milestones
- [ ] **Deploy Contracts:** Use Foundry or Hardhat to deploy to our local Minitia.
- [ ] **Bridge Integration:** Connect the frontend to the Interwoven Bridge.
- [ ] **AI Logic:** Connect the "Sweeper" service to real wallet balances.
- [ ] **Final Submission:** Due April 26th.

---
*Created by Gemini CLI for QuickSplit.INIT*
