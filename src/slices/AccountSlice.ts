import { BigNumber, BigNumberish, ethers } from "ethers";
import { addresses } from "../constants";
import { loadAppDetails } from "../slices/AppSlice";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as tazorStaking } from "../abi/tazorStaking.json";
import { abi as PresaleAbi } from "../abi/Presale.json";


import { setAll, handleContractError, getDisplayBalance, getMarketPrice, getTazMarketPrice } from "../helpers";

import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
import { IBaseAddressAsyncThunk, ICalcUserBondDetailsAsyncThunk } from "./interfaces";
import { findOrLoadMarketPrice } from "./AppSlice";
import {
  FiatDAOContract,
  IERC20,
  IERC20__factory,
  OlympusStakingv2__factory,
} from "src/typechain";
import { GOHM__factory } from "src/typechain/factories/GOHM__factory";
import TazorPrice from "src/components/TopBar/TazorPrice";

export const getBalances = createAsyncThunk(
  "account/getBalances",
  async ({ address, networkID, provider }: IBaseAddressAsyncThunk, { dispatch }) => {
    let gOhmBalance = BigNumber.from("0");
    let gOhmBalAsSohmBal = BigNumber.from("0");
    let tazorBalance = BigNumber.from("0");
    let tazBalance = BigNumber.from("0");
    let tazorStakedBalance = BigNumber.from("0");
    let tazStakedBalance = BigNumber.from("0");
    let tazRewardBalance = BigNumber.from("0");

    let sohmBalance = BigNumber.from("0");
    let ohmV2Balance = BigNumber.from("0");
    let sohmV2Balance = BigNumber.from("0");
    let wsohmBalance = BigNumber.from("0");
    let poolBalance = BigNumber.from("0");
    let fsohmBalance = BigNumber.from(0);
    let fgohmBalance = BigNumber.from(0);
    let fgOHMAsfsOHMBalance = BigNumber.from(0);
    let fiatDaowsohmBalance = BigNumber.from("0");

    let tazorInCirculation: Number = 0;
    let tazInCirculation: Number = 0;
    let tazorPTotalSupply: Number = 0;
    let tazPTotalSupply: Number = 0;
    let currentETHBalance: Number = 0;
    let presaleLeftTime: Number = 0;

    let isFairLaunchFinshed = false;
    let tazorPPrice: Number = 0;
    let tazPPrice: Number = 0;
    let tazorPurchasedBalance: Number = 0;
    let tazPurchasedBalance: Number = 0;
    let pendingPayoutPresale = BigNumber.from(0);
    let vestingPeriodPresale = BigNumber.from(0);

    let totalTazorStaked: Number = 0;
    let totalTazStaked: Number = 0;
    let totalDeposited: Number = 0;

    let isTazorClaimed = false;
    let isTazClaimed = false;

    try {
      const presaleContract = new ethers.Contract(
        addresses[networkID].FAIRLAUNCH_ADDRESS as string,
        PresaleAbi,
        provider,
      );
      isFairLaunchFinshed = await presaleContract.isPresaleStopped();
      isTazorClaimed = await presaleContract.TazorClaimed(address);
      isTazClaimed = await presaleContract.TazClaimed(address);
      if (address) {
        tazPurchasedBalance = Number(getDisplayBalance(await presaleContract.TazTokenBought(address), 9));
        tazorPurchasedBalance = Number(getDisplayBalance(await presaleContract.TazorTokenBought(address), 9));
        currentETHBalance = Number(getDisplayBalance(await provider.getBalance(address), 18));
      }
      if (!isFairLaunchFinshed) {
        tazorPPrice = Number(getDisplayBalance(await presaleContract._getTazorValInBNB(), 18)); // $100
        tazPPrice = Number(tazorPPrice) / 10;
        tazorInCirculation = Number(getDisplayBalance(await presaleContract.availableTazorTokensIDO(), 9));
        tazInCirculation = Number(getDisplayBalance(await presaleContract.availableTazTokensIDO(), 9));
        tazorPTotalSupply = Number(getDisplayBalance(await presaleContract.totalTazorTokens(), 9));
        tazPTotalSupply = Number(getDisplayBalance(await presaleContract.totalTazTokens(), 9));
        presaleLeftTime = Number(await presaleContract.getTimediff());
      }

      const tazorContract = new ethers.Contract(
        addresses[networkID].TAZOR_ADDRESS as string,
        ierc20Abi,
        provider,
      ) as IERC20;
      tazorBalance = await tazorContract.balanceOf(address);

      const tazContract = new ethers.Contract(
        addresses[networkID].TAZ_ADDRESS as string,
        ierc20Abi,
        provider,
      ) as IERC20;
      tazBalance = await tazContract.balanceOf(address);

      let tazorMarketPrice: Number = 0;
      let tazMarketPrice: Number = 0;

      const originalPromiseResult = await dispatch(
        findOrLoadMarketPrice({ networkID: networkID, provider: provider, address: address }),
      ).unwrap();
      tazorMarketPrice = originalPromiseResult?.marketPrice;
      tazMarketPrice = originalPromiseResult?.tazMarketPrice;

      const stakingContract = new ethers.Contract(
        addresses[networkID].STAKING_ADDRESS as string,
        tazorStaking,
        provider,
      );
      const userInfo = await stakingContract.userInfos(address);
      tazorStakedBalance = userInfo.tazorNum;
      tazStakedBalance = userInfo.tazNum;
      tazRewardBalance = await stakingContract.getReward(address);

      totalTazorStaked = Number(getDisplayBalance(await stakingContract.totalTazorSupply(), 9));
      totalTazStaked = Number(getDisplayBalance(await stakingContract.totalTazSupply(), 9));

      totalDeposited =
        Number(totalTazStaked) * Number(tazMarketPrice) + Number(totalTazorStaked) * Number(tazorMarketPrice);
      console.log("[tz]=========> totalDeposited: ", totalDeposited);
    } catch (e) {
      handleContractError(e);
    }
    await dispatch(loadAppDetails({ networkID: networkID, provider: provider, address: address }));

    return {
      balances: {
        gohm: ethers.utils.formatEther(gOhmBalance),
        gOhmAsSohmBal: ethers.utils.formatUnits(gOhmBalAsSohmBal, "gwei"),
        sohmV1: ethers.utils.formatUnits(sohmBalance, "gwei"),
        fsohm: ethers.utils.formatUnits(fsohmBalance, "gwei"),
        fgohm: ethers.utils.formatEther(fgohmBalance),
        fgOHMAsfsOHM: ethers.utils.formatUnits(fgOHMAsfsOHMBalance, "gwei"),
        wsohm: ethers.utils.formatEther(wsohmBalance),
        fiatDaowsohm: ethers.utils.formatEther(fiatDaowsohmBalance),
        pool: ethers.utils.formatUnits(poolBalance, "gwei"),
        sohm: ethers.utils.formatUnits(sohmV2Balance, "gwei"),

        tazor: ethers.utils.formatUnits(tazorBalance, "gwei"),
        taz: ethers.utils.formatUnits(tazBalance, "gwei"),
        tazorStaked: ethers.utils.formatUnits(tazorStakedBalance, "gwei"),
        tazStaked: ethers.utils.formatUnits(tazStakedBalance, "gwei"),
        tazReward: ethers.utils.formatUnits(tazRewardBalance, "gwei"),
        totalTazorStaked: totalTazorStaked,
        totalTazStaked: totalTazStaked,
        totalDeposited: totalDeposited,

        tazorInCirculation: tazorInCirculation,
        tazInCirculation: tazInCirculation,
        tazorPTotalSupply: tazorPTotalSupply,
        tazPTotalSupply: tazPTotalSupply,
        currentETHBalance: currentETHBalance,
        presaleLeftTime: presaleLeftTime,
      },
      presale: {
        isFairLaunchFinshed: isFairLaunchFinshed,
        isTazorClaimed: isTazorClaimed,
        isTazClaimed: isTazClaimed,
        tazorPPrice: tazorPPrice,
        tazPPrice: tazPPrice,
        tazorPurchasedBalance: tazorPurchasedBalance,
        tazPurchasedBalance: tazPurchasedBalance,
      },
    };
  },
);

interface IUserAccountDetails {
  wrapping: {
    sohmWrap: number;
    wsohmUnwrap: number;
    gOhmUnwrap: number;
    wsOhmMigrate: number;
  };
}

export const getMigrationAllowances = createAsyncThunk(
  "account/getMigrationAllowances",
  async ({ networkID, provider, address }: IBaseAddressAsyncThunk) => {
    let ohmAllowance = BigNumber.from(0);
    let sOhmAllowance = BigNumber.from(0);
    let wsOhmAllowance = BigNumber.from(0);
    let gOhmAllowance = BigNumber.from(0);

    if (addresses[networkID].TAZOR_ADDRESS) {
      try {
        const ohmContract = IERC20__factory.connect(addresses[networkID].TAZOR_ADDRESS, provider);
        ohmAllowance = await ohmContract.allowance(address, addresses[networkID].MIGRATOR_ADDRESS);
      } catch (e) {
        handleContractError(e);
      }
    }

    if (addresses[networkID].SOHM_ADDRESS) {
      try {
        const sOhmContract = IERC20__factory.connect(addresses[networkID].SOHM_ADDRESS, provider);
        sOhmAllowance = await sOhmContract.allowance(address, addresses[networkID].MIGRATOR_ADDRESS);
      } catch (e) {
        handleContractError(e);
      }
    }

    if (addresses[networkID].WSOHM_ADDRESS) {
      try {
        const wsOhmContract = IERC20__factory.connect(addresses[networkID].WSOHM_ADDRESS, provider);
        wsOhmAllowance = await wsOhmContract.allowance(address, addresses[networkID].MIGRATOR_ADDRESS);
      } catch (e) {
        handleContractError(e);
      }
    }

    if (addresses[networkID].GOHM_ADDRESS) {
      try {
        const gOhmContract = IERC20__factory.connect(addresses[networkID].GOHM_ADDRESS, provider);
        gOhmAllowance = await gOhmContract.allowance(address, addresses[networkID].MIGRATOR_ADDRESS);
      } catch (e) {
        handleContractError(e);
      }
    }

    return {
      migration: {
        ohm: +ohmAllowance,
        sohm: +sOhmAllowance,
        wsohm: +wsOhmAllowance,
        gohm: +gOhmAllowance,
      },
      isMigrationComplete: false,
    };
  },
);

export const loadAccountDetails = createAsyncThunk(
  "account/loadAccountDetails",
  async ({ networkID, provider, address }: IBaseAddressAsyncThunk, { dispatch }) => {
    let tazorAllowance = BigNumber.from("0");
    let tazAllowance = BigNumber.from("0");

    try {
      const tazorContract = new ethers.Contract(addresses[networkID].TAZOR_ADDRESS as string, ierc20Abi, provider);
      const tazContract = new ethers.Contract(addresses[networkID].TAZ_ADDRESS as string, ierc20Abi, provider);

      let approveTx;
      tazorAllowance = await tazorContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
      tazAllowance = await tazContract.allowance(address, addresses[networkID].STAKING_ADDRESS);
    } catch (e) {
      console.warn("failed contract calls in slice", e);
    }
    await dispatch(getBalances({ address, networkID, provider }));

    return {
      staking: {
        tazorStake: +tazorAllowance,
        tazStake: +tazAllowance,
      },
    };
  },
);

export interface IUserBondDetails {
  // bond: string;
  allowance: number;
  interestDue: number;
  bondMaturationBlock: number;
  pendingPayout: string; //Payout formatted in gwei.
}
export const calculateUserBondDetails = createAsyncThunk(
  "account/calculateUserBondDetails",
  async ({ address, bond, networkID, provider }: ICalcUserBondDetailsAsyncThunk) => {
    if (!address) {
      return {
        bond: "",
        displayName: "",
        bondIconSvg: "",
        isLP: false,
        allowance: 0,
        balance: "0",
        interestDue: 0,
        bondMaturationBlock: 0,
        pendingPayout: "",
      };
    }
    // dispatch(fetchBondInProgress());
    try {
      // Calculate bond details.
      const bondContract = bond.getContractForBond(networkID, provider);
      const reserveContract = bond.getContractForReserve(networkID, provider);

      let pendingPayout, bondMaturationBlock;

      const bondDetails = await bondContract.bondInfo(address);
      let interestDue: BigNumberish = Number(bondDetails.payout.toString()) / Math.pow(10, 9);
      bondMaturationBlock = +bondDetails.vesting + +bondDetails.lastBlock;
      pendingPayout = await bondContract.pendingPayoutFor(address);

      let allowance,
        balance = BigNumber.from(0);
      allowance = await reserveContract.allowance(address, bond.getAddressForBond(networkID) || "");
      // balance = await reserveContract.balanceOf(address);
      //const dec = Number(BigNumber.from(await reserveContract.decimals()).toString());
      const dec = Number(await (await reserveContract.decimals()).toString());
      console.log("[tz]: decimals ===>", dec);
      // const balanceVal = Number(getDisplayBalance(await reserveContract.balanceOf(address), dec));
      // formatEthers takes BigNumber => String
      // const balanceVal = ethers.utils.formatEther(balance);
      const balanceVal = Number(getDisplayBalance(await reserveContract.balanceOf(address), dec));
      // balanceVal should NOT be converted to a number. it loses decimal precision
      return {
        bond: bond.name,
        displayName: bond.getTokenName(networkID),
        bondIconSvg: bond.bondIconSvg,
        isLP: bond.isLP,
        allowance: Number(allowance.toString()),
        balance: balanceVal,
        interestDue,
        bondMaturationBlock,
        pendingPayout: ethers.utils.formatUnits(pendingPayout, "gwei"),
      };
    } catch (e: unknown) {
      return {
        bond: bond.name,
        displayName: bond.getTokenName(networkID),
        bondIconSvg: bond.bondIconSvg,
        isLP: false,
        allowance: 0,
        balance: "0",
        interestDue: 0,
        bondMaturationBlock: 0,
        pendingPayout: "",
      };
    }
  },
);

interface IAccountSlice extends IUserAccountDetails {
  bonds: { [key: string]: IUserBondDetails };
  balances: {
    gohm: string;
    gOhmAsSohmBal: string;
    ohmV1: string;

    tazor: string;
    taz: string;
    tazorStaked: string;
    tazStaked: string;
    tazReward: string;
    totalTazorStaked: number;
    totalTazStaked: number;
    totalDeposited: number;
    tazorPTotalSupply: number;
    tazorInCirculation: number;
    tazPTotalSupply: number;
    tazInCirculation: number;
    presaleLeftTime: number;
    currentETHBalance: number;

    sohm: string;
    sohmV1: string;
    dai: string;
    oldsohm: string;
    fsohm: string;
    fgohm: string;
    fgOHMAsfsOHM: string;
    wsohm: string;
    fiatDaowsohm: string;
    pool: string;
  };
  loading: boolean;
  staking: {
    ohmStakeV1: number;
    ohmUnstakeV1: number;
    tazorStake: number;
    tazStake: number;
    ohmUnstake: number;
  };
  presale: {
    isFairLaunchFinshed: boolean;
    isTazorClaimed: boolean;
    isTazClaimed: boolean;
    tazorPPrice: number;
    tazPPrice: number;
    tazorPurchasedBalance: number;
    tazPurchasedBalance: number;
    pendingPayoutPresale: number;
    vestingPeriodPresale: number;
  };
  migration: {
    ohm: number;
    sohm: number;
    wsohm: number;
    gohm: number;
  };
  pooling: {
    sohmPool: number;
  };
  isMigrationComplete: boolean;
}

const initialState: IAccountSlice = {
  loading: false,
  bonds: {},
  balances: {
    gohm: "",
    gOhmAsSohmBal: "",
    ohmV1: "",

    tazor: "",
    taz: "",
    tazorStaked: "",
    tazStaked: "",
    tazReward: "",
    totalTazorStaked: 0,
    totalTazStaked: 0,
    totalDeposited: 0,
    tazorPTotalSupply: 0,
    tazorInCirculation: 0,
    tazPTotalSupply: 0,
    presaleLeftTime: 0,
    tazInCirculation: 0,
    currentETHBalance: 0,

    sohm: "",
    sohmV1: "",
    dai: "",
    oldsohm: "",
    fsohm: "",
    fgohm: "",
    fgOHMAsfsOHM: "",
    wsohm: "",
    fiatDaowsohm: "",
    pool: "",
  },
  staking: { ohmStakeV1: 0, ohmUnstakeV1: 0, tazorStake: 0, tazStake: 0, ohmUnstake: 0 },
  presale: {
    isFairLaunchFinshed: false,
    isTazorClaimed: false,
    isTazClaimed: false,
    tazorPPrice: 0,
    tazPPrice: 0,
    tazorPurchasedBalance: 0,
    tazPurchasedBalance: 0,
    pendingPayoutPresale: 0,
    vestingPeriodPresale: 0,
  },
  wrapping: { sohmWrap: 0, wsohmUnwrap: 0, gOhmUnwrap: 0, wsOhmMigrate: 0 },
  pooling: { sohmPool: 0 },
  migration: { ohm: 0, sohm: 0, wsohm: 0, gohm: 0 },
  isMigrationComplete: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.loading = true;
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(getBalances.pending, state => {
        state.loading = true;
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(calculateUserBondDetails.pending, state => {
        state.loading = true;
      })
      .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
        if (!action.payload) return;
        const bond = action.payload.bond;
        state.bonds[bond] = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      })
      .addCase(getMigrationAllowances.fulfilled, (state, action) => {
        setAll(state, action.payload);
      })
      .addCase(getMigrationAllowances.rejected, (state, { error }) => {
        console.log(error);
      });
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess } = accountSlice.actions;

const baseInfo = (state: RootState) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
