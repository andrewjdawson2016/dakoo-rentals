import React from "react";
import { Box, Paper, Typography } from "@mui/material";
const LeaseDocumentsTab = ({ lease }) => {
  return (
    <Paper variant="outlined" square>
      <Typography component="div" role="tabpanel">
        <Box sx={{ p: 3, border: 1, borderColor: "divider" }}>
          Documents Content
        </Box>
      </Typography>
    </Paper>
  );
};

export default LeaseDocumentsTab;
