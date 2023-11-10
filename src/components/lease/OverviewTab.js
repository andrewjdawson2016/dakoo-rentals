import React from "react";
import { Avatar, Box, Paper, Tooltip, Typography } from "@mui/material";
import {
  formatRent,
  formatDateRange,
  getInitials,
  determineLeaseStatus,
} from "../../util";
import { DateTime } from "luxon";

const LeaseOverviewTab = ({ lease }) => {
  const StatusBox = ({ statusValue }) => {
    let statusText;
    let color;
    let backgroundColor;

    if (statusValue < 0) {
      statusText = "Expired";
      color = "red";
      backgroundColor = "#ffebee";
    } else if (statusValue === 0) {
      statusText = "Current";
      color = "green";
      backgroundColor = "#e8f5e9";
    } else {
      statusText = "Future";
      color = "blue";
      backgroundColor = "#e3f2fd";
    }

    const boxStyles = {
      color: color,
      backgroundColor: backgroundColor,
      borderRadius: "4px",
      padding: "3px 8px",
      display: "inline-block",
      marginBottom: "20px",
    };

    return <Box style={boxStyles}>{statusText}</Box>;
  };

  return (
    <Paper variant="outlined" square>
      <Box sx={{ p: 3, border: 1, borderColor: "divider" }}>
        <StatusBox
          statusValue={determineLeaseStatus(
            lease.start_date,
            lease.end_date,
            DateTime.now().toISO()
          )}
        />
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
  );
};

export default LeaseOverviewTab;
