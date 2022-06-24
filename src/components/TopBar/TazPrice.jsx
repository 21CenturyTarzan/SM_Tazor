import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, SvgIcon, Typography } from "@material-ui/core";
import { ReactComponent as TazTokenImg } from "../../assets/tokens/token_TAZ.svg";
import { Skeleton } from "@material-ui/lab";
import { formatCurrency } from "../../helpers";

function TazorPrice() {
  const tazMarketPrice = useSelector(state => state.app.tazMarketPrice);
  return (
    <div className="wallet-menu">
      <Button id="ohm-menu-button" size="large" variant="contained" color="secondary" title="TAZOR">
        <SvgIcon component={TazTokenImg} viewBox="0 0 32 32" style={{ height: "25px", width: "25px" }} />
        <Typography className="ohm-menu-button-text">
          {!tazMarketPrice ? <Skeleton width="30px" /> : <>{formatCurrency(tazMarketPrice, 2)}</>}
        </Typography>
      </Button>
    </div>
  );
}

export default TazorPrice;
