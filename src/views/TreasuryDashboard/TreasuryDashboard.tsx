import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./treasury-dashboard.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  Paper,
  Grid,
  Box,
  Zoom,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  useMediaQuery,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { TazTVLCap, TazorTVLCap, TazorMarketCap, TazMarketCap } from "./components/Metric/Metric";
import { LPPoolTableData, LPPoolCardData } from "./lpData";
import { t, Trans } from "@lingui/macro";
import { useBonds, useAppSelector } from "src/hooks";

import {
  TotalValueDepositedGraph,
  MarketValueGraph,
  RiskFreeValueGraph,
  ProtocolOwnedLiquidityGraph,
  OHMStakedGraph,
  RunwayAvailableGraph,
} from "./components/Graph/Graph";
import { MetricCollection } from "src/components/Metric";
const TreasuryDashboard = memo(() => {
  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  const networkId = useAppSelector(state => state.network.networkId);
  const { lpTokens } = useBonds(networkId);
  // const isBondLoading = useSelector(state => state.bonding.loading ?? true);

  return (
    <div id="treasury-dashboard-view" className={`${isSmallScreen && "smaller"} ${isVerySmallScreen && "very-small"}`}>
      <Container
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
        }}
      >
        <Zoom in={true}>
          <Grid container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="ohm-card">
                <MetricCollection>
                  <TazorMarketCap />
                </MetricCollection>
              </Paper>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="ohm-card">
                <MetricCollection>
                  <TazorTVLCap />
                </MetricCollection>
              </Paper>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="ohm-card">
                <MetricCollection>
                  <TazMarketCap />
                </MetricCollection>
              </Paper>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Paper className="ohm-card">
                <MetricCollection>
                  <TazTVLCap />
                </MetricCollection>
              </Paper>
            </Grid>
          </Grid>
        </Zoom>

  
      </Container>
    </div>
  );
});

const queryClient = new QueryClient();

// Normally this would be done
// much higher up in our App.
export default () => (
  <QueryClientProvider client={queryClient}>
    <TreasuryDashboard />
  </QueryClientProvider>
);
