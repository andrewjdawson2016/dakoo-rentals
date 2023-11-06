import React, { useEffect, useState } from "react";
import { listProperties } from "../api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function PropertyTable() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    listProperties()
      .then((properties) => {
        setProperties(properties);
      })
      .catch((e) => {
        console.error("Error fetching properties:", e.message);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Property ID</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Leases</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((property) => (
            <TableRow
              key={property.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {property.id}
              </TableCell>
              <TableCell align="right">{property.address}</TableCell>
              <TableCell align="right">{property.leases.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PropertyTable;
