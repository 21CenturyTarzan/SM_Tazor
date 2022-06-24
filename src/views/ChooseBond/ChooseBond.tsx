import { useSelector } from "react-redux";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Zoom,
} from "@material-ui/core";
import { t, Trans } from "@lingui/macro";
import { BondDataCard, BondTableData } from "./BondRow";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { formatCurrency } from "../../helpers";
import useBonds from "../../hooks/Bonds";
import { useHistory } from "react-router";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import "./choosebond.scss";
import { Skeleton } from "@material-ui/lab";
import ClaimBonds from "./ClaimBonds";
import isEmpty from "lodash/isEmpty";
import { allBondsMap } from "src/helpers/AllBonds";
import { useAppSelector } from "src/hooks";
import { IUserBondDetails } from "src/slices/AccountSlice";
import { Metric, MetricCollection } from "src/components/Metric";
import { NavLink } from "react-router-dom";

function ChooseBond() {
  const networkId = useAppSelector(state => state.network.networkId);
  const history = useHistory();
  const { bonds } = useBonds(networkId);
  usePathForNetwork({ pathName: "bonds", networkID: networkId, history });
  const isSmallScreen = useMediaQuery("(max-width: 733px)"); // change to breakpoint query
  const isVerySmallScreen = useMediaQuery("(max-width: 420px)");

  const isAppLoading: boolean = useAppSelector(state => state.app.loading);
  const isAccountLoading: boolean = useAppSelector(state => state.account.loading);

  const accountBonds: IUserBondDetails[] = useAppSelector(state => {
    const withInterestDue = [];
    for (const bond in state.account.bonds) {
      if (state.account.bonds[bond].interestDue > 0) {
        withInterestDue.push(state.account.bonds[bond]);
      }
    }
    return withInterestDue;
  });

  const marketPrice: number | undefined = useAppSelector(state => {
    return state.app.marketPrice;
  });

  const treasuryBalance: number | undefined = useAppSelector(state => {
    if (state.bonding.loading == false) {
      let tokenBalances = 0;
      for (const bond in allBondsMap) {
        if (state.bonding[bond]) {
          tokenBalances += state.bonding[bond].purchased;
        }
      }
      return tokenBalances;
    }
  });

  const formattedTreasuryBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(Number(treasuryBalance));

  return (
    <div id="choose-bond-view">
      {!isAccountLoading && !isEmpty(accountBonds) && <ClaimBonds activeBonds={accountBonds} />}

      <Zoom in={true}>
        <Paper className="ohm-card">
          <Box className="card-header">
            <Typography variant="h5" data-testid="t">
              <Trans>Using your other DEFI tokens to buy TAZOR is Coming Soon!</Trans>
            </Typography>
            <div className="row">
                <Typography align="left">
                  <h2>To Buy TAZOR or TAZ <a href="https://pancakeswap.finance/swap">Click Here</a></h2>
                  <h2 style={{ textAlign: "justify", fontSize: "15px", fontWeight: 200 }}>TAZOR contract address is 0xee65D8B88F86ace0f7bA42BA2d2C679b6f604bf0</h2>
                  <h2 style={{ textAlign: "justify", fontSize: "15px", fontWeight: 200 }}>TAZ contract address is 0x1fed8951D852b88930557B681409b334e1089343</h2>
                </Typography>
              </div>
          </Box>
          
          <MetricCollection>
            <Metric
              label={t`Treasury Balance`}
              metric={formattedTreasuryBalance}
              isLoading={!!treasuryBalance ? false : true}
            />
            <Metric
              label={t`TAZOR Price`}
              metric={formatCurrency(Number(marketPrice), 2)}
              isLoading={marketPrice ? false : true}
            />
            {/* <Metric
              label={t`TAZ Price`}
              metric={formatCurrency(Number(marketPrice), 2)}
              isLoading={marketPrice ? false : true}
            /> */}
          </MetricCollection>

          {!isSmallScreen && (
            <Grid container item>
              <TableContainer>
                <Table aria-label="Available bonds">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <Trans>Bond</Trans>
                      </TableCell>
                      <TableCell align="left">
                        <Trans>Price</Trans>
                      </TableCell>
                      <TableCell align="left">
                        <Trans>ROI</Trans>
                      </TableCell>
                      <TableCell align="right">
                        <Trans>Purchased</Trans>
                      </TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bonds.map(bond => {
                      // NOTE (appleseed): temporary for ONHOLD MIGRATION
                      // if (bond.getBondability(networkId)) {
                      if (bond.getBondability(networkId) || bond.getLOLability(networkId)) {
                        return <BondTableData key={bond.name} bond={bond} />;
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </Paper>
      </Zoom>

      {isSmallScreen && (
        <Box className="ohm-card-container">
          <Grid container item spacing={2}>
            {bonds.map(bond => {
              // NOTE (appleseed): temporary for ONHOLD MIGRATION
              // if (bond.getBondability(networkId)) {
              if (bond.getBondability(networkId) || bond.getLOLability(networkId)) {
                return (
                  <Grid item xs={12} key={bond.name}>
                    <BondDataCard key={bond.name} bond={bond} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      )}
    </div>
  );
}

export default ChooseBond;
