import React from "react";
import {
  Avatar,
  Box,
  Paper,
  Tooltip,
  Typography,
  Container,
  Tabs,
  Tab,
} from "@mui/material";
import { formatRent, formatDateRange, getInitials } from "../util";

function LeaseDisplay({ lease }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Overview" />
          <Tab label="Events" />
          <Tab label="Notes" />
          <Tab label="Documents" />
        </Tabs>
      </Box>
      {value === 0 && (
        <Paper variant="outlined" square>
          <Box sx={{ p: 3, border: 1, borderColor: "divider" }}>
            <Typography variant="body1">
              {formatDateRange(lease.start_date, lease.end_date)}
            </Typography>
            <Typography variant="body1">
              {formatRent(lease.price_per_month)}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
              {lease.tenants.map((tenant, index) => (
                <Tooltip
                  key={index}
                  title={
                    <React.Fragment>
                      <Typography color="inherit" variant="subtitle2">
                        <strong>{tenant.name}</strong>
                      </Typography>
                      <Typography variant="body2">{tenant.email}</Typography>
                    </React.Fragment>
                  }
                  arrow
                  placement="top"
                >
                  <Avatar>{getInitials(tenant.name)}</Avatar>
                </Tooltip>
              ))}
            </Box>
          </Box>
        </Paper>
      )}
      {value === 1 && (
        <Paper variant="outlined" square>
          <Typography component="div" role="tabpanel">
            <Box sx={{ p: 3, border: 1, borderColor: "divider" }}>
              Events Content
            </Box>
          </Typography>
        </Paper>
      )}
      {value === 2 && (
        <Paper variant="outlined" square>
          <Typography component="div" role="tabpanel">
            <Box sx={{ p: 3, border: 1, borderColor: "divider" }}>
              Notes Content
            </Box>
          </Typography>
        </Paper>
      )}
      {value === 3 && (
        <Paper variant="outlined" square>
          <Typography component="div" role="tabpanel">
            <Box sx={{ p: 3, border: 1, borderColor: "divider" }}>
              Documents Content
            </Box>
          </Typography>
        </Paper>
      )}
    </Container>
  );
}

export default LeaseDisplay;
