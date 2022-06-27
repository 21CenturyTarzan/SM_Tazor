import { NodeHelper } from "./helpers/NodeHelper";
import { EnvHelper } from "./helpers/Environment";
import ethereum from "./assets/tokens/wETH.svg";
import arbitrum from "./assets/arbitrum.png";
import avalanche from "./assets/tokens/AVAX.svg";
import fantom from "./assets/tokens/fantom.svg";
import polygon from "./assets/tokens/polygon.svg";
import binance from "./assets/binance.png";
// import aurora from "./assets/tokens/aurora.svg";
import telos from "./assets/tokens/telos.svg";
import celo from "./assets/tokens/celo.svg";
import moonriver from "./assets/tokens/moonriver.svg";
import theta from "./assets/tokens/theta.svg";
import harmony from "./assets/tokens/harmony.svg";
import klaytn from "./assets/tokens/klaytn.svg";
import songbird from "./assets/tokens/songbird.svg";
import wanchain from "./assets/tokens/wanchain.svg";

export const THE_GRAPH_URL = "https://api.thegraph.com/subgraphs/name/drondin/olympus-protocol-metrics";
export const EPOCH_INTERVAL = 28800; //28800

// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 3; //13.14;

export const TOKEN_DECIMALS = 9;

export const BNB_FEE = "0.0025";

// presale price, but this got from presale contract.
export const tazorPPrice = 10;
export const tazPPrice = 1;
export const maxTransactionFee = 0.01;

interface IPoolGraphURLS {
  [index: string]: string;
}

export const POOL_GRAPH_URLS: IPoolGraphURLS = {
  4: "https://api.thegraph.com/subgraphs/name/pooltogether/rinkeby-v3_4_3",
  1: "https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether-v3_4_3",
};

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  97: {
    DAI_ADDRESS: "0xf6E8865F7EfcC2F413FE86e60F4354061c5B3A0D", // duplicate
    // TAZOR_ADDRESS: "0x106a173771EE7261084fc3A710820dFe9D304AB7",
    // TAZ_ADDRESS: "0x996cE4903c6C085e5c795634dD378026892C920D",
    TAZOR_ADDRESS: "0x9aB2B0730DFE6c44C0B9649Cc458B3A1438fbF31",
    TAZ_ADDRESS: "0xa583B35e2C080CC85955dE58aBE44e186599b341",
    STAKING_ADDRESS: "0xA55849c08566C2ce9966AF192e02c8A8Ca253F5D",
    FAIRLAUNCH_ADDRESS: "0x1e5639B8ba8C5Ec58cAae46087bF45638F60E97F",
    STAKING_HELPER_ADDRESS: "",
    BONDINGCALC_ADDRESS: "0x7adD0D3154c5D9Cdd1191392e61e2A26D26F62A2",
    BONDINGCALC_TAZ_ADDRESS: "0x0180840AE599C6315C834A3625c3b0F77B7CE5B0",
    TREASURY_ADDRESS: "0xd771A03780538F731f66fd241EE02921ec04d651",
    REDEEM_HELPER_ADDRESS: "0x3a775CFe0fB5abEE170fef0e30973B179844A323",
  },
  56: {
    DAI_ADDRESS: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3", // duplicate
    TAZOR_ADDRESS: "0xee65D8B88F86ace0f7bA42BA2d2C679b6f604bf0",
    TAZ_ADDRESS: "0x1fed8951D852b88930557B681409b334e1089343",
    STAKING_ADDRESS: "0xc58CD5bE9A09faD35cA605A40830eA52EcaB00F0",
    FAIRLAUNCH_ADDRESS: "0x14358785dCe578bEAEEf0B4829d13003A1DE142B",
    STAKING_HELPER_ADDRESS: "",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "",
    TREASURY_ADDRESS: "",
    REDEEM_HELPER_ADDRESS: "",
  },
  3: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0xd29648c783b5d65807d45921d8b00d85df5c9377",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41", // 33T token address, taken from `ticket` function on PRIZE_STRATEGY_ADDRESS
  },
  1: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0xe0856b8d4e2a741e1b03ac23b5dafa33e1a52eb4",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  },
  42161: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0xd29648c783b5d65807d45921d8b00d85df5c9377",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  }, // TODO: Replace with Arbitrum contract addresses when ready
  421611: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0xd29648c783b5d65807d45921d8b00d85df5c9377",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  }, // TODO: Replace with Arbitrum Testnet contract addresses when ready
  43113: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0xd29648c783b5d65807d45921d8b00d85df5c9377",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  }, // TODO: Avalanche Testnet addresses
  43114: {
    DAI_ADDRESS: "", // duplicate
    TAZOR_ADDRESS: "",
    TAZ_ADDRESS: "",
    STAKING_ADDRESS: "",
    FAIRLAUNCH_ADDRESS: "0x1a8D32eEbE884f291e84D1e0a3Db74A4379ca66B",
    STAKING_HELPER_ADDRESS: "",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "",
    TREASURY_ADDRESS: "",
    REDEEM_HELPER_ADDRESS: "",
  }, // TODO: Avalanche Mainnet addresses
  250: {
    DAI_ADDRESS: "0x04068da6c83afcfa0e13ba15a6696662335d5b75", // duplicate
    TAZOR_ADDRESS: "0x74b23882a30290451a17c44f4f05243b6b58c76d",
    TAZ_ADDRESS: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
    STAKING_ADDRESS: "",
    FAIRLAUNCH_ADDRESS: "0x68Da3EDa3eA76809D5B1b97BD8320164A2505777",
    STAKING_HELPER_ADDRESS: "",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "",
    TREASURY_ADDRESS: "",
    REDEEM_HELPER_ADDRESS: "",
  },
  137: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0x1517d5F7612d772C2D0b35118a8dB535C9280161",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  },
  361: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0x1517d5F7612d772C2D0b35118a8dB535C9280161",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  },
  8217: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0xd29648c783b5d65807d45921d8b00d85df5c9377",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  },
  1666600000: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0xcd6d099816532b7dCf7a785884022b5A0308614c",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  },
  40: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0xcd6d099816532b7dCf7a785884022b5A0308614c",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  },
  19: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0x1517d5F7612d772C2D0b35118a8dB535C9280161",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  },
  42220: {
    DAI_ADDRESS: "0x918146359264c492bd6934071c6bd31c854edbc3", // duplicate
    TAZOR_ADDRESS: "",
    TAZ_ADDRESS: "",
    STAKING_ADDRESS: "",
    FAIRLAUNCH_ADDRESS: "0x1517d5F7612d772C2D0b35118a8dB535C9280161",
    STAKING_HELPER_ADDRESS: "",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "",
    TREASURY_ADDRESS: "",
    REDEEM_HELPER_ADDRESS: "",
  },
  1285: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0x68b5F8be9E69f4A607Bf14c1CE4666E138017C24",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  },
  888: {
    DAI_ADDRESS: "0x8a9424745056Eb399FD19a0EC26A14316684e274", // duplicate
    TAZOR_ADDRESS: "0xF3149A319A553840c7Fb04aFF3e19C4d008D6DB1",
    TAZ_ADDRESS: "0x601Fb6c33F24bcB6DAf2c1d6d570495f1C018800",
    STAKING_ADDRESS: "0x58517F6eD9Be72ecdc29126A0d22C2a69Df0867A",
    FAIRLAUNCH_ADDRESS: "0xd29648c783b5d65807d45921d8b00d85df5c9377",
    STAKING_HELPER_ADDRESS: "0xaB217aA0fD9fD0C6930f2827789622C4251E9058",
    BONDINGCALC_ADDRESS: "0x661d77B9fF1Cc4286eF476f5A21a6875926D732C",
    BONDINGCALC_TAZ_ADDRESS: "0x66abaAf86f972Dc0A30F6323F554FDF4C54Fe688",
    TREASURY_ADDRESS: "0x4a47fA1982421181dd0673393322645Fa482B3Ef",
    REDEEM_HELPER_ADDRESS: "0x27bCF334D7C3Ad8248B06E90ee8a3851c1de0A41",
  },
};

/**
 * Network details required to add a network to a user's wallet, as defined in EIP-3085 (https://eips.ethereum.org/EIPS/eip-3085)
 */

interface INativeCurrency {
  name: string;
  symbol: string;
  decimals?: number;
}

interface INetwork {
  chainName: string;
  chainId: number;
  nativeCurrency: INativeCurrency;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  image: SVGImageElement;
  imageAltText: string;
  uri: () => string;
}

// These networks will be available for users to select. Other networks may be functional
// (e.g. testnets, or mainnets being prepared for launch) but need to be selected directly via the wallet.
// export const USER_SELECTABLE_NETWORKS = [1, 56, 42161, 43114];
export const USER_SELECTABLE_NETWORKS = [1, 56, 43114, 250, 137, 361, 1666600000, 40, 19, 42220, 1285];
//export const USER_SELECTABLE_NETWORKS = [56];

// Set this to the chain number of the most recently added network in order to enable the 'Now supporting X network'
// message in the UI. Set to -1 if we don't want to display the message at the current time.
export const NEWEST_NETWORK_ID = 56;

export const NETWORKS: { [key: number]: INetwork } = {
  1: {
    chainName: "Ethereum",
    chainId: 1,
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://main-light.eth.linkpool.io"],
    blockExplorerUrls: ["https://etherscan.io/#/"],
    image: ethereum,
    imageAltText: "Ethereum Logo",
    uri: () => NodeHelper.getMainnetURI(1),
  },
  3: {
    chainName: "Ropsten Testnet",
    chainId: 3,
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: [""],
    blockExplorerUrls: ["https://ropsten.etherscan.io/#/"],
    image: ethereum,
    imageAltText: "Ethereum Logo",
    uri: () => NodeHelper.getMainnetURI(3),
  },
  56: {
    chainName: "Binance",
    chainId: 56,
    nativeCurrency: {
      name: "Binance",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.io/#/"],
    image: binance,
    imageAltText: "Binance Logo",
    uri: () => NodeHelper.getMainnetURI(56),
  },
  97: {
    chainName: "Binance Test",
    chainId: 97,
    nativeCurrency: {
      name: "Binance",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
    blockExplorerUrls: ["https://testnet.bscscan.io/#/"],
    image: binance,
    imageAltText: "Binance Logo",
    uri: () => NodeHelper.getMainnetURI(97),
  },
  42161: {
    chainName: "Arbitrum",
    chainId: 42161,
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://explorer.arbitrum.io/#/"],
    image: arbitrum,
    imageAltText: "Arbitrum Logo",
    uri: () => NodeHelper.getMainnetURI(42161),
  },
  421611: {
    chainName: "Arbitrum Testnet",
    chainId: 421611,
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://rinkeby-explorer.arbitrum.io/#/"],
    image: arbitrum,
    imageAltText: "Arbitrum Logo",
    uri: () => EnvHelper.alchemyArbitrumTestnetURI,
  },
  43113: {
    chainName: "Avalanche Fuji Testnet",
    chainId: 43113,
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://testnet.snowtrace.io/#/"],
    image: avalanche,
    imageAltText: "Avalanche Logo",
    uri: () => EnvHelper.alchemyAvalancheTestnetURI,
  },
  43114: {
    chainName: "Avalanche",
    chainId: 43114,
    nativeCurrency: {
      name: "AVAX",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
    image: avalanche,
    imageAltText: "Avalanche Logo",
    uri: () => NodeHelper.getMainnetURI(43114),
  },
  250: {
    chainName: "Fantom",
    chainId: 250,
    nativeCurrency: {
      name: "FTM",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ftm.tools/"],
    blockExplorerUrls: ["https://ftmscan.com/"],
    image: fantom,
    imageAltText: "Fantom Logo",
    uri: () => NodeHelper.getMainnetURI(250),
  },
  137: {
    chainName: "Polygon",
    chainId: 137,
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://explorer.matic.network/"],
    image: polygon,
    imageAltText: "Matic Logo",
    uri: () => NodeHelper.getMainnetURI(137),
  },
  361: {
    chainName: "Theta",
    chainId: 361,
    nativeCurrency: {
      name: "TFUEL",
      symbol: "TFUEL",
      decimals: 18,
    },
    rpcUrls: ["https://eth-rpc-api.thetatoken.org/rpc"],
    blockExplorerUrls: ["https://explorer.thetatoken.org"],
    image: theta,
    imageAltText: "Theta Logo",
    uri: () => NodeHelper.getMainnetURI(361),
  },
  8217: {
    chainName: "Klaytn",
    chainId: 8217,
    nativeCurrency: {
      name: "KLAY",
      symbol: "KLAY",
      decimals: 18,
    },
    rpcUrls: ["https://public-node-api.klaytnapi.com/v1/cypress"],
    blockExplorerUrls: ["https://scope.klaytn.com"],
    image: klaytn,
    imageAltText: "Klaytn Logo",
    uri: () => NodeHelper.getMainnetURI(8217),
  },
  1666600000: {
    chainName: "Harmony",
    chainId: 1666600000,
    nativeCurrency: {
      name: "ONE",
      symbol: "ONE",
      decimals: 18,
    },
    rpcUrls: ["https://api.harmony.one/"],
    blockExplorerUrls: ["https://explorer.harmony.one"],
    image: harmony,
    imageAltText: "Harmony Logo",
    uri: () => NodeHelper.getMainnetURI(1666600000),
  },
  40: {
    chainName: "Telos",
    chainId: 40,
    nativeCurrency: {
      name: "TLOS",
      symbol: "TLOS",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.telos.net/evm"],
    blockExplorerUrls: ["https://telos.net/"],
    image: telos,
    imageAltText: "Telos Logo",
    uri: () => NodeHelper.getMainnetURI(40),
  },
  19: {
    chainName: "Songbird",
    chainId: 19,
    nativeCurrency: {
      name: "WSGB",
      symbol: "WSGB",
      decimals: 18,
    },
    rpcUrls: ["https://songbird.flr.finance/ext/bc/C/rpc"],
    blockExplorerUrls: ["https://songbird-explorer.flare.network"],
    image: songbird,
    imageAltText: "Songbird Logo",
    uri: () => NodeHelper.getMainnetURI(19),
  },
  42220: {
    chainName: "Celo",
    chainId: 42220,
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: ["https://forno.celo.org"],
    blockExplorerUrls: ["https://explorer.celo.org"],
    image: celo,
    imageAltText: "Celo Logo",
    uri: () => NodeHelper.getMainnetURI(42220),
  },
  1285: {
    chainName: "Moonriver",
    chainId: 1285,
    nativeCurrency: {
      name: "MOVR",
      symbol: "MOVR",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.api.moonriver.moonbeam.network"],
    blockExplorerUrls: ["https://blockscout.moonriver.moonbeam.network/"],
    image: moonriver,
    imageAltText: "Moonriver Logo",
    uri: () => NodeHelper.getMainnetURI(1285),
  },
  888: {
    chainName: "Wanchain",
    chainId: 888,
    nativeCurrency: {
      name: "WAN",
      symbol: "WAN",
      decimals: 18,
    },
    rpcUrls: ["https://gwan-ssl.wandevs.org:56891/"],
    blockExplorerUrls: ["https://www.wanscan.org/"],
    image: wanchain,
    imageAltText: "Wanchain Logo",
    uri: () => NodeHelper.getMainnetURI(888),
  },
};

// VIEWS FOR NETWORK is used to denote which paths should be viewable on each network
// ... attempting to prevent contract calls that can't complete & prevent user's from getting
// ... stuck on the wrong view
interface IViewsForNetwork {
  dashboard: boolean;
  stake: boolean;
  wrap: boolean;
  zap: boolean;
  threeTogether: boolean;
  bonds: boolean;
  network: boolean;
}

export const VIEWS_FOR_NETWORK: { [key: number]: IViewsForNetwork } = {
  1: {
    dashboard: true,
    stake: true,
    wrap: true,
    zap: true,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  3: {
    dashboard: true,
    stake: true,
    wrap: true,
    zap: true,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  56: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  97: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  42161: {
    dashboard: true,
    stake: false,
    wrap: true,
    zap: false,
    threeTogether: false,
    bonds: false,
    network: true,
  },
  421611: {
    dashboard: true,
    stake: false,
    wrap: true,
    zap: false,
    threeTogether: false,
    bonds: false,
    network: true,
  },
  43114: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  43113: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  250: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  137: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  361: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  25: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  8217: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  1666600000: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  40: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  19: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  42220: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  1285: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
  888: {
    dashboard: true,
    stake: true,
    wrap: false,
    zap: false,
    threeTogether: true,
    bonds: true,
    network: true,
  },
};
