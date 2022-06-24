import { memo, useState, ChangeEvent, useEffect } from "react";
import "./presale.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { Paper, Grid, Box, SvgIcon, Tabs, Zoom, Button, Container, useMediaQuery, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CardHeader from "../../components/CardHeader/CardHeader";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3Context } from "src/hooks/web3Context";
import { t, Trans } from "@lingui/macro";
import TabPanel from "../../components/TabPanel";
import { PresaleCard } from "./PresaleCard";
import { FairLaunchCard } from "./FairLaunchCard";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { error, info } from "../../slices/MessagesSlice";
import { useAppSelector } from "src/hooks";
import { maxTransactionFee } from "../../constants";
import { purchaseToken, redeem } from "../../slices/PresaleThunk";
import PresaleTimer from "../../components/RebaseTimer/PresaleTimer";
import { getBalances } from "../../slices/AccountSlice";
import { MetricCollection } from "src/components/Metric";
import { ReactComponent as TazorTokenImg } from "../../assets/tokens/token_TAZOR.svg";
import { switchNetwork } from "../../slices/NetworkSlice";
import TazorImg from "../../assets/icons/tazor_icon.svg"
import TazImg from "../../assets/icons/taz_icon.svg"

type InputEvent = ChangeEvent<HTMLInputElement>;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Presale = memo(() => {
  const dispatch = useDispatch();
  const { provider, address, connect } = useWeb3Context();
  const networkId = useAppSelector(state => state.network.networkId);

  const isSmallScreen = useMediaQuery("(max-width: 650px)");
  const isVerySmallScreen = useMediaQuery("(max-width: 379px)");

  const [tazorBalance, setTazorBalance] = useState(0);
  const [tazBalance, setTazBalance] = useState(0);
  const [tazorEthBalance, setTazorETHBalance] = useState(0);
  const [tazEthBalance, setTazETHBalance] = useState(0);
  const SECONDS_TO_REFRESH = 60;
  const [secondsToRefresh, setSecondsToRefresh] = useState(SECONDS_TO_REFRESH);

  // tabs
  const [view, setView] = useState<number>(0);
  const [nativeTokenName, setNativeTokenName] = useState("");
  const changeView = (event: ChangeEvent<{}>, value: string | number): void => {
    setView(Number(value));
  };
  // --

  const handleSwitchChain = async (id: any) => {
    // return () => {
    await dispatch(switchNetwork({ provider: provider, networkId: id }));
    dispatch(getBalances({ address, networkID: networkId, provider }));
    // };
  };

  useEffect(() => {
    if (networkId == 1 || networkId == 3) setNativeTokenName("ETH");
    else if (networkId == 56 || networkId == 97) setNativeTokenName("BNB");
    else if (networkId == 43113 || networkId == 43114) setNativeTokenName("AVAX");
    else if (networkId == 250) setNativeTokenName("FTM");
    else if (networkId == 137) setNativeTokenName("MATIC");
    else if (networkId == 361) setNativeTokenName("Theta");
    else if (networkId == 1666600000) setNativeTokenName("ONE");
    else if (networkId == 40) setNativeTokenName("TLOS");
    else if (networkId == 42220) setNativeTokenName("CELO");
    else if (networkId == 1285) setNativeTokenName("MOVR");
    else if (networkId == 19) setNativeTokenName("SGB");

    let interval: number | NodeJS.Timer = 0;
    if (secondsToRefresh > 0) {
      interval = setInterval(() => {
        setSecondsToRefresh(secondsToRefresh => secondsToRefresh - 1);
      }, 1000);
    } else {
      dispatch(getBalances({ address, networkID: networkId, provider }));
      clearInterval(interval);
      setSecondsToRefresh(SECONDS_TO_REFRESH);
    }

    return () => clearInterval(Number(interval));
  }, [secondsToRefresh]);

  const pendingTransactions = useAppSelector(state => {
    return state.pendingTransactions;
  });

  const tazorPTotalSupply = useAppSelector(state => {
    return state.account.balances && state.account.balances.tazorPTotalSupply;
  });
  // console.log("[tz] => tazorPTotalSupply: ", tazorPTotalSupply);

  const tazorInCirculation = useAppSelector(state => {
    return state.account.balances && state.account.balances.tazorInCirculation;
  });
  // console.log("[tz] => tazorInCirculation: ", tazorInCirculation);

  const isFairLaunchFinshed = useAppSelector(state => {
    return state.account.presale && state.account.presale.isFairLaunchFinshed;
  });

  const isTazorClaimed = useAppSelector(state => {
    return state.account.presale && state.account.presale.isTazorClaimed;
  });

  const isTazClaimed = useAppSelector(state => {
    return state.account.presale && state.account.presale.isTazClaimed;
  });

  const tazorPPrice = useAppSelector(state => {
    return state.account.presale && state.account.presale.tazorPPrice;
  });

  const tazPTotalSupply = useAppSelector(state => {
    return state.account.balances && state.account.balances.tazPTotalSupply;
  });

  const tazInCirculation = useAppSelector(state => {
    return state.account.balances && state.account.balances.tazInCirculation;
  });

  const tazPPrice = useAppSelector(state => {
    return state.account.presale && state.account.presale.tazPPrice;
  });

  const currentETHBalance =
    useAppSelector(state => {
      return state.account.balances && state.account.balances.currentETHBalance;
    }) || 0;

  const tazorPurchasedBalance =
    useAppSelector(state => {
      return state.account.presale && state.account.presale.tazorPurchasedBalance;
    }) || 0;
  // console.log("[tz] => tazorPurchasedBalance: ", tazorPurchasedBalance);

  const tazPurchasedBalance =
    useAppSelector(state => {
      return state.account.presale && state.account.presale.tazPurchasedBalance;
    }) || 0;

  const pendingPayoutPresale = useAppSelector(state => {
    return state.account.presale && state.account.presale.pendingPayoutPresale;
  });

  const vestingPeriodPresale = useAppSelector(state => {
    return state.account.presale && state.account.presale.vestingPeriodPresale;
  });

  const setTazorBalanceCallback = (value: number) => {
    setTazorBalance(value);
    setTazorETHBalance(Number(Number(value * tazorPPrice).toFixed(3)));
  };

  const setTazBalanceCallback = (value: number) => {
    setTazBalance(value);
    setTazETHBalance(Number(Number(value * tazPPrice).toFixed(3)));
  };

  const setTazorETHBalanceCallback = (value: number) => {
    setTazorETHBalance(value);
    setTazorBalance(Number(Number(value / tazorPPrice).toFixed(3)));
  };

  const setTazETHBalanceCallback = (value: number) => {
    setTazETHBalance(value);
    setTazBalance(Number(Number(value / tazPPrice).toFixed(3)));
  };

  const setNetSelCallback = async (event: InputEvent) => {
    const value = Number(event.target.value);
    console.log("currentnetId", value);
    handleSwitchChain(value);
    // setdstNetName(value);
    // await dispatch(getBridgeBalances({ address, networkID: networkId, provider, secondNetworkID: value }));
    // setdstNetName(secondNetworkID);
  };

  const onTazorPurchase = async (action: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(tazorEthBalance) || tazorEthBalance === 0) {
      // eslint-disable-next-line no-alert
      return dispatch(info("Please enter a value!"));
    }

    // if (ethBalance > currentETHBalance) {
    //   // setETHBalanceCallback(currentETHBalance - maxTransactionFee);
    //   return dispatch(info("You have not enough balance."));
    // }
    let amount = 0;
    if (action == "tazor") {
      amount = tazorBalance;
    } else {
      amount = tazBalance;
    }
    if (amount < 1) {
      return dispatch(info("Minimum amount is 1 Tazor!"));
    }
    console.log("[tz] => ethBalance: ", tazorEthBalance);
    console.log("[tz] => amount for buy: ", amount);
    await dispatch(
      purchaseToken({
        amount: amount,
        ethBalance: tazorEthBalance,
        token: action,
        provider,
        address,
        networkID: networkId,
      }),
    );
    setTazorBalanceCallback(0);
  };

  const onTazPurchase = async (action: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(tazEthBalance) || tazEthBalance === 0) {
      // eslint-disable-next-line no-alert
      return dispatch(info("Please enter a value!"));
    }

    // if (ethBalance > currentETHBalance) {
    //   // setETHBalanceCallback(currentETHBalance - maxTransactionFee);
    //   return dispatch(info("You have not enough balance."));
    // }

    let amount = 0;
    if (action == "tazor") {
      amount = tazorBalance;
    } else {
      amount = tazBalance;
    }
    if (amount < 10) {
      return dispatch(info("Minimum amount is 10 Taz!"));
    }
    console.log("[tz] => ethBalance: ", tazEthBalance);
    console.log("[tz] => amount for buy: ", amount);
    await dispatch(
      purchaseToken({
        amount: amount,
        ethBalance: tazEthBalance,
        token: action,
        provider,
        address,
        networkID: networkId,
      }),
    );
    setTazBalanceCallback(0);
  };

  const onClaim = async (action: string) => {
    // eslint-disable-next-line no-restricted-globals
    await dispatch(redeem({ provider, token: action, address, networkID: networkId }));
  };

  let modalButton = [];

  modalButton.push(
    <Button variant="contained" color="primary" className="connect-button" onClick={connect} key={1}>
      Connect Wallet
    </Button>,
  );

  modalButton.push(
    <Button
      className="stake-button"
      variant="contained"
      style={{backgroundColor: "#3831e5", color:"white"}}
      disabled={isPendingTxn(pendingTransactions, "buy_tazor")}
      onClick={() => {
        onTazorPurchase("tazor");
      }}
    >
      {txnButtonText(pendingTransactions, "buy_tazor", "Place Order")}
    </Button>,
  );

  modalButton.push(
    <Button
      className="stake-button"
      variant="contained"
      style={{backgroundColor: "#3831e5", color:"white"}}
      disabled={isPendingTxn(pendingTransactions, "buy_taz")}
      onClick={() => {
        onTazPurchase("taz");
      }}
    >
      {txnButtonText(pendingTransactions, "buy_taz", "Place Order")}
    </Button>,
  );

  let claimButton = [];

  claimButton.push(
    <Button variant="contained" color="primary" className="connect-button" onClick={connect} key={1}>
      Connect Wallet
    </Button>,
  );

  claimButton.push(
    <Button
      className="stake-button"
      variant="contained"
      color="primary"
      disabled={isPendingTxn(pendingTransactions, "redeem_presale")}
      onClick={() => {
        onClaim("tazor");
      }}
    >
      {txnButtonText(pendingTransactions, "redeem_presale", "Claim Tazor")}
    </Button>,
  );

  claimButton.push(
    <Button
      className="stake-button"
      variant="contained"
      color="primary"
      disabled={isPendingTxn(pendingTransactions, "redeem_presale")}
      onClick={() => {
        onClaim("taz");
      }}
    >
      {txnButtonText(pendingTransactions, "redeem_presale", "Claim Taz")}
    </Button>,
  );

  return (
    <div id="treasury-dashboard-view" className={`${isSmallScreen && "smaller"} ${isVerySmallScreen && "very-small"}`}>
      <Container
        style={{
          paddingLeft: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
          paddingRight: isSmallScreen || isVerySmallScreen ? "0" : "3.3rem",
        }}
      >
        <Zoom in={true}>
          <Paper
            className={`ohm-card`}
            style={{
              paddingLeft: isSmallScreen || isVerySmallScreen ? "10px" : "4rem",
              paddingRight: isSmallScreen || isVerySmallScreen ? "10px" : "4rem",
            }}
          >
            <Box className="card-header" paddingBottom={2}>
              {/* <div className="row" style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4" align="center">
                  <PresaleTimer />
                </Typography>
                {isFairLaunchFinshed ? (
                  <Typography align="right">
                    {isTazorClaimed ? (
                      <h3>Claimed Tazor {tazorPurchasedBalance}</h3>
                    ) : (
                      <h3>Purchased Tazor {tazorPurchasedBalance}</h3>
                    )}
                    {isTazClaimed ? (
                      <h3>Claimed Taz {tazPurchasedBalance}</h3>
                    ) : (
                      <h3>Purchased Taz {tazPurchasedBalance}</h3>
                    )}
                  </Typography>
                ) : (
                  <Typography align="right">
                    <h3>Purchased Tazor {tazorPurchasedBalance}</h3>
                    <h3>Purchased Taz {tazPurchasedBalance}</h3>
                  </Typography>
                )}
              </div> */}
              <div className="row">
                <Typography align="right">
                  <h1 style={{ color: "#edef8e" }}>PRESALE</h1>
                </Typography>
              </div>
            </Box>
            <Box className="card-header" paddingBottom={2}>
              <div className="row">
                <Typography align="left">
                  <h2>What is Tazor?</h2>
                </Typography>
              </div>
              <div className="row">
                <Typography align="left">
                  <p style={{ textAlign: "left", fontSize: "18px", fontWeight: 200, lineHeight: 1.2 }}>
                    Tazor is the first ever DEFI (Decentralized Finance) protocol that allows users to control their APR
                    (Annual Percentage Rate) individually and separately from other users! Imagine Tazor is a Savings
                    Account that allows you to determine the APR that you receive on your account. See more info {":"} (
                    <a href="https://tazor.gitbook.io/tazor/team">Team</a>, <a href="https://tazor.gitbook.io/tazor/tokenomics">Tokenomics</a>, <a href="https://tazor.gitbook.io/tazor/roadmap">Roadmap</a>, <a href="https://tazor.gitbook.io/tazor/deployed-contracts">Contracts</a>, <a href="https://tazor.gitbook.io/tazor/audit">Audit</a>, <a href="https://tazor.gitbook.io/tazor/whitepaper">Whitepaper</a> )
                  </p>
                </Typography>
              </div>
            </Box>
            <Box className="card-header" paddingBottom={2}>
              <div className="row">
                <Typography align="left">
                  <h2>Why 2 tokens during Presale?</h2>
                </Typography>
              </div>
              <Grid container alignItems="flex-end" style={{ marginTop: "20px", alignItems: "normal" }}>
                <Grid item xs={12} sm={12} md={6} lg={6} style={{ paddingRight: "20px" }}>
                  <div className="row" style={{ paddingRight: "10px" }}>
                    <img src={TazorImg} style={{width:"50px", height:"50px", float: "left", marginRight: "1rem", marginBottom: "1rem"}}/>
                    <Typography style={{padding:"1px"}}>
                      <h3 style={{ fontSize: "20px"}}> <span style={{color: "#7a66f8"}}>Tazor </span> token is used for earning APR</h3>
                      <h2 style={{ textAlign: "left", fontSize: "15px", fontWeight: 200, lineHeight: 1.2 }}>
                      TAZOR token has no limit to its supply, however the TAZOR token is only minted whenever a Bond is
                      purchased, so all TAZOR is backed by the Treasury</h2>
                      <h2 style={{ textAlign: "justify", fontSize: "15px", fontWeight: 200 }}>
                        * The TAZOR token is NOT a reward token
                      </h2>
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}> 
                  <div className="row" style={{ paddingRight: "10px" }}>
                    <img src={TazImg} style={{width:"50px", height:"50px", float: "left", marginRight: "1rem", marginBottom: "1rem"}}/>
                    <Typography style={{ padding: "1px" }}>
                    <h3 style={{ fontSize: "20px"}}> <span style={{color: "#edaa45" }}>Taz</span> token is used to increase your APR</h3>
                      <h2 style={{ textAlign: "left", fontSize: "15px", fontWeight: 200, lineHeight: 1.3 }}>
                      TAZ token has no limit to its supply, however the TAZ token is only minted whenever rewards are given to users who have 
                      Staked TAZOR. A small percentage of Staked TAZ tokens are Burned from a specific user’s Staked TAZ Amount whenever 
                      that user Stakes or Unstakes TAZOR, Stakes or Unstakes TAZ, or Claims TAZ Rewards. This results in users needing to top up 
                      their Staked TAZ to maintain their desired APR on their staked TAZOR.</h2>
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Box>
            <Box className="card-header" paddingBottom={2}>
              <div className="row">
                <Typography align="left">
                  <h2>How to participate in Presale?</h2>Watch <a href="https://www.youtube.com/channel/UChjZ8Zmj9sSOZCrAd8KWbKg/videos">Video Tutorial</a>
                  <h2 style={{ textAlign: "justify", fontSize: "15px", fontWeight: 200 }}>1. Select which token you want to buy (TAZOR or TAZ)</h2>
                  <h2 style={{ textAlign: "justify", fontSize: "15px", fontWeight: 200 }}>2. Choose which Currency you want to buy with (ETH, BNB, MATIC, FTM, AVAX, ONE, TLOS, THATA, MOVR, CELO, SGB) </h2>
                </Typography>
              </div>
            </Box>
            <div className="row" style={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h4" align="center">
                <PresaleTimer />
              </Typography>
            </div>
            <Box className="card-header" paddingBottom={2}>
              {!isFairLaunchFinshed ? (
                <div></div>
              ) : (
                <Typography variant="h3" align="center" style={{ fontWeight: 600, marginTop: 20, lineHeight: 2 }}>
                  <Trans>Phase 1 Liquidity Generation Event</Trans>
                  <br />
                  <Trans>Completed</Trans>
                  <br />
                  <Trans>Phase 2 Liquidity Generation Event will start soon</Trans>
                  <br />
                  <Trans>Thanks to All Participants</Trans>
                </Typography>
              )}
            </Box>
            <TabPanel value={view} index={0}>
              {!isFairLaunchFinshed ? (
                <PresaleCard
                  title="TAZOR"
                  tokenName={nativeTokenName}
                  address={address}
                  tazorPurchasedBalance={tazorPurchasedBalance}
                  tazPurchasedBalance={tazPurchasedBalance}
                  tazorPPrice={tazorPPrice}
                  tazorPTotalSupply={tazorPTotalSupply}
                  tazorInCirculation={tazorInCirculation}
                  tazorBalance={tazorBalance}
                  tazorEthBalance={tazorEthBalance}
                  tazEthBalance={tazEthBalance}
                  modalButton={modalButton}
                  currentETHBalance={currentETHBalance}
                  setTazorBalanceCallback={setTazorBalanceCallback}
                  setTazorETHBalanceCallback={setTazorETHBalanceCallback}
                  setTazBalanceCallback={setTazBalanceCallback}
                  setTazETHBalanceCallback={setTazETHBalanceCallback}
                  tazPTotalSupply={tazPTotalSupply}
                  tazInCirculation={tazInCirculation}
                  tazBalance={tazBalance}
                  setNetSelCallback={setNetSelCallback}
                />
              ) : (
                <FairLaunchCard
                  title="TAZOR"
                  address={address}
                  tokenName={nativeTokenName}
                  tazorPurchasedBalance={tazorPurchasedBalance}
                  tazPurchasedBalance={tazPurchasedBalance}
                  pendingPayoutPresale={pendingPayoutPresale}
                  vestingPeriodPresale={vestingPeriodPresale}
                  claimButton={claimButton}
                />
              )}
            </TabPanel>
            <Box className="card-header" paddingBottom={2}>
              <div className="row">
                <Typography align="center">
                  <h2>20% price increase when Liquidity Pool created on DEX after presale</h2>
                </Typography>
              </div>
            </Box>
          </Paper>
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
    <Presale />
  </QueryClientProvider>
);
