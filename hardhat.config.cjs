import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    baseGoerli: {
      url: process.env.NEXT_PUBLIC_ALCHEMY_BASE_URL,
      accounts: [process.env.PRIVATE_KEY as string]
    }
  }
};

export default config;
