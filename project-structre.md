/*
📁 Full Project Structure for HekaHeka Comic dApp
*/

// =========================
// 1. Story Input, Character Input, Image Upload, Comic Creation
// =========================

apps/web/app/input-story.tsx ✅
apps/web/app/characters.tsx ✅
apps/web/app/upload-images.tsx ✅
apps/web/app/preview.tsx ✅
apps/web/app/checkout.tsx ✅
apps/web/app/mint.tsx ✅
apps/web/app/marketplace.tsx ✅

apps/web/components/CharacterForm.tsx ✅
apps/web/components/StoryInputForm.tsx ✅
apps/web/components/ImageUploader.tsx ✅
apps/web/components/ComicPreview.tsx ✅
apps/web/components/CheckoutButtons.tsx ✅
apps/web/components/MintSuccessDialog.tsx ✅

apps/web/lib/zustandStore.ts ✅           // State for story, characters, and images
apps/web/lib/replicate.ts ✅             // AI comic panel generation
apps/web/lib/metadata.ts ✅               // NFT metadata generator
apps/web/lib/pinata.ts ✅                 // Uploads to IPFS
apps/web/lib/stripe.ts ✅                 // Stripe integration
apps/web/lib/utils.ts ✅                  // Utility functions

apps/web/styles/globals.css
apps/web/app/layout.tsx

// =========================
// 2. API Routes (Next.js App Router - Next 13+)
// =========================

apps/api/app/api/generate-comic/route.ts ✅
apps/api/app/api/upload-image/route.ts ✅
apps/api/app/api/checkout/stripe/route.ts ✅
apps/api/app/api/mint/route.ts ✅
apps/api/app/api/list-nft/route.ts ✅
apps/api/app/api/buy-nft/route.ts ✅

// =========================
// 3. Smart Contracts (Hardhat)
// =========================

contracts/ComicNFT.sol
contracts/Marketplace.sol

scripts/deploy.js                      // Deploy both contracts
scripts/interact.js                    // Mint, list, and buy functions

hardhat.config.js

// =========================
// 4. Test Files
// =========================

test/ComicNFT.test.js
test/Marketplace.test.js

// =========================
// 5. Changes to Existing Files
// =========================

// a) zustandStore.ts
Add new states: comicPanels, paymentSuccess, mintStatus, nftUri

// b) replicate.ts
Function: generateComicPanels(story: string, characters: Character[]): Promise<string[]>

// c) metadata.ts
Function: generateMetadataJSON(images: string[], story: string): object

// d) pinata.ts
Function: uploadToIPFS(data: any): Promise<string>

// e) mint.tsx
- On purchase success, use pinata.ts + metadata.ts to generate metadata
- Upload to IPFS
- Call contract's mint function using wagmi hooks

// f) marketplace.tsx
- Fetch listings from Marketplace contract
- Allow wallet-connected users to buy listed NFTs

// g) stripe.ts (or server route)
- Checkout session creation
- Redirect or return success to frontend

// =========================
// 6. Deployment Configs
// =========================

apps/web/vercel.json (if deploying frontend via Vercel)
.env.local for API keys and RPC URLs

// =========================
// 7. Packages to Install
// =========================

// Frontend:
npm install zustand @headlessui/react @heroicons/react axios react-dropzone stripe wagmi viem ethers

// Backend/API:
npm install replicate pinata-sdk stripe dotenv

// Smart Contracts:
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts

// =========================
// Final Notes
// =========================

- Wallet connection via wagmi (already implemented)
- Metadata must follow ERC721 standards
- All IPFS URIs returned from Pinata
- Buying: If crypto, call contract directly; if Stripe, after success -> call mint endpoint
- List: Once minted, allow listing via Marketplace contract
- Other users: Fetch and display all available NFTs from Marketplace.sol

Need help with any file content or logic? I can generate it instantly.
