import React from "react";
import { Toolbar, Typography } from "@mui/material";

function BuildingToolbar({ building }) {
  return (
    <Toolbar>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, color: "black" }}
      >
        {building.nickname}
      </Typography>
    </Toolbar>
  );
}

export default BuildingToolbar;
