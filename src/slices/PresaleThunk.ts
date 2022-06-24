import { ethers } from "ethers";
import { addresses } from "../constants";
import { abi as ierc20Abi } from "../abi/IERC20.json";
import { abi as PresaleAbi } from "../abi/Presale.json";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAccountSuccess, getBalances } from "./AccountSlice";
import { clearPendingTxn, fetchPendingTxns } from "./PendingTxnsSlice";
import { error, info } from "../slices/MessagesSlice";
import { IPresaleAsyncThunk, IBaseAddressAsyncThunk, IChangeApprovalAsyncThunk, IJsonRPCError } from "./interfaces";
import { loadAccountDetails } from "./AccountSlice";

export const purchaseToken = createAsyncThunk(
  "presale/purchaseToken",
  async ({ amount, ethBalance, token, provider, address, networkID }: IPresaleAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }

    const signer = provider.getSigner();
    const fairLaunchContract = new ethers.Contract(
      addresses[networkID].FAIRLAUNCH_ADDRESS as string,
      PresaleAbi,
      signer,
    );
    let approveTx;
    try {
      if (token == "tazor") {
        approveTx = await fairLaunchContract.buyTazorTokens(ethers.utils.parseUnits(amount.toString(), "gwei"), {
          value: ethers.utils.parseEther(ethBalance.toString()),
        });
        const text = "Buy Tazor";
        const pendingTxnType = "buy_tazor";
        dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text: pendingTxnType, type: pendingTxnType }));
      } else if (token == "taz") {
        approveTx = await fairLaunchContract.buyTazTokens(ethers.utils.parseUnits(amount.toString(), "gwei"), {
          value: ethers.utils.parseEther(ethBalance.toString()),
        });
        const text = "Buy Taz";
        const pendingTxnType = "buy_taz";
        dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text: pendingTxnType, type: pendingTxnType }));
      }

      await approveTx.wait();
    } catch (e: unknown) {
      const errMsg = (e as IJsonRPCError).message;
      if (errMsg.includes("only whitelisted"))
        dispatch(error("You are not added to whitelist. Please contact Manager."));
      else if (errMsg.includes("exceed limit")) dispatch(error("Sorry. You exceed limit"));
      else dispatch(error("Purchase failed"));
      console.log(errMsg);
      return;
    } finally {
      if (approveTx) {
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }
    dispatch(getBalances({ address, networkID, provider }));
  },
);

export const redeem = createAsyncThunk(
  "presale/redeem",
  async ({ provider, token, address, networkID }: IChangeApprovalAsyncThunk, { dispatch }) => {
    if (!provider) {
      dispatch(error("Please connect your wallet!"));
      return;
    }
    console.log("redeem");

    const signer = provider.getSigner();
    const presaleContract = new ethers.Contract(addresses[networkID].FAIRLAUNCH_ADDRESS as string, PresaleAbi, signer);
    let approveTx;
    try {
      if (token == "tazor") {
        approveTx = await presaleContract.claimTazorToken(address);
        const text = "claim Tazor Presale";
        const pendingTxnType = "redeem_presale";
        dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text: pendingTxnType, type: pendingTxnType }));
      } else if (token == "taz") {
        approveTx = await presaleContract.claimTazToken(address);
        const text = "claim Taz";
        const pendingTxnType = "redeem_presale";
        dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text: pendingTxnType, type: pendingTxnType }));
      }

      await approveTx.wait();
      dispatch(loadAccountDetails({ networkID, address, provider }));
    } catch (e: unknown) {
      const errMsg = (e as IJsonRPCError).message;
      if (errMsg.includes("not finalized yet")) dispatch(error("Fair Launch not finalized yet. Please wait."));
      else if (errMsg.includes("exceed limit")) dispatch(error("Sorry. You exceed limit"));
      else if (errMsg.includes("did claim")) dispatch(error("You did claim tokens"));
      else dispatch(error("Claim failed."));
      console.log(errMsg);
      return;
    } finally {
      if (approveTx) {
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }
  },
);
