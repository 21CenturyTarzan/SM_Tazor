import { useCallback, useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import { useDispatch } from "react-redux";
import { usePathForNetwork } from "src/hooks/usePathForNetwork";
import { useHistory } from "react-router";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
  Typography,
  Zoom,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
} from "@material-ui/core";
import { t, Trans } from "@lingui/macro";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

import RebaseTimer from "../../components/RebaseTimer/RebaseTimer";
import TabPanel from "../../components/TabPanel";
import { getGohmBalFromSohm, trim } from "../../helpers";
import { changeApproval, onClaim, changeTazorStake, changeTazStake } from "../../slices/StakeThunk";
// import { changeApproval as changeTazorApproval } from "../../slices/WrapThunk";
import "./stake.scss";
import { useWeb3Context } from "src/hooks/web3Context";
import { isPendingTxn, txnButtonText } from "src/slices/PendingTxnsSlice";
import { Skeleton } from "@material-ui/lab";
import ExternalStakePool from "./ExternalStakePool";
import { error } from "../../slices/MessagesSlice";
import { getBalances } from "../../slices/AccountSlice";
import { ethers } from "ethers";
import Calculator from "./CalculatorPaper";
import { useAppSelector } from "src/hooks";
import { Directions, ExpandMore } from "@material-ui/icons";
import StakeRow from "./StakeRow";
import { Metric, MetricCollection } from "../../components/Metric";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Stake() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { provider, address, connect } = useWeb3Context();
  const networkId = useAppSelector(state => state.network.networkId);
  usePathForNetwork({ pathName: "stake", networkID: networkId, history });

  const [zoomed, setZoomed] = useState(false);
  const [view, setView] = useState(0);
  const [tazorQuantity, setTazorQuantity] = useState("");
  const [tazQuantity, setTazQuantity] = useState("");
  const SECONDS_TO_REFRESH = 60;
  const [secondsToRefresh, setSecondsToRefresh] = useState(SECONDS_TO_REFRESH);

  const isAppLoading = useAppSelector(state => state.app.loading);
  const currentIndex = useAppSelector(state => {
    return state.app.currentIndex;
  });
  const fiveDayRate = useAppSelector(state => {
    return state.app.fiveDayRate;
  });
  const tazorBalance = useAppSelector(state => {
    console.log("tarzan:account.tazorbalance===>", state.account.balances.tazor);
    return state.account.balances && state.account.balances.tazor;
  });
  const tazBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.taz;
  });
  const tazorStakedBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.tazorStaked;
  });
  const tazStakedBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.tazStaked;
  });
  const nextReward = useAppSelector(state => {
    return state.account.balances && state.account.balances.tazReward;
  });
  const totalTazorStaked = useAppSelector(state => {
    return state.account.balances && state.account.balances.totalTazorStaked;
  });
  const totalTazStaked = useAppSelector(state => {
    return state.account.balances && state.account.balances.totalTazStaked;
  });
  const totalDeposited = useAppSelector(state => {
    return state.account.balances && state.account.balances.totalDeposited;
  });
  const tazorMarketPrice = useAppSelector(state => {
    return state.app.marketPrice && state.app.marketPrice;
  });
  const tazMarketPrice = useAppSelector(state => {
    return state.app.tazMarketPrice && state.app.tazMarketPrice;
  });

  const sohmBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.sohm;
  });
  const sohmV1Balance = useAppSelector(state => {
    return state.account.balances && state.account.balances.sohmV1;
  });
  const fsohmBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.fsohm;
  });
  const fgohmBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.fgohm;
  });
  const fgOHMAsfsOHMBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.fgOHMAsfsOHM;
  });
  const wsohmBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.wsohm;
  });
  const fiatDaowsohmBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.fiatDaowsohm;
  });
  const calculateWrappedAsSohm = (balance: string) => {
    return Number(balance) * Number(currentIndex);
  };
  const fiatDaoAsSohm = calculateWrappedAsSohm(fiatDaowsohmBalance);
  const gOhmBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.gohm;
  });

  // const gOhmAsSohm = calculateWrappedAsSohm(gOhmBalance);
  const gOhmAsSohm = useAppSelector(state => {
    return state.account.balances && state.account.balances.gOhmAsSohmBal;
  });
  const wsohmAsSohm = calculateWrappedAsSohm(wsohmBalance);

  const tazorStakeAllowance = useAppSelector(state => {
    return (state.account.staking && state.account.staking.tazorStake) || 0;
  });
  const tazStakeAllowance = useAppSelector(state => {
    return (state.account.staking && state.account.staking.tazStake) || 0;
  });
  const unstakeAllowance = useAppSelector(state => {
    return (state.account.staking && state.account.staking.ohmUnstake) || 0;
  });

  const directUnstakeAllowance = useAppSelector(state => {
    return (state.account.wrapping && state.account.wrapping.gOhmUnwrap) || 0;
  });

  const stakingRebase = useAppSelector(state => {
    return state.app.stakingRebase || 0;
  });
  const stakingAPY = useAppSelector(state => {
    return state.app.stakingAPY || 0;
  });
  const stakingTVL = useAppSelector(state => {
    return state.app.stakingTVL || 0;
  });

  const pendingTransactions = useAppSelector(state => {
    return state.pendingTransactions;
  });

  useEffect(() => {
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

  const setTazorMax = () => {
    if (view === 0) {
      setTazorQuantity(tazorBalance);
    } else {
      setTazorQuantity(tazorStakedBalance);
    }
  };

  const setTazMax = () => {
    if (view === 0) {
      setTazQuantity(tazBalance);
    } else {
      setTazQuantity(tazStakedBalance);
    }
  };

  const onClaimReward = async () => {
    await dispatch(onClaim({ networkID: networkId, provider, address }));
  };

  const onSeekApproval = async (token: string) => {
    await dispatch(changeApproval({ address, token: token.toLowerCase(), provider, networkID: networkId }));
    // if (token === "tazor") {
    //   await dispatch(changeTazorApproval({ address, token: token.toLowerCase(), provider, networkID: networkId }));
    // } else {
    //   await dispatch(changeTazorApproval({ address, token: token.toLowerCase(), provider, networkID: networkId }));
    // }
  };

  const onChangeTazorStake = async (action: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(tazorQuantity)) || Number(tazorQuantity) === 0) {
      // eslint-disable-next-line no-alert
      return dispatch(error(t`Please enter a value!`));
    }

    // 1st catch if quantity > balance
    let gweiValue = ethers.utils.parseUnits(tazorQuantity.toString(), "gwei");
    if (action === "stake" && gweiValue.gt(ethers.utils.parseUnits(tazorBalance, "gwei"))) {
      return dispatch(error(t`You cannot stake more than your TAZOR balance.`));
    }

    if (
      checked === false &&
      action === "unstake" &&
      gweiValue.gt(ethers.utils.parseUnits(tazorStakedBalance, "gwei"))
    ) {
      return dispatch(
        error(
          t`You do not have enough sTAZOR to complete this transaction.  To unstake from gTAZOR, please check the box.`,
        ),
      );
    }

    /**
     * converts sTAZOR quantity to gTAZOR quantity when box is checked for gTAZOR staking
     * @returns sTAZOR as gTAZOR quantity
     */
    // const formQuant = checked && currentIndex && view === 1 ? quantity / Number(currentIndex) : quantity;
    // const formQuant = async () => {
    //   if (checked && currentIndex && view === 1) {
    //     return await getGohmBalFromSohm({
    //       provider,
    //       networkID: networkId,
    //       sOHMbalance: tazorQuantity,
    //       address: address,
    //     });
    //   } else {
    //     return tazorQuantity;
    //   }
    // };

    await dispatch(
      changeTazorStake({
        address,
        action,
        value: tazorQuantity, //await formQuant(),
        provider,
        networkID: networkId,
        version2: true,
        rebase: !checked,
      }),
    );
    setTazorQuantity("");
  };

  const onChangeTazStake = async (action: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(tazQuantity)) || Number(tazQuantity) === 0) {
      // eslint-disable-next-line no-alert
      return dispatch(error(t`Please enter a value!`));
    }

    // 1st catch if quantity > balance
    let gweiValue = ethers.utils.parseUnits(tazQuantity.toString(), "gwei");
    if (action === "stake" && gweiValue.gt(ethers.utils.parseUnits(tazBalance, "gwei"))) {
      return dispatch(error(t`You cannot stake more than your TAZOR balance.`));
    }

    if (checked === false && action === "unstake" && gweiValue.gt(ethers.utils.parseUnits(tazStakedBalance, "gwei"))) {
      return dispatch(
        error(t`You do not have enough TAZ to complete this transaction.  To unstake from TAZ, please check the box.`),
      );
    }

    /**
     * converts sTAZOR quantity to gTAZOR quantity when box is checked for gTAZOR staking
     * @returns sTAZOR as gTAZOR quantity
     */
    // const formQuant = checked && currentIndex && view === 1 ? quantity / Number(currentIndex) : quantity;
    // const formQuant = async () => {
    //   if (checked && currentIndex && view === 1) {
    //     return await getGohmBalFromSohm({ provider, networkID: networkId, sOHMbalance: tazQuantity, address: address });
    //   } else {
    //     return tazQuantity;
    //   }
    // };

    await dispatch(
      changeTazStake({
        address,
        action,
        value: tazQuantity, //await formQuant(),
        provider,
        networkID: networkId,
        version2: true,
        rebase: !checked,
      }),
    );
    setTazQuantity("");
  };

  const hasAllowance = useCallback(
    token => {
      if (token === "tazor") return tazorStakeAllowance > 0;
      if (token === "taz") return tazStakeAllowance > 0;
      if (token === "sohm") return unstakeAllowance > 0;
      if (token === "gohm") return directUnstakeAllowance > 0;
      return 0;
    },
    [tazorStakeAllowance, tazStakeAllowance, unstakeAllowance, directUnstakeAllowance],
  );

  const isAllowanceDataLoading =
    ((tazorStakeAllowance == null || tazStakeAllowance == null) && view === 0) ||
    (unstakeAllowance == null && view === 1);

  let modalButton = [];

  modalButton.push(
    <Button variant="contained" color="primary" className="connect-button" onClick={connect} key={1}>
      <Trans>Connect Wallet</Trans>
    </Button>,
  );

  const changeView = (_event: React.ChangeEvent<{}>, newView: number) => {
    setView(newView);
  };

  const handleChangeTazorQuantity = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
    if (Number(e.target.value) >= 0) setTazorQuantity(e.target.value);
  }, []);

  const handleChangeTazQuantity = useCallback<ChangeEventHandler<HTMLInputElement>>(e => {
    if (Number(e.target.value) >= 0) setTazQuantity(e.target.value);
  }, []);

  const trimmedBalance = Number(
    [sohmBalance, gOhmAsSohm, sohmV1Balance, wsohmAsSohm, fiatDaoAsSohm, fsohmBalance, fgOHMAsfsOHMBalance]
      .filter(Boolean)
      .map(balance => Number(balance))
      .reduce((a, b) => a + b, 0)
      .toFixed(4),
  );
  const trimmedStakingAPY = trim(stakingAPY * 100, 1);

  const stakingRebasePercentage = trim(stakingRebase * 100, 4);
  // const nextRewardValue = trim((Number(stakingRebasePercentage) / 100) * trimmedBalance, 4);
  const nextRewardValue = trim(Number(nextReward), 4);

  const formattedTrimmedStakingAPY = new Intl.NumberFormat("en-US").format(Number(trimmedStakingAPY));
  const formattedStakingTVL = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(stakingTVL);

  const formattedTotalTazorStaked = new Intl.NumberFormat("en-US").format(Number(totalTazorStaked));
  const formattedTotalTazStaked = new Intl.NumberFormat("en-US").format(Number(totalTazStaked));
  const formattedTotalStakedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(totalDeposited);

  const formattedTazorUnstaked = new Intl.NumberFormat("en-US").format(Number(trim(Number(tazorBalance), 4)));
  const formattedTazUnstaked = new Intl.NumberFormat("en-US").format(Number(trim(Number(tazBalance), 4)));
  const formattedTazorStaked = new Intl.NumberFormat("en-US").format(Number(trim(Number(tazorStakedBalance), 4)));
  const formattedTazStaked = new Intl.NumberFormat("en-US").format(Number(trim(Number(tazStakedBalance), 4)));
  const formattedNextReward = new Intl.NumberFormat("en-US").format(Number(nextRewardValue));

  const formattedTazorUnstakedPrice = new Intl.NumberFormat("en-US").format(
    Number(tazorBalance) * Number(tazorMarketPrice),
  );
  const formattedTazUnstakedPrice = new Intl.NumberFormat("en-US").format(
    Number(trim(Number(tazBalance) * Number(tazMarketPrice), 4)),
  );
  const formattedTazorStakedPrice = new Intl.NumberFormat("en-US").format(
    Number(trim(Number(tazorStakedBalance) * Number(tazorMarketPrice), 4)),
  );
  const formattedTazStakedPrice = new Intl.NumberFormat("en-US").format(
    Number(trim(Number(tazStakedBalance) * Number(tazMarketPrice), 4)),
  );
  const formattedNextRewardPrice = new Intl.NumberFormat("en-US").format(
    Number(trim(Number(nextReward) * Number(tazMarketPrice), 4)),
  );

  const formattedCurrentIndex = trim(Number(currentIndex), 1);

  const [checked, setChecked] = useState(true);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  function ConfirmDialog() {
    // const gohmQuantity = () => {
    //   if (quantity) {
    //     return (Number(quantity) / Number(currentIndex)).toFixed(4);
    //   } else {
    //     return "";
    //   }
    // };

    const tazQuantityNum = () => {
      if (tazQuantity) {
        return Number(tazQuantity).toFixed(4);
      } else {
        return "";
      }
    };
    const ohmQuantity = () => {
      if (tazorQuantity) {
        return Number(tazorQuantity).toFixed(4);
      } else {
        return "";
      }
    };

    return (
      <Paper
        className="ohm-card confirm-dialog"
        style={{ marginBottom: "0.8rem", width: "100%", padding: "12px 12px" }}
      >
        <Box className="dialog-container" display="flex" alignItems="center" justifyContent="center">
          <Box>
            <Checkbox
              checked={checked}
              onChange={e => handleCheck(e)}
              color="primary"
              inputProps={{ "aria-label": "checkbox" }}
              className="stake-to-ohm-checkbox"
              checkedIcon={<CheckBoxIcon viewBox="0 0 25 25" />}
              icon={<CheckBoxOutlineBlankIcon viewBox="0 0 25 25" />}
            />
          </Box>
          <Box width="100%">
            <Typography variant="body2" style={{ margin: "10px 10px 10px 0px" }}>
              {view === 0 && checked && `Staking ${ohmQuantity()} TAZOR to ${tazQuantityNum()} gTAZOR`}
              {view === 1 && checked && `Unstaking ${tazQuantityNum()} gTAZOR to ${ohmQuantity()} TAZOR`}
              {view === 0 && !checked && "Stake to gTAZOR instead"}
              {view === 1 && !checked && "Unstake from gTAZOR instead"}
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <div id="stake-view">
      <Zoom in={true} onEntered={() => setZoomed(true)}>
        <Paper className={`ohm-card`}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              {/* <div className="card-header" style={{ display: "flex" }}> */}
              <div style={{ display: "flex" }}>
                <Typography variant="h4"> User Controlled APR! Your current APR is: </Typography>
                <Typography variant="h4">
                  {!stakingAPY ? (
                    <span> &nbsp;&nbsp;{`10%`}</span>
                  ) : (
                    // <Skeleton width="100%" />
                    <span> &nbsp;&nbsp;{`${formattedTrimmedStakingAPY}%`}</span>
                  )}
                </Typography>
              </div>
              <div className="row">
                <Typography align="left">
                  <h2>How High Can You Build Your APR?!</h2>
                  
                </Typography>
              </div>
              <div className="row">
                <Typography align="left">
                  <h2>To Buy or Sell TAZOR or TAZ <a href="https://pancakeswap.finance/swap?inputCurrency=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c&outputCurrency=0xee65D8B88F86ace0f7bA42BA2d2C679b6f604bf0">Click Here</a></h2>
                  <h2 style={{ textAlign: "justify", fontSize: "15px", fontWeight: 200 }}>TAZOR contract address is 0xee65D8B88F86ace0f7bA42BA2d2C679b6f604bf0</h2>
                  <h2 style={{ textAlign: "justify", fontSize: "15px", fontWeight: 200 }}>TAZ contract address is 0x1fed8951D852b88930557B681409b334e1089343</h2>
                </Typography>
              </div>
              {/* <RebaseTimer /> */}
              {/* </div> */}
            </Grid>

            <Grid item>
              <MetricCollection>
                <Metric
                  className="stake-index"
                  label={t`Total TAZOR Staked`}
                  metric={`${formattedTotalTazorStaked} TAZOR`}
                  isLoading={totalTazorStaked ? false : true}
                />
                <Metric
                  className="stake-tvl"
                  label={t`Total Value Deposited`}
                  metric={`${formattedTotalStakedPrice}`}
                  isLoading={totalDeposited ? false : true}
                />
                <Metric
                  className="stake-apy"
                  label={t`Total TAZ Staked`}
                  metric={`${formattedTotalTazStaked} TAZ`}
                  isLoading={totalTazStaked ? false : true}
                />
              </MetricCollection>
            </Grid>

            <div className="staking-area">
              {!address ? (
                <div className="stake-wallet-notification">
                  <div className="wallet-menu" id="wallet-menu">
                    {modalButton}
                  </div>
                  <Typography variant="h6">
                    <Trans>Connect your wallet to stake TAZOR</Trans>
                  </Typography>
                </div>
              ) : (
                <>
                  <Box className="stake-action-area">
                    <Tabs
                      key={String(zoomed)}
                      centered
                      value={view}
                      textColor="primary"
                      indicatorColor="primary"
                      className="stake-tab-buttons"
                      onChange={changeView}
                      aria-label="stake tabs"
                      //hides the tab underline sliding animation in while <Zoom> is loading
                      TabIndicatorProps={!zoomed ? { style: { display: "none" } } : undefined}
                    >
                      <Tab
                        label={t({
                          id: "Stake",
                          comment: "The action of staking (verb)",
                        })}
                        {...a11yProps(0)}
                      />
                      <Tab label={t`Unstake`} {...a11yProps(1)} />
                    </Tabs>
                    <Grid container className="stake-action-row">
                      <Grid item xs={12} sm={8} className="stake-grid-item">
                        {address && !isAllowanceDataLoading ? (
                          view === 0 ? (
                            <>
                              {!hasAllowance("tazor") ? (
                                <Box className="help-text">
                                  <Typography variant="body1" className="stake-note" color="textSecondary">
                                    <Trans>First time staking</Trans> <b>TAZOR</b>?
                                    <br />
                                    <Trans>Please approve TAZOR to use your</Trans> <b>TAZOR</b>{" "}
                                    <Trans>for staking</Trans>.
                                  </Typography>
                                </Box>
                              ) : (
                                <FormControl className="ohm-input" variant="outlined" color="primary">
                                  <InputLabel htmlFor="amount-input"></InputLabel>
                                  <OutlinedInput
                                    id="amount-input"
                                    type="number"
                                    placeholder="Enter a TAZOR amount"
                                    className="stake-input"
                                    value={tazorQuantity}
                                    onChange={handleChangeTazorQuantity}
                                    labelWidth={0}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <Button variant="text" onClick={setTazorMax} color="inherit">
                                          Max
                                        </Button>
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              )}
                              {!hasAllowance("taz") ? (
                                <Box className="help-text" style={{ marginTop: "18px" }}>
                                  <Typography variant="body1" className="stake-note" color="textSecondary">
                                    <Trans>First time staking</Trans> <b>TAZ</b>?
                                    <br />
                                    <Trans>Please approve TAZ to use your </Trans>
                                    <b> TAZ </b>
                                    {""}
                                    <Trans> for staking</Trans>.
                                  </Typography>
                                </Box>
                              ) : (
                                <FormControl
                                  className="ohm-input"
                                  style={{ marginTop: "18px" }}
                                  variant="outlined"
                                  color="primary"
                                >
                                  <InputLabel htmlFor="amount-input"></InputLabel>
                                  <OutlinedInput
                                    id="amount-input"
                                    type="number"
                                    placeholder="Enter a TAZ amount"
                                    className="stake-input"
                                    value={tazQuantity}
                                    onChange={handleChangeTazQuantity}
                                    labelWidth={0}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <Button variant="text" onClick={setTazMax} color="inherit">
                                          Max
                                        </Button>
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              )}
                            </>
                          ) : (
                            <>
                              {!hasAllowance("tazor") ? (
                                <Box className="help-text">
                                  <Typography variant="body1" className="stake-note" color="textSecondary">
                                    <Trans>First time unstaking</Trans> <b>TAZOR</b>?
                                    <br />
                                    <Trans>Please approve Tazor to use your</Trans> <b>TAZOR</b>{" "}
                                    <Trans>for unstaking</Trans>.
                                  </Typography>
                                </Box>
                              ) : (
                                <FormControl className="ohm-input" variant="outlined" color="primary">
                                  <InputLabel htmlFor="amount-input"></InputLabel>
                                  <OutlinedInput
                                    id="amount-input"
                                    type="number"
                                    placeholder="Enter a TAZOR amount"
                                    className="stake-input"
                                    value={tazorQuantity}
                                    onChange={handleChangeTazorQuantity}
                                    labelWidth={0}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <Button variant="text" onClick={setTazorMax} color="inherit">
                                          Max
                                        </Button>
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              )}
                              {!hasAllowance("taz") ? (
                                <Box className="help-text" style={{ marginTop: "18px" }}>
                                  <Typography variant="body1" className="stake-note" color="textSecondary">
                                    <Trans>First time unstaking</Trans> <b>TAZ</b>?
                                    <br />
                                    <Trans>Please approve TAZ to use your</Trans> <b>TAZ</b>{" "}
                                    <Trans>for unstaking</Trans>.
                                  </Typography>
                                </Box>
                              ) : (
                                <FormControl
                                  className="ohm-input"
                                  style={{ marginTop: "18px" }}
                                  variant="outlined"
                                  color="primary"
                                >
                                  <InputLabel htmlFor="amount-input"></InputLabel>
                                  <OutlinedInput
                                    id="amount-input"
                                    type="number"
                                    placeholder="Enter a TAZ amount"
                                    className="stake-input"
                                    value={tazQuantity}
                                    onChange={handleChangeTazQuantity}
                                    labelWidth={0}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        <Button variant="text" onClick={setTazMax} color="inherit">
                                          Max
                                        </Button>
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                              )}
                            </>
                          )
                        ) : (
                          <Skeleton width="150px" />
                        )}
                      </Grid>
                      <Grid item xs={12} sm={4} className="stake-grid-item">
                        <TabPanel value={view} index={0} className="stake-tab-panel">
                          <Box m={-2}>
                            {isAllowanceDataLoading ? (
                              <Skeleton />
                            ) : address ? (
                              <>
                                {hasAllowance("tazor") ? (
                                  <Button
                                    className="stake-button"
                                    variant="contained"
                                    color="primary"
                                    disabled={isPendingTxn(pendingTransactions, "staking")}
                                    onClick={() => {
                                      onChangeTazorStake("stake");
                                    }}
                                  >
                                    {txnButtonText(pendingTransactions, "staking", t`Stake TAZOR`)}
                                  </Button>
                                ) : (
                                  <Button
                                    className="stake-button"
                                    variant="contained"
                                    color="primary"
                                    disabled={isPendingTxn(pendingTransactions, "approve_staking")}
                                    onClick={() => {
                                      onSeekApproval("tazor");
                                    }}
                                  >
                                    {txnButtonText(pendingTransactions, "approve_staking", t`Approve TAZOR`)}
                                  </Button>
                                )}
                                {hasAllowance("taz") ? (
                                  <Button
                                    className="stake-button"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: "18px" }}
                                    disabled={isPendingTxn(pendingTransactions, "staking")}
                                    onClick={() => {
                                      onChangeTazStake("stake");
                                    }}
                                  >
                                    {txnButtonText(pendingTransactions, "staking", t`Stake TAZ`)}
                                  </Button>
                                ) : (
                                  <Button
                                    className="stake-button"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: "18px" }}
                                    disabled={isPendingTxn(pendingTransactions, "approve_staking")}
                                    onClick={() => {
                                      onSeekApproval("taz");
                                    }}
                                  >
                                    {txnButtonText(pendingTransactions, "approve_staking", t`Approve TAZ`)}
                                  </Button>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </Box>
                        </TabPanel>

                        <TabPanel value={view} index={1} className="stake-tab-panel">
                          <Box m={-2}>
                            {isAllowanceDataLoading ? (
                              <Skeleton />
                            ) : address ? (
                              <>
                                {hasAllowance("tazor") ? (
                                  <Button
                                    className="stake-button"
                                    variant="contained"
                                    color="primary"
                                    disabled={isPendingTxn(pendingTransactions, "unstaking")}
                                    onClick={() => {
                                      onChangeTazorStake("unstake");
                                    }}
                                  >
                                    {txnButtonText(pendingTransactions, "unstaking", t`Unstake TAZOR`)}
                                  </Button>
                                ) : (
                                  <Button
                                    className="stake-button"
                                    variant="contained"
                                    color="primary"
                                    disabled={isPendingTxn(pendingTransactions, "approve_unstaking")}
                                    onClick={() => {
                                      onSeekApproval("tazor");
                                    }}
                                  >
                                    {txnButtonText(pendingTransactions, "approve_unstaking", t`Approve TAZOR`)}
                                  </Button>
                                )}
                                {hasAllowance("taz") ? (
                                  <Button
                                    className="stake-button"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: "18px" }}
                                    disabled={isPendingTxn(pendingTransactions, "unstaking")}
                                    onClick={() => {
                                      onChangeTazStake("unstake");
                                    }}
                                  >
                                    {txnButtonText(pendingTransactions, "unstaking", t`Unstake TAZ`)}
                                  </Button>
                                ) : (
                                  <Button
                                    className="stake-button"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: "18px" }}
                                    disabled={isPendingTxn(pendingTransactions, "approve_unstaking")}
                                    onClick={() => {
                                      onSeekApproval("taz");
                                    }}
                                  >
                                    {txnButtonText(pendingTransactions, "approve_unstaking", t`Approve TAZ`)}
                                  </Button>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </Box>
                        </TabPanel>
                      </Grid>
                    </Grid>
                  </Box>
                  {/* {ConfirmDialog()} */}
                  <div className="stake-user-data">
                    <StakeRow
                      title={t`TAZOR Wallet Balance`}
                      id="user-balance"
                      balance={`${formattedTazorUnstaked} TAZOR ( $${formattedTazorUnstakedPrice} )`}
                      {...{ isAppLoading }}
                    />
                    <StakeRow
                      title={t`TAZ Wallet Balance`}
                      id="user-balance"
                      balance={`${formattedTazUnstaked} TAZ ( $${formattedTazUnstakedPrice} )`}
                      {...{ isAppLoading }}
                    />
                    <Divider color="secondary" />
                    <StakeRow
                      title={t`Staked TAZOR Balance`}
                      id="user-staked-balance"
                      balance={`${formattedTazorStaked} TAZOR ( $${formattedTazorStakedPrice} )`}
                      {...{ isAppLoading }}
                    />
                    <StakeRow
                      title={t`Staked TAZ Balance`}
                      id="user-staked-balance"
                      balance={`${formattedTazStaked} TAZ ( $${formattedTazStakedPrice} )`}
                      {...{ isAppLoading }}
                    />
                    {/* <Accordion className="stake-accordion" square expanded={true}>
                      <AccordionSummary expandIcon={<ExpandMore className="stake-expand" />}>
                        <StakeRow
                          title={t`Staked Balance`}
                          id="user-staked-balance"
                          balance={`${trimmedBalance} sTAZOR`}
                          {...{ isAppLoading }}
                        />
                      </AccordionSummary>
                      <AccordionDetails>
                        <StakeRow
                          title={t`Single Staking`}
                          balance={`${trim(Number(sohmBalance), 4)} sTAZOR`}
                          indented
                          {...{ isAppLoading }}
                        />
                        <StakeRow
                          title={`${t`Wrapped Balance`}`}
                          balance={`${trim(Number(gOhmBalance), 4)} gTAZOR`}
                          indented
                          {...{ isAppLoading }}
                        />
                        {Number(fgohmBalance) > 0.00009 && (
                          <StakeRow
                            title={`${t`Wrapped Balance in Fuse`}`}
                            balance={`${trim(Number(fgohmBalance), 4)} gTAZOR`}
                            indented
                            {...{ isAppLoading }}
                          />
                        )}
                        {Number(sohmV1Balance) > 0.00009 && (
                          <StakeRow
                            title={`${t`Single Staking`} (v1)`}
                            balance={`${trim(Number(sohmV1Balance), 4)} sTAZOR (v1)`}
                            indented
                            {...{ isAppLoading }}
                          />
                        )}
                        {Number(wsohmBalance) > 0.00009 && (
                          <StakeRow
                            title={`${t`Wrapped Balance`} (v1)`}
                            balance={`${trim(Number(wsohmBalance), 4)} wsTAZOR (v1)`}
                            {...{ isAppLoading }}
                            indented
                          />
                        )}
                        {Number(fiatDaowsohmBalance) > 0.00009 && (
                          <StakeRow
                            title={t`Wrapped Balance in FiatDAO`}
                            balance={`${trim(Number(fiatDaowsohmBalance), 4)} wsTAZOR (v1)`}
                            {...{ isAppLoading }}
                            indented
                          />
                        )}
                        {Number(fsohmBalance) > 0.00009 && (
                          <StakeRow
                            title={t`Staked Balance in Fuse`}
                            balance={`${trim(Number(fsohmBalance), 4)} fsTAZOR (v1)`}
                            indented
                            {...{ isAppLoading }}
                          />
                        )}
                      </AccordionDetails>
                    </Accordion> */}
                    <Divider color="secondary" />
                    {/* <StakeRow
                      title={t`Current APR% based on staked TAZ`}
                      balance={`${nextRewardValue} TAZ`}
                      {...{ isAppLoading }}
                    /> */}
                    <StakeRow
                      title={t`Reward Amount`}
                      balance={`${formattedNextReward} TAZ ( $${formattedNextRewardPrice})`}
                      {...{ isAppLoading }}
                    />
                    <Box display="flex" justifyContent="center" className={`global-claim-buttons`}>
                      <Button
                        variant="contained"
                        color="primary"
                        className="transaction-button"
                        fullWidth
                        // disabled={pendingClaim()}
                        onClick={() => {
                          onClaimReward();
                        }}
                      >
                        {txnButtonText(pendingTransactions, "claiming", t`Claim`)}
                      </Button>
                    </Box>

                    {/* <StakeRow
                      title={t`Next Reward Yield`}
                      balance={`${stakingRebasePercentage}%`}
                      {...{ isAppLoading }}
                    />
                    <StakeRow
                      title={t`ROI (5-Day Rate)`}
                      balance={`${trim(Number(fiveDayRate) * 100, 4)}%`}
                      {...{ isAppLoading }}
                    /> */}
                  </div>
                </>
              )}
            </div>
          </Grid>
        </Paper>
      </Zoom>
      <Calculator />
      {/* <ExternalStakePool /> */}
    </div>
  );
}

export default Stake;
