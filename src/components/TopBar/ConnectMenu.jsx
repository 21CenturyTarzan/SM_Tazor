import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Divider, Fade, Link, Paper, Popper, Slide, SvgIcon, Typography } from "@material-ui/core";
import { ReactComponent as ArrowUpIcon } from "../../assets/icons/arrow-up.svg";
import { ReactComponent as CaretDownIcon } from "../../assets/icons/caret-down.svg";
import { useWeb3Context } from "src/hooks/web3Context";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Trans } from "@lingui/macro";

function ConnectMenu({ theme }) {
  const { connect, disconnect, connected, web3 } = useWeb3Context();
  const networkId = useSelector(state => state.network.networkId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isConnected, setConnected] = useState(connected);
  const [isHovering, setIsHovering] = useState(false);

  const isVerySmallScreen = useMediaQuery("(max-width: 355px)");
  const isSmallScreen = useMediaQuery("(max-width: 500px)");

  const pendingTransactions = useSelector(state => {
    return state.pendingTransactions;
  });

  let buttonText = isSmallScreen ? <Trans>Connect</Trans> : <Trans>Connect Wallet</Trans>;
  let clickFunc = connect;

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  if (isConnected) {
    buttonText = <Trans>Disconnect</Trans>;
    clickFunc = disconnect;
  }

  if (pendingTransactions && pendingTransactions.length > 0) {
    buttonText = <Trans>In progress</Trans>;
    clickFunc = handleClick;
  }

  const open = Boolean(anchorEl);
  const id = open ? "ohm-popper-pending" : undefined;

  const primaryColor = theme === "light" ? "#49A1F2" : "#F8CC82";
  const buttonStyles =
    "pending-txn-container" + (isHovering && pendingTransactions.length > 0 ? " hovered-button" : "");

  const getEtherscanUrl = txnHash => {
    switch (networkId) {
      case 1:
        return "https://etherscan.io/tx/" + txnHash;
      case 3:
        return "https://ropsten.etherscan.io/tx/" + txnHash;
      case 42161:
        return "https://explorer.arbitrum.io/tx/" + txnHash;
      case 421611:
        return "https://rinkeby-explorer.arbitrum.io/tx/" + txnHash;
      case 43113:
        return "https://testnet.snowtrace.io/tx/" + txnHash;
      case 43114:
        return "https://snowtrace.io/tx/" + txnHash;
      case 250:
        return "https://ftmscan.com/tx/" + txnHash;
      case 137:
        return "https://polygonscan.com/tx/" + txnHash;
      case 361:
        return "https://explorer.thetatoken.org" + txnHash;
      case 8217:
        return "https://scope.klaytn.com" + txnHash;
      case 1666600000:
        return "https://explorer.harmony.one" + txnHash;
      case 40:
        return "https://telos.net/" + txnHash;
      case 19:
        return "https://songbird-explorer.flare.network" + txnHash;
      case 42220:
        return "https://explorer.celo.org" + txnHash;
      case 1285:
        return "https://blockscout.moonriver.moonbeam.network/" + txnHash;
      case 888:
        return "https://www.wanscan.org/" + txnHash;
    }
  };

  useEffect(() => {
    if (pendingTransactions.length === 0) {
      setAnchorEl(null);
    }
  }, [pendingTransactions]);

  useEffect(() => {
    setConnected(connected);
  }, [web3, connected]);

  return (
    <div
      onMouseEnter={e => (pendingTransactions && pendingTransactions.length > 0 ? handleClick(e) : null)}
      onMouseLeave={e => (pendingTransactions && pendingTransactions.length > 0 ? handleClick(e) : null)}
      className="wallet-menu"
      id="wallet-menu"
    >
      <Button
        id="wallet-button"
        className={buttonStyles}
        variant="contained"
        color="secondary"
        size="large"
        style={pendingTransactions.length > 0 ? { color: primaryColor } : {}}
        onClick={clickFunc}
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        key={1}
      >
        {buttonText}
        {pendingTransactions.length > 0 && (
          <Slide direction="left" in={isHovering} {...{ timeout: 333 }}>
            <SvgIcon className="caret-down" component={CaretDownIcon} htmlColor={primaryColor} />
          </Slide>
        )}
      </Button>

      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-end" transition>
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={100}>
              <Paper className="ohm-menu" elevation={1}>
                {pendingTransactions.map((x, i) => (
                  <Box key={i} fullWidth>
                    <Link key={x.txnHash} href={getEtherscanUrl(x.txnHash)} target="_blank" rel="noreferrer">
                      <Button size="large" variant="contained" color="secondary" fullWidth>
                        <Typography align="left">
                          {x.text} <SvgIcon component={ArrowUpIcon} />
                        </Typography>
                      </Button>
                    </Link>
                  </Box>
                ))}
                <Box className="add-tokens">
                  <Divider color="secondary" />
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={disconnect}
                    style={{ marginBottom: "0px" }}
                    fullWidth
                  >
                    <Typography>
                      <Trans>Disconnect</Trans>
                    </Typography>
                  </Button>
                </Box>
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </div>
  );
}

export default ConnectMenu;
