import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { t, Trans } from "@lingui/macro";
import { shorten, trim, prettyVestingPeriod } from "../../helpers";
import { redeemBond } from "../../slices/BondSlice";
import BondLogo, { DashBoardLogo } from "../../components/BondLogo";
import { Box, Button, TableCell, TableRow, Typography } from "@material-ui/core";
import "./choosebond.scss";
import { Skeleton } from "@material-ui/lab";
import { useBonds, useWeb3Context } from "src/hooks";
import { isPendingTxn, txnButtonTextGeneralPending } from "src/slices/PendingTxnsSlice";

export function LPPoolTableData({ bond }) {
  const dispatch = useDispatch();
  const { address, provider } = useWeb3Context();
  const networkId = useSelector(state => state.network.networkId);
  const bonding = useSelector(state => state.bonding);
  const isBondLoading = !bond.bondPrice ?? true;
  const bondName = bond.name;
  const bondAddr = bond.networkAddrs[networkId]?.reserveAddress;
  const lpTokenInfo = bonding[bond.name] ? bonding[bond.name] : {};

  const [tokenNum, setTokenNum] = useState(0);
  const [stableNum, setStableNum] = useState(0);
  console.log("[tz]:tokenName=====>", lpTokenInfo);
  return (
    <TableRow id={`${bondName}--claim`}>
      <TableCell align="left" className="bond-name-cell">
        <DashBoardLogo bond={bond} />
        <div className="bond-name">
          <Typography variant="body1">
            {lpTokenInfo.tokenName ? trim(lpTokenInfo.tokenName, 4) : <Skeleton width={100} />}
          </Typography>
        </div>
      </TableCell>
      <TableCell align="center">{trim(lpTokenInfo.stableNum, 2)}</TableCell>
      <TableCell align="center">{trim(lpTokenInfo.tokenNum, 2)}</TableCell>
      <TableCell align="center">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(lpTokenInfo.marketCap)}
      </TableCell>
    </TableRow>
  );
}

export function LPPoolCardData({ bond }) {
  const { address, provider } = useWeb3Context();
  const networkId = useSelector(state => state.network.networkId);
  const bonding = useSelector(state => state.bonding);
  const bondName = bond.name;
  const lpTokenInfo = bonding[bond.name] ? bonding[bond.name] : {};
  console.log("tarzan:android=======>", bond, lpTokenInfo);
  return (
    <Box id={`${bondName}--claim`} className="claim-bond-data-card bond-data-card" style={{ marginBottom: "30px" }}>
      <Box className="bond-pair">
        <DashBoardLogo bond={bond} />
        <Box className="bond-name">
          <Typography>{lpTokenInfo.tokenName ? trim(lpTokenInfo.tokenName, 4) : <Skeleton width={100} />}</Typography>
        </Box>
      </Box>

      <div className="data-row">
        <Typography>Token Amount</Typography>
        <Typography>{trim(lpTokenInfo.stableNum, 2)}</Typography>
      </div>
      <div className="data-row">
        <Typography>TAZOR/TAZ Amount</Typography>
        <Typography>{trim(lpTokenInfo.tokenNum, 3)}</Typography>
      </div>
      <div className="data-row">
        <Typography>Liquidity Value</Typography>
        <Typography>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
          }).format(lpTokenInfo.marketCap)}
        </Typography>
      </div>
    </Box>
  );
}
