import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import { task } from "hardhat/config";
import { HardhatUserConfig, NetworkUserConfig } from "hardhat/types";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (_args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

const MNEMONIC = process.env.MNEMONIC || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ALCHEMY_KEY = process.env.ALCHEMY_KEY || "";
const ALPHA_PKEY = process.env.ALPHA_PKEY || "";
const BETA_PKEY = process.env.BETA_PKEY || "";
const GAMMA_PKEY = process.env.GAMMA_PKEY || "";
const THETA_PKEY = process.env.THETA_PKEY || "";

function createTestnetConfig(
  network: keyof typeof chainIds
): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + INFURA_API_KEY;
  return {
    // accounts: {
    //   count: 10,
    //   initialIndex: 0,
    //   mnemonic: MNEMONIC,
    //   path: "m/44'/60'/0'/0",
    // },
    accounts: [ALPHA_PKEY, BETA_PKEY, GAMMA_PKEY, THETA_PKEY],
    chainId: chainIds[network],
    url,
  };
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  defaultNetwork: "rinkeby",
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
    ],
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: chainIds.hardhat,
    },
    rinkeby: createTestnetConfig("rinkeby"),
    mainnet: createTestnetConfig("mainnet"),
    goerli: createTestnetConfig("goerli"),
    kovan: createTestnetConfig("kovan"),
    ropsten: createTestnetConfig("ropsten"),
  },
  paths: {
    artifacts: "../frontend/artifacts",
  },
  typechain: {
    outDir: "../frontend/types/typechain",
    target: "ethers-v5",
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 10000000,
  },
};

export default config;
