import { useSelector } from "react-redux";
import { trim, formatCurrency } from "../../../../helpers";
import { NETWORKS } from "../../../../constants";
import { Metric, DashBoardMetric } from "src/components/Metric";
import { t } from "@lingui/macro";

const sharedProps = {
  labelVariant: "h6",
  metricVariant: "h5",
};

// interface INetwork {
//   chainName: string;
//   chainId: number;
//   nativeCurrency: INativeCurrency;
//   rpcUrls: string[];
//   blockExplorerUrls: string[];
//   image: SVGImageElement;
//   imageAltText: string;
//   uri: () => string;
// }

export const MarketCap = () => {
  const marketCap = useSelector(state => state.app.marketCap || 0);
  return (
    <Metric
      label={`Market Cap`}
      metric={formatCurrency(marketCap, 0)}
      isLoading={marketCap ? false : true}
      {...sharedProps}
    />
  );
};

export const TazTVLCap = () => {
  const marketCap = useSelector(state => state.app.tazMarketCap || 0);
  const networkId = useSelector(state => state.network.networkId);
  let networkName = "ETH";
  let network = NETWORKS[networkId];
  if (network != null) {
    networkName = network["chainName"];
  }
  return (
    <DashBoardMetric
      label={`Total Taz Liquidity on ${networkName}`}
      metric={formatCurrency(marketCap, 0)}
      isLoading={marketCap ? false : true}
      {...sharedProps}
    />
  );
};

export const TazMarketCap = () => {
  const marketCap = useSelector(state => state.app.tazMarketPrice * state.app.tazTotalSupply || 0);
  return (
    <DashBoardMetric
      label={`TAZ Market Cap`}
      metric={formatCurrency(marketCap, 0)}
      isLoading={marketCap ? false : true}
      {...sharedProps}
    />
  );
};

export const TazorTVLCap = () => {
  const networkId = useSelector(state => state.network.networkId);
  let networkName = "ETH";
  let network = NETWORKS[networkId];
  if (network != null) {
    networkName = network["chainName"];
  }
  const marketCap = useSelector(state => {
    // console.log(state);
    return state.app.tazorMarketCap || 0;
  });

  return (
    <DashBoardMetric
      label={`Total Tazor Liquidity on ${networkName}`}
      metric={formatCurrency(marketCap, 0)}
      isLoading={marketCap ? false : true}
      {...sharedProps}
    />
  );
};

export const TazorMarketCap = () => {
  const marketCap = useSelector(state => {
    return state.app.marketPrice * state.app.tazorTotalSupply || 0;
  });

  return (
    <DashBoardMetric
      label={`TAZOR Market Cap`}
      metric={formatCurrency(marketCap, 0)}
      isLoading={marketCap ? false : true}
      {...sharedProps}
    />
  );
};

export const OHMPrice = () => {
  const marketPrice = useSelector(state => state.app.marketPrice);
  return (
    <DashBoardMetric
      label={t`TAZOR Price`}
      metric={marketPrice && formatCurrency(marketPrice, 2)}
      isLoading={marketPrice ? false : true}
      {...sharedProps}
    />
  );
};

export const TAZPrice = () => {
  const tazMarketPrice = useSelector(state => state.app.tazMarketPrice);
  return (
    <DashBoardMetric
      label={t`TAZ Price`}
      metric={tazMarketPrice && formatCurrency(tazMarketPrice, 2)}
      isLoading={tazMarketPrice ? false : true}
      {...sharedProps}
    />
  );
};

export const CircSupply = () => {
  const circSupply = useSelector(state => state.app.circSupply);
  const totalSupply = useSelector(state => state.app.totalSupply);
  const isDataLoaded = circSupply && totalSupply;
  return (
    <Metric
      label={t`Circulating Supply (total)`}
      metric={isDataLoaded && parseInt(circSupply) + " / " + parseInt(totalSupply)}
      isLoading={isDataLoaded ? false : true}
      {...sharedProps}
    />
  );
};

export const BackingPerOHM = () => {
  const backingPerOhm = useSelector(state => state.app.treasuryMarketValue / state.app.circSupply);
  return (
    <Metric
      label={t`Backing per TAZOR`}
      metric={!isNaN(backingPerOhm) && formatCurrency(backingPerOhm, 2)}
      isLoading={backingPerOhm ? false : true}
      {...sharedProps}
    />
  );
};

export const CurrentIndex = () => {
  const currentIndex = useSelector(state => state.app.currentIndex);
  return (
    <Metric
      label={t`Current Index`}
      metric={currentIndex && trim(currentIndex, 2) + " sOHM"}
      isLoading={currentIndex ? false : true}
      {...sharedProps}
      tooltip="The current index tracks the amount of sOHM accumulated since the beginning of staking. Basically, how much sOHM one would have if they staked and held a single OHM from day 1."
    />
  );
};

export const GOHMPrice = () => {
  const gOhmPrice = useSelector(state => state.app.marketPrice * state.app.currentIndex);
  return (
    <Metric
      className="metric wsoprice"
      label={t`gOHM Price`}
      metric={gOhmPrice && formatCurrency(gOhmPrice, 2)}
      isLoading={gOhmPrice ? false : true}
      {...sharedProps}
      tooltip={`gOHM = sOHM * index\n\nThe price of gOHM is equal to the price of OHM multiplied by the current index`}
    />
  );
};
