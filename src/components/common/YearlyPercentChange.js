import React, { useState } from "react";
import YearlyPercentChangeChart from "./YearlyPercentChangeChart";
import YearlyPercentChangeTable from "./YearlyPercentChangeTable";
import {
  Switch,
  FormGroup,
  FormControlLabel,
  Box,
  Checkbox,
  IconButton,
  Popover,
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import SettingsIcon from "@mui/icons-material/Settings";

function YearlyPercentChange({ buildings }) {
  const [showChart, setShowChart] = useState(true);
  const [showIncome, setShowIncome] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [showProfit, setShowProfit] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "settings-popover" : undefined;

  return (
    <>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <SettingsIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <FormGroup style={{ padding: "16px" }}>
          <FormControlLabel
            control={
              <Switch
                checked={showChart}
                onChange={() => setShowChart(!showChart)}
              />
            }
            label={showChart ? <BarChartIcon /> : <TableChartIcon />}
          />

          {showChart && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showIncome}
                    onChange={() => setShowIncome(!showIncome)}
                  />
                }
                label="Income"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showExpenses}
                    onChange={() => setShowExpenses(!showExpenses)}
                  />
                }
                label="Expenses"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showProfit}
                    onChange={() => setShowProfit(!showProfit)}
                  />
                }
                label="Profit"
              />
            </>
          )}
        </FormGroup>
      </Popover>

      <Box mb={4}>
        {showChart ? (
          <YearlyPercentChangeChart
            buildings={buildings}
            showIncome={showIncome}
            showExpenses={showExpenses}
            showProfit={showProfit}
          />
        ) : (
          <YearlyPercentChangeTable buildings={buildings} />
        )}
      </Box>
    </>
  );
}

export default YearlyPercentChange;
