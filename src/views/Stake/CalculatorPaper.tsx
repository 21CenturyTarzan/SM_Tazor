import { useCallback, useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Box, Button, Paper, Typography, Grid, SvgIcon, Link } from "@material-ui/core";
import "./Calculator.scss";
import { trim } from "../../helpers";
import { Trans } from "@lingui/macro";
import Calculator from "./CalculatorDialog";
import { useAppSelector } from "src/hooks";
import useEscape from "../../hooks/useEscape";

type InputEvent = ChangeEvent<HTMLInputElement>;

export default function CalculatorPaper() {
  const [open, setOpen] = useState(false);

  const stakingAPY = useAppSelector(state => {
    return state.app.stakingAPY || 0;
  });

  const trimmedStakingAPY = trim(stakingAPY * 100, 1);
  const tazBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.taz;
  });
  const tazStakedBalance = useAppSelector(state => {
    return state.account.balances && state.account.balances.tazStaked;
  });

  const [apr, setapr] = useState("");

  const formattedTazUnstaked = new Intl.NumberFormat("en-US").format(Number(trim(Number(tazBalance), 1)));

  useEffect(() => {
    const aprNum = stakingAPY * 100;
    let totalAmount = ((aprNum / Number(100) - 0.1) * 100000) / Number(10.95);
    let requiredAmount = totalAmount - Number(tazStakedBalance);
    if (totalAmount < 0) totalAmount = 0;
    if (requiredAmount < 0) requiredAmount = 0;

    setapr("" + Number(aprNum).toFixed(2));
    setTotalAmount("" + Number(totalAmount).toFixed(2));
    setRequiredAmount("" + Number(requiredAmount).toFixed(2));
  }, [trimmedStakingAPY]);

  // useEffect(() => {
  //   const aprNum = Number(apr);
  //   let totalAmount = ((aprNum / Number(100) - 0.1) * 100000) / Number(10.);
  //   let requiredAmount = totalAmount - Number(tazStakedBalance);
  //   if (totalAmount < 0) totalAmount = 0;
  //   if (requiredAmount < 0) requiredAmount = 0;

  //   setTotalAmount("" + totalAmount);
  //   setRequiredAmount("" + requiredAmount);
  // }, [apr]);

  // console.log("[tz]==> stakingAPR: ", apr);

  const [totalTazAmount, setTotalAmount] = useState("");
  const [requiredTazAmount, setRequiredAmount] = useState("");

  const handleOpen = (e: any): void => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e: any): void => {
    e.stopPropagation();
    setOpen(false);
  };

  const onClickModal = (e: any): void => {
    e.stopPropagation();
  };

  let history = useHistory();

  useEscape(() => {
    if (open) handleClose;
    else history.push(`/stake`);
  });

  // const stakingAPR = useAppSelector(state => {
  //   return state.app.stakingAPY || 0;
  // });

  const onChangeAPR = (e: InputEvent): void => {
    // setSlippage(Number(e.target.value));
    // setapr(e.target.value);
    const aprNum = Number(e.target.value);
    let totalAmount = ((aprNum / Number(100) - 0.1) * 100000) / Number(10.95);
    let requiredAmount = totalAmount - Number(tazStakedBalance);
    if (totalAmount < 0) totalAmount = 0;
    if (requiredAmount < 0) requiredAmount = 0;

    setapr(e.target.value);
    setTotalAmount("" + Number(totalAmount).toFixed(2));
    setRequiredAmount("" + Number(requiredAmount).toFixed(2));
  };

  const onSetMax = (): void => {
    setTotalAmount("" + Number(tazBalance).toFixed(2));
    setapr("" + Number((10.95 * (Number(tazBalance) / 100000) + 0.1) * 100).toFixed(2));
    let requiredAmount = Number(tazBalance) - Number(tazStakedBalance);
    setRequiredAmount("" + Number(requiredAmount).toFixed(2));
  };

  const onTAZChange = (e: InputEvent): void => {
    let tazAmount = e.target.value;
    setTotalAmount(e.target.value);
    // setapr("" + (10.95 * (Number(tazAmount) / 100000) + 0.1) * 100);
    setapr("" + Number((10.95 * (Number(tazAmount) / 100000) + 0.1) * 100).toFixed(2));
    let requiredAmount = Number(tazAmount) - Number(tazStakedBalance);
    setRequiredAmount("" + Number(requiredAmount).toFixed(2));
  };

  return (
    <>
      <Paper className="ohm-card" onClick={onClickModal} id="calculator-paper">
        <Grid container direction="row" spacing={2} className="cta-box">
          <Grid item xs={12} sm={8}>
            <Box alignItems="center" display="flex" flexDirection="column">
              <Typography color="textPrimary" align="center" className="cta-header">
                <Trans>
                  User can calculate required amount of TAZ with desired <strong>APR</strong>.
                </Trans>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} className="button-box">
            <Button className="calculator-button" onClick={handleOpen} variant="outlined" color="secondary">
              <Typography variant="body1">
                <Trans>Calculator...</Trans>
              </Typography>
              <Calculator
                open={open}
                apr={apr}
                handleClose={handleClose}
                onAPRChange={onChangeAPR}
                // tazTotalAmount={`${trim(Number(totalTazAmount), 1)}`}
                tazTotalAmount={totalTazAmount}
                tazNeedAmount={`${trim(Number(requiredTazAmount), 1)}`}
                totalUnstakedTazAmount={formattedTazUnstaked}
                onSetMax={onSetMax}
                onTAZChange={onTAZChange}
              />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
