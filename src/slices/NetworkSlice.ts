import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { JsonRpcProvider, StaticJsonRpcProvider } from "@ethersproject/providers";
import { error, info } from "./MessagesSlice";
import { setAll } from "../helpers";
import { EnvHelper } from "../helpers/Environment";
import { NodeHelper } from "../helpers/NodeHelper";
import { NETWORKS } from "../constants";
import { RootState } from "../store";

interface IGetCurrentNetwork {
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}

export const initializeNetwork = createAsyncThunk(
  "network/getCurrentNetworkkkk",
  async ({ provider }: IGetCurrentNetwork, { dispatch }): Promise<INetworkSlice> => {
    try {
      let networkName: string;
      let uri: string;
      let supported: boolean = true;
      const id: number = await provider.getNetwork().then(network => network.chainId);
      // console.log("[tz]: netId_id:", id);
      // NodeHelper.setNetworkID(id);
      switch (id) {
        case 1:
          networkName = "Ethereum";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 3:
          networkName = "Ropsten Testnet";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 56:
          networkName = "Binance Smart Chain";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 97:
          networkName = "Binance Smart Chain Testnet";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 42161:
          networkName = "Arbitrum";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 421611:
          networkName = "Arbitrum Testnet";
          uri = EnvHelper.alchemyArbitrumTestnetURI;
          break;
        case 43113:
          networkName = "Avalanche Fuji Testnet";
          uri = EnvHelper.alchemyAvalancheTestnetURI;
          break;
        case 43114:
          networkName = "Avalanche";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 250:
          networkName = "Fantom";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 137:
          networkName = "Polygon";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 361:
          networkName = "Theta";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 8217:
          networkName = "Klaytn";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 1666600000:
          networkName = "Harmony";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 40:
          networkName = "Telos";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 19:
          networkName = "Songbird";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 42220:
          networkName = "Celo";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 1285:
          networkName = "Moonriver";
          uri = NodeHelper.getMainnetURI(id);
          break;
        case 888:
          networkName = "Wanchain";
          uri = NodeHelper.getMainnetURI(id);
          break;
        default:
          supported = false;
          networkName = "Unsupported Network";
          uri = "";
          dispatch(error("Please connect to a supported network!"));
          break;
      }

      return {
        networkId: id,
        networkName: networkName,
        uri: uri,
        initialized: supported,
      };
    } catch (e) {
      /*console.log(e);
      dispatch(error("Error connecting to wallet!"));*/
      return {
        networkId: -43114,
        networkName: "",
        uri: "",
        initialized: false,
      };
    }
  },
);

interface ISwitchNetwork {
  provider: StaticJsonRpcProvider | JsonRpcProvider;
  networkId: number;
}

export const switchNetwork = createAsyncThunk(
  "network/switchNetwork",
  async ({ provider, networkId }: ISwitchNetwork, { dispatch }) => {
    try {
      await provider.send("wallet_switchEthereumChain", [{ chainId: idToHexString(networkId) }]);
      dispatch(initializeNetwork({ provider }));
    } catch (e) {
      // If the chain has not been added to the user's wallet
      // @ts-ignore
      // console.log("[tz]: swtich network", e.code);
      if (e.code === 4902) {
        const network = NETWORKS[networkId];
        const params = [
          {
            chainId: idToHexString(networkId),
            chainName: network["chainName"],
            nativeCurrency: network["nativeCurrency"],
            rpcUrls: network["rpcUrls"],
            blockExplorerUrls: network["blockExplorerUrls"],
          },
        ];

        try {
          await provider.send("wallet_addEthereumChain", params);
          dispatch(initializeNetwork({ provider }));
        } catch (e) {
          console.log(e);
          dispatch(error("Error switching network!"));
        }
      } else {
        dispatch(info("Please connect wallet first."));
      }
      // }
    }
  },
);

const idToHexString = (id: number) => {
  return "0x" + id.toString(16);
};

interface INetworkSlice {
  networkId: number;
  networkName: string;
  uri: string;
  initialized: boolean;
}

const initialState: INetworkSlice = {
  networkId: -43114,
  networkName: "",
  uri: "",
  initialized: false,
};

const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(initializeNetwork.pending, (state, action) => {
        state.initialized = false;
      })
      .addCase(initializeNetwork.fulfilled, (state, action) => {
        state.initialized = true;
        setAll(state, action.payload);
      })
      .addCase(initializeNetwork.rejected, (state, { error }) => {
        state.initialized = false;
        console.error(error.name, error.message, error.stack);
      });
  },
});

export default networkSlice.reducer;

const baseInfo = (state: RootState) => state.network;

export const getNetworkState = createSelector(baseInfo, network => network);