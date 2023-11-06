import React, { useEffect, useState } from "react";
import { listProperties } from "../api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
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
    <Container component="main" maxWidth="md" style={{ marginTop: "20px" }}>
      <TableContainer style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow
                key={property.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{property.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PropertyTable;
