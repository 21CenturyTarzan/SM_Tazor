import {
  Typography,
  Box,
  Modal,
  Paper,
  SvgIcon,
  IconButton,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Button,
  Link,
} from "@material-ui/core";
import { ReactComponent as XIcon } from "../../assets/icons/x.svg";
import { t, Trans } from "@lingui/macro";
import "./Calculator.scss";

function CalculatorDialog({
  open,
  apr,
  handleClose,
  onAPRChange,
  tazTotalAmount,
  tazNeedAmount,
  totalUnstakedTazAmount,
  onSetMax,
  onTAZChange,
}) {
  return (
    <Modal id="calculator-dialog" open={open} onClose={handleClose} hideBackdrop>
      <Paper className="ohm-card ohm-popover">
        <Box display="flex">
          <IconButton onClick={handleClose}>
            <SvgIcon color="primary" component={XIcon} />
          </IconButton>
          <Typography variant="h3">Calculator</Typography>
        </Box>

        <Box className="card-content">
          <InputLabel htmlFor="slippage">
            <Trans>APR</Trans>
          </InputLabel>
          <FormControl variant="outlined" color="primary" fullWidth>
            <OutlinedInput
              id="staking-apr"
              value={apr}
              placeholder="0"
              onChange={onAPRChange}
              min="10"
              type="number"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
            />
            <div className="help-text">
              <Typography variant="body2" color="textSecondary">
                <Trans>User can set APR value they want.</Trans>
              </Typography>
            </div>
          </FormControl>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <InputLabel htmlFor="recipient">
              <Trans>Total TAZ needed</Trans>
            </InputLabel>
            <InputLabel className="max-select" onClick={onSetMax}>
              {`${totalUnstakedTazAmount} TAZ`}
            </InputLabel>
          </div>
          <FormControl variant="outlined" color="primary" fullWidth>
            <OutlinedInput value={tazTotalAmount} placeholder="0" type="number" onChange={onTAZChange} />
          </FormControl>

          <InputLabel htmlFor="recipient">
            <Trans>TAZ needed minus your current staked TAZ</Trans>
          </InputLabel>
          <FormControl variant="outlined" color="primary" fullWidth>
            <OutlinedInput
              id="recipient"
              value={tazNeedAmount}
              placeholder="0"
              type="number"
              // endAdornment={
              //   <Button
              //     variant="outlined"
              //     style={{ lineHeight: "20px", fontSize: "px" }}
              //     onClick={handleClose}
              //     position="end"
              //   >
              //     MAX
              //   </Button>
              // }
            />
          </FormControl>
        </Box>
      </Paper>
    </Modal>
  );
}

export default CalculatorDialog;
