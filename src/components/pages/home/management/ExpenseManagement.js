import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Snackbar,
  Box,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  getEventsInRange,
  formatDate,
  mapEventDescription,
} from "../../../../util";
import { updateLeaseEventExecutionDate } from "../../../../api";
import { DateTime, Interval } from "luxon";

function EventManager({ buildings, refreshBuildings }) {
  return <Typography variant="h6">No upcoming events.</Typography>;
}

export default EventManager;
