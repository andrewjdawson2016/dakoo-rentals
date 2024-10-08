import React, { useState } from "react";
import { Avatar, Box, Button, Paper, Tooltip, Typography } from "@mui/material";
import {
  formatMonthlyMoneyValue,
  formatDateRange,
  getInitials,
  determineLeaseStatus,
} from "../../../../util";
import { DateTime } from "luxon";
import { deleteLease } from "../../../../api"; // Assuming deleteLease is imported correctly

const OverviewTab = ({ lease, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteLease(lease.id);
      console.log("Lease deleted successfully");
      onDeleteSuccess();
    } catch (e) {
      console.error("Error deleting lease:", e);
      setIsDeleting(false);
    }
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
          {formatMonthlyMoneyValue(lease.price_per_month)}
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

        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={isDeleting}
          sx={{ mt: 2 }}
        >
          {isDeleting ? "Deleting..." : "Delete Lease"}
        </Button>
      </Box>
    </Paper>
  );
};

export default OverviewTab;
