import {
  Paper,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  Select,
} from "@material-ui/core";
import InfoTooltipMulti from "../../components/InfoTooltip/InfoTooltipMulti";
import CardHeader from "../../components/CardHeader/CardHeader";
import { useState, useEffect } from "react";
import { useAppSelector } from "src/hooks";

export function PresaleCard({
  title,
  address,
  tokenName,
  tazorPPrice,
  tazorPurchasedBalance,
  tazorPTotalSupply,
  tazorInCirculation,
  tazorBalance,
  tazorEthBalance,
  tazEthBalance,
  setTazorBalanceCallback,
  setTazBalanceCallback,
  setTazorETHBalanceCallback,
  setTazETHBalanceCallback,
  modalButton,
  currentETHBalance,
  tazPTotalSupply,
  tazInCirculation,
  tazBalance,
  tazPurchasedBalance,
  setNetSelCallback,
}) {
  // console.log(currentETHBalance);
  const [networkId, setNetworkId] = useState(80001);
  const curNetworkId = useAppSelector(state => state.network.networkId);
  useEffect(() => {
    setNetworkId(curNetworkId);
  }, [curNetworkId]);

  const changeNet = e => {
    setNetworkId(e.target.value);
    setNetSelCallback(e);
  };

  return (
    // <Paper className="ohm-card">
    <Box display="flex" flexDirection="column">
      <Grid container direction="row">
        <Grid item xs={12} sm={6} md={6} lg={6} style={{ borderRight: "solid 1px"}}>
          <Grid>
            <FormControl variant="outlined" color="primary" fullWidth>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <h1><span style={{color: "#7a66f8"}}>Tazor</span> price $10.00</h1>
                </div>
              </div>
            </FormControl>
          </Grid>
          <div style={{ padding: "10px", backgroundColor: "white", margin: "30px", color: "black", fontSize: "15px", fontWeight: "200", boxShadow: "4px 4px 20px" }}>
            <Grid alignItems="flex-end" >
              <div>
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div align="right">
                    <h3 style={{ margin: "10px", fontWeight: "500" }}>
                      Balance: {currentETHBalance} {tokenName}
                    </h3>
                  </div>
                </FormControl>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <FormControl variant="outlined" color="primary" fullWidth>
                    <div>
                      <h3 style={{ fontWeight: "500", margin: "10px" }}>
                        Spend Amount:
                      </h3>
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <FormControl variant="outlined" color="primary" fullWidth>
                    <OutlinedInput
                      type="number"
                      placeholder="0"
                      value={tazorEthBalance ? tazorEthBalance : ""}
                      style={{ color: "black" }}
                      onChange={e => setTazorETHBalanceCallback(e.target.value)}
                      labelWidth={0}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <FormControl className="ohm-input" variant="outlined">
                    <InputLabel id="demo-simple-select-label" style={{ color: "black" }}>Currency</InputLabel>
                    <Select
                      className="token-select"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={networkId}
                      label="NETWORK"
                      onChange={changeNet}
                    >
                      <MenuItem value={1} >ETH</MenuItem>
                      <MenuItem value={97}>BNB</MenuItem>
                      <MenuItem value={80001}>MATIC</MenuItem>
                      <MenuItem value={43114}>AVAX</MenuItem>
                      <MenuItem value={250}>FTM</MenuItem>
                      <MenuItem value={361}>TFUEL</MenuItem>
                      <MenuItem value={1666600000}>ONE</MenuItem>
                      <MenuItem value={40}>TLOS</MenuItem>
                      <MenuItem value={42220}>CELO</MenuItem>
                      <MenuItem value={19}>SGB</MenuItem>
                      <MenuItem value={1285}>MOVR</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </div>
            </Grid>
            <Grid container alignItems="flex-end" style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <Grid item xs={12} sm={6} md={6} lg={6} >
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div>
                    <h3 style={{ fontWeight: "500", margin: "10px" }}>Minimum Amount: </h3>
                  </div>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} >
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div>
                    <h3 style={{fontWeight: "500", margin: "10px" }}>1 Tazor</h3>
                  </div>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <Grid item xs={12} sm={6} md={6} lg={6} >
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div>
                    <h3 style={{ margin: "10px", fontWeight: "500" }}>You will receive: </h3>
                  </div>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} >
                <FormControl variant="outlined" color="primary" fullWidth>
                  <OutlinedInput
                    id=""
                    placeholder="0"
                    value={tazorBalance ? tazorBalance : ""}
                    style={{ color: "black" }}
                    onChange={e => setTazorBalanceCallback(e.target.value)}
                    labelWidth={0}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div>
                    <h3 style={{ margin: "10px", fontWeight: "500" }}>
                      Purchased amount:
                    </h3>
                  </div>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div>
                    <h3 style={{ margin: "10px", fontWeight: "500" }}>{tazorPurchasedBalance} Tazor</h3>
                  </div>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" style={{ marginTop: "30px" }}>
              <Grid item xs={12} sm={4} md={4} lg={4} />
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <FormControl variant="outlined" color="primary" style={{ display: "flex" }}>
                  {address ? modalButton[1] : modalButton[0]}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} />
            </Grid>
            <Grid container>
              <FormControl variant="outlined" color="primary" fullWidth>
                <div align="center">
                  <h2 style={{ margin: "10px", fontWeight: "500", marginTop: "20px" }}>Total Sold : ${(Number(tazorPTotalSupply - tazorInCirculation) * 10).toFixed(3)}</h2>
                </div>
              </FormControl>
            </Grid>
          </div>
        </Grid>
        {/* <Grid item xs={12} sm={1} md={1} lg={1}></Grid> */}
        {/* ===================   DIVIDER     ===============*/}
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Grid>
            <FormControl variant="outlined" color="primary" fullWidth>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <h1><span style={{color: "#edaa45"}}>Taz</span> price $1.00</h1>
                </div>
              </div>
            </FormControl>
          </Grid>
          <div style={{ padding: "10px", backgroundColor: "white", margin: "30px", color: "black", fontSize: "15px", fontWeight: "200", boxShadow: "4px 4px 20px" }}>
            <Grid alignItems="flex-end" >
              <div>
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div align="right">
                    <h3 style={{ margin: "10px", fontWeight: "500" }}>
                      Balance: {currentETHBalance} {tokenName}
                    </h3>
                  </div>
                </FormControl>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <FormControl variant="outlined" color="primary" fullWidth>
                    <div>
                      <h3 style={{ fontWeight: "500", margin: "10px" }}>
                        Spend Amount:
                      </h3>
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <FormControl variant="outlined" color="primary" fullWidth>
                    <OutlinedInput
                      type="number"
                      placeholder="0"
                      value={tazEthBalance ? tazEthBalance : ""}
                      style={{ color: "black" }}
                      onChange={e => setTazETHBalanceCallback(e.target.value)}
                      labelWidth={0}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                  <FormControl className="ohm-input" variant="outlined">
                    <InputLabel id="demo-simple-select-label" style={{ color: "black" }}>Currency</InputLabel>
                    <Select
                      className="token-select"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={networkId}
                      label="NETWORK"
                      onChange={changeNet}
                    >
                      <MenuItem value={1} >ETH</MenuItem>
                      <MenuItem value={97}>BNB</MenuItem>
                      <MenuItem value={80001}>MATIC</MenuItem>
                      <MenuItem value={43114}>AVAX</MenuItem>
                      <MenuItem value={250}>FTM</MenuItem>
                      <MenuItem value={361}>TFUEL</MenuItem>
                      <MenuItem value={1666600000}>ONE</MenuItem>
                      <MenuItem value={40}>TLOS</MenuItem>
                      <MenuItem value={42220}>CELO</MenuItem>
                      <MenuItem value={19}>SGB</MenuItem>
                      <MenuItem value={1285}>MOVR</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </div>
            </Grid>
            <Grid container alignItems="flex-end" style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <Grid item xs={12} sm={6} md={6} lg={6} >
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div>
                    <h3 style={{ fontWeight: "500", margin: "10px" }}>
                      Minimum Amount:
                    </h3>
                  </div>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} >
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div>
                    <h3 style={{fontWeight: "500", margin: "10px" }}>10 Taz</h3>
                  </div>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <Grid item xs={12} sm={6} md={6} lg={6} >
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div>
                    <h3 style={{ margin: "10px", fontWeight: "500" }}>
                      You will receive: 
                    </h3>
                  </div>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} >
                <FormControl variant="outlined" color="primary" fullWidth>
                  <OutlinedInput
                    id=""
                    placeholder="0"
                    value={tazBalance ? tazBalance : ""}
                    style={{ color: "black" }}
                    onChange={e => setTazBalanceCallback(e.target.value)}
                    labelWidth={0}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div>
                    <h3 style={{ margin: "10px", fontWeight: "500" }}>
                      Purchased amount:
                    </h3>
                  </div>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <FormControl variant="outlined" color="primary" fullWidth>
                  <div>
                    <h3 style={{ margin: "10px", fontWeight: "500" }}>{tazPurchasedBalance} Taz</h3>
                  </div>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container alignItems="flex-end" style={{ marginTop: "30px" }}>
              <Grid item xs={12} sm={4} md={4} lg={4} />
              <Grid item xs={12} sm={4} md={4} lg={4}>
                <FormControl variant="outlined" color="primary" style={{ display: "flex" }}>
                  {address ? modalButton[2] : modalButton[0]}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={4} />
            </Grid>
            <Grid container>
              <FormControl variant="outlined" color="primary" fullWidth>
                <div align="center">
                  <h2 style={{ margin: "10px", fontWeight: "500", marginTop: "20px" }}>Total Sold : ${(Number(tazPTotalSupply - tazInCirculation)).toFixed(3)}</h2>
                </div>
              </FormControl>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
