
# Comixtory - AI Comic Storybook Creator

An AI-powered platform where users can create, mint, and sell personalized comic storybooks using custom story input, character names, and images. Built with Next.js, wagmi, viem, and Solidity on the Base blockchain.

## Tech Stack
- **Frontend**: Next.js 14, TypeScript, shadcn/ui, TailwindCSS
- **Smart Contracts**: Solidity, Hardhat
- **Blockchain**: Base Mainnet
- **Wallet Integration**: wagmi + viem
- **AI Tools**: OpenAI (story), Replicate (image generation)
- **Storage**: Pinata IPFS

---

## Repository Structure
```
comixtory-monorepo/
├── apps/
│   ├── web/                  # Frontend (Next.js + shadcn + wagmi)
│   └── api/                  # Internal Next.js API routes
│
├── contracts/               # Solidity smart contracts (NFT + Marketplace)
│   ├── ComicNFT.sol
│   ├── Marketplace.sol
│   └── scripts/
│       └── deploy.js
│
├── lib/
│   ├── pinata.ts            # Pinata IPFS upload helpers
│   ├── replicate.ts         # Replicate API (image generation)
│   ├── openai.ts            # OpenAI API (story transformation)
│   └── zustandStore.ts      # Zustand state management
│
├── public/
│   └── images/
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Setup Instructions
1. **Clone the repo**
```bash
git clone https://github.com/YOUR_USERNAME/comixtory-monorepo.git
cd comixtory-monorepo
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Setup environment**
Rename `.env.example` to `.env` and add your keys:
```
NEXT_PUBLIC_REPLICATE_API_TOKEN=...
NEXT_PUBLIC_OPENAI_API_KEY=...
NEXT_PUBLIC_PINATA_JWT=...
NEXT_PUBLIC_ALCHEMY_BASE_URL=...
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...
```

4. **Compile Contracts**
```bash
cd contracts && pnpm hardhat compile
```

5. **Run App**
```bash
pnpm dev
```

---

## Features
- 🎨 AI Comic Generator: from user input (story + character names + image)
- 🖼️ Replicate image previews before mint
- 📦 IPFS upload via Pinata
- 🪙 NFT minting to Base chain
- 🛒 Custom Marketplace: list, buy, filter, search
- 🔍 Gallery view with ownership filters
- 🔗 Shareable comic NFT pages

---

## Smart Contracts
### ComicNFT.sol
- ERC721-compliant NFT for comic books
- Mints NFT with IPFS metadata
- Tracks creator/owner per comic

### Marketplace.sol
- Lists NFT for sale
- Allows purchase of listed comics
- Emits events for frontend syncing

---

## License
MIT
```bash

Let me know when you're ready to:

✅ Generate the full **`ComicNFT.sol`** and **`Marketplace.sol`**  
✅ Set up Hardhat deployment  
✅ Wire it to the frontend with wagmi + viem hooks

Or if you'd like to push the current state to a GitHub repo now.

```

**Commands Cheat Sheet**
```bash
# Compile smart contracts
pnpm hardhat compile

# Deploy contracts (modify deploy.js config)
pnpm hardhat run scripts/deploy.js --network base
```

**Roadmap**
```bash
✅ Comic input + character name/image handling
✅ AI image generation preview (Replicate)
✅ IPFS metadata + image storage (Pinata)
✅ NFT smart contracts (ComicNFT)
✅ Marketplace smart contract
✅ Wagmi wallet interaction + viem hooks
✅ NFT listing + buying on custom UI
🔜 Animation of panel transitions
🔜 Share-to-socials & download comic feature
```