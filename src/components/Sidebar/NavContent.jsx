import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
// import Social from "./Social";
import externalUrls from "./externalUrls";
import { ReactComponent as StakeIcon } from "../../assets/icons/stake.svg";
import { ReactComponent as BondIcon } from "../../assets/icons/bond.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as OlympusIcon } from "../../assets/icons/TAZOR_logo.svg";
import { ReactComponent as WrapIcon } from "../../assets/icons/wrap.svg";
// import { ReactComponent as YtIcon } from "../../assets/icons/youtube.svg";
import { Trans } from "@lingui/macro";
import { trim, shorten } from "../../helpers";
import { useAddress } from "src/hooks/web3Context";
import useBonds from "../../hooks/Bonds";
import useENS from "../../hooks/useENS";
import { Paper, Link, Box, Typography, SvgIcon, Divider } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import "./sidebar.scss";
import { useSelector } from "react-redux";

function NavContent() {
  const [isActive] = useState();
  const address = useAddress();
  const networkId = useSelector(state => state.network.networkId);
  const { bonds } = useBonds(networkId);
  const { ensName } = useENS(address);

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("presale") >= 0 && page === "presale") {
      return true;
    }
    if (currentPath.indexOf("zap") >= 0 && page === "zap") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if (currentPath.indexOf("wrap") >= 0 && page === "wrap") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    if (currentPath.indexOf("33-together") >= 0 && page === "33-together") {
      return true;
    }
    if (currentPath.indexOf("33-together") >= 0 && page === "33-together") {
      return true;
    }
    return false;
  }, []);

  return (
    <Paper className="dapp-sidebar">
      <Box className="dapp-sidebar-inner" display="flex" justifyContent="space-between" flexDirection="column">
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="https://tazor.io" target="_blank">
              <SvgIcon
                color="primary"
                component={OlympusIcon}
                viewBox="0 0 150 60"
                style={{ minWdth: "120px", minHeight: "90px", width: "150px" }}
              />
            </Link>
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              {networkId === 1 ||
              networkId === 3 ||
              networkId === 56 ||
              networkId === 97 ||
              networkId == 43114 ||
              networkId == 43113 ||
              networkId == 250 ||
              networkId == 137 ||
              networkId == 361 ||
              networkId == 8217 ||
              networkId == 1666600000 ||
              networkId == 40 ||
              networkId == 19 ||
              networkId == 42220 ||
              networkId == 1285 ||
              networkId == 888 ? (
                <>
                  <Link
                    component={NavLink}
                    id="dash-nav"
                    to="/dashboard"
                    isActive={(match, location) => {
                      return checkPage(match, location, "dashboard");
                    }}
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                  >
                    <Typography variant="h6">
                      <SvgIcon color="primary" component={DashboardIcon} />
                      <Trans>Liquidity</Trans>
                    </Typography>
                  </Link>
                  <Link
                    component={NavLink}
                    id="dash-nav"
                    to="/presale"
                    isActive={(match, location) => {
                      return checkPage(match, location, "presale");
                    }}
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                  >
                    <Typography variant="h6">
                      <SvgIcon color="primary" component={WrapIcon} />
                      <Trans>Pre-Sale</Trans>
                    </Typography>
                  </Link>

                  <Link
                    component={NavLink}
                    id="bond-nav"
                    to="/bonds"
                    isActive={(match, location) => {
                      return checkPage(match, location, "bonds");
                    }}
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                  >
                    <Typography variant="h6">
                      <SvgIcon color="primary" component={BondIcon} />
                      <Trans>Discounted Tazor</Trans>
                    </Typography>
                  </Link>
                  <Link
                    component={NavLink}
                    id="stake-nav"
                    to="/stake"
                    isActive={(match, location) => {
                      return checkPage(match, location, "stake");
                    }}
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                  >
                    <Typography variant="h6">
                      <SvgIcon color="primary" component={StakeIcon} />
                      <Trans>Stake/Earn</Trans>
                    </Typography>
                  </Link>

                  {/* <Link
                    component={NavLink}
                    id="wrap-nav"
                    to="/wrap"
                    isActive={(match, location) => {
                      return checkPage(match, location, "wrap");
                    }}
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                  >
                    <Box display="flex" alignItems="center">
                      <SvgIcon component={WrapIcon} color="primary" viewBox="1 0 20 22" />
                      
                      <Typography variant="h6">Wrap</Typography>
                      
                    </Box>
                  </Link> */}

                  {/* <Link
                    href={"https://synapseprotocol.com/?inputCurrency=gOHM&outputCurrency=gOHM&outputChain=43114"}
                    target="_blank"
                  >
                    <Typography variant="h6">
                      <BridgeIcon />
                      <Trans>Bridge</Trans>
                      <SvgIcon style={{ marginLeft: "5px" }} component={ArrowUpIcon} />
                    </Typography>
                  </Link> */}
                  {/* <Link
                    component={NavLink}
                    id="zap-nav"
                    to="/zap"
                    isActive={(match, location) => {
                      return checkPage(match, location, "zap");
                    }}
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                  >
                    <Box display="flex" alignItems="center">
                      <SvgIcon component={ZapIcon} color="primary" />
                      <Typography variant="h6">OlyZaps</Typography>
                      
                    </Box>
                  </Link> */}

                  {/* <Link
                    component={NavLink}
                    id="33-together-nav"
                    to="/33-together"
                    isActive={(match, location) => {
                      return checkPage(match, location, "33-together");
                    }}
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                  >
                    <Typography variant="h6">
                      <SvgIcon color="primary" component={PoolTogetherIcon} />
                      3,3 Together
                    </Typography>
                  </Link> */}
                  {/* <Box className="menu-divider">
                    <Divider />
                  </Box> */}
                </>
              ) : (
                <>
                  <Link
                    component={NavLink}
                    id="dash-nav"
                    to="/dashboard"
                    isActive={(match, location) => {
                      return checkPage(match, location, "dashboard");
                    }}
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                  >
                    <Typography variant="h6">
                      <SvgIcon color="primary" component={DashboardIcon} />
                      <Trans>Liquidity</Trans>
                    </Typography>
                  </Link>
                  <Link
                    component={NavLink}
                    id="dash-nav"
                    to="/presale"
                    isActive={(match, location) => {
                      return checkPage(match, location, "presale");
                    }}
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                  >
                    <Typography variant="h6">
                      <SvgIcon color="primary" component={WrapIcon} />
                      <Trans>Pre-Sale</Trans>
                    </Typography>
                  </Link>
                  
                  <Link
                    component={NavLink}
                    id="stake-nav"
                    to="/stake"
                    isActive={(match, location) => {
                      return checkPage(match, location, "stake");
                    }}
                    className={`button-dapp-menu ${isActive ? "active" : ""}`}
                  >
                    <Typography variant="h6">
                      <SvgIcon color="primary" component={StakeIcon} />
                      <Trans>Stake/Earn</Trans>
                    </Typography>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-external-links">
            {Object.keys(externalUrls).map((link, i) => {
              return (
                <Link key={i} href={`${externalUrls[link].url}`} target="_blank">
                  <Typography variant="h6">{externalUrls[link].icon}</Typography>
                  <Typography variant="h6">{externalUrls[link].title}</Typography>
                </Link>
              );
            })}
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

export default NavContent;
