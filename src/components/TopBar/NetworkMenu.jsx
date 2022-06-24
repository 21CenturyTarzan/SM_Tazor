import { Button, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./networkmenu.scss";
import Grid from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";
import { NETWORKS } from "../../constants";
import { useWeb3Context } from "../../hooks/web3Context";
import { switchNetwork, initializeNetwork } from "../../slices/NetworkSlice";
function NetworkMenu() {
  const networkId = useSelector(state => state.network.networkId);
  const networkName = useSelector(state => state.network.networkName);
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const { connect, disconnect, connected, web3, provider, address, chainID, chainChanged } = useWeb3Context();

  useEffect(() => {
    dispatch(initializeNetwork({ provider: provider }));
    if (NETWORKS[networkId]) setImage(NETWORKS[networkId].image);
    console.log("NetworkID", networkId);
  }, [chainChanged, networkId, chainID, connected]);

  return (
    <Grid container className="network-menu-container">
      <Button
        aria-label="change-network"
        size="large"
        variant="contained"
        color="secondary"
        title="Change Network"
        component={NavLink}
        to="/network"
        className="network-menu-button"
      >
        <img src={image} alt={networkName} />
        <Typography className="network-menu-button-text">{networkName}</Typography>
      </Button>
    </Grid>
  );
}

export default NetworkMenu;
