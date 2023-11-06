import React, { useEffect, useState } from "react";
import { listProperties } from "../api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Container,
  Box,
} from "@mui/material";
import { findLeaseOnDate, formatRent } from "../util";
import { DateTime } from "luxon";

function PropertyTable() {
  const [propertyLeasesMap, setPropertyLeasesMap] = useState(new Map());

  useEffect(() => {
    listProperties()
      .then((properties) => {
        const newMap = new Map();
        properties.forEach((property) => {
          const currentLease = findLeaseOnDate(property.leases, DateTime.now());
          newMap.set(property.address, currentLease || null);
        });
        setPropertyLeasesMap(newMap);
      })
      .catch((e) => {
        console.error("Error fetching properties:", e.message);
      });
  }, []);

  const StatusBox = ({ status }) => {
    const boxStyles = {
      color: status === "Occupied" ? "green" : "red",
      backgroundColor: status === "Occupied" ? "#e8f5e9" : "#ffebee",
      borderRadius: "4px",
      padding: "3px 8px",
      display: "inline-block",
    };
    return <Box style={boxStyles}>{status}</Box>;
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: "20px" }}>
      <TableContainer
        style={{
          boxShadow: "none",
          border: "1px solid rgba(224, 224, 224, 1)",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {Array.from(propertyLeasesMap.entries()).map(
              ([address, leaseDetails]) => (
                <TableRow key={address}>
                  <TableCell align="left">{address}</TableCell>
                  <TableCell align="left">
                    <StatusBox status={leaseDetails ? "Occupied" : "Vacant"} />
                  </TableCell>
                  {leaseDetails ? (
                    <>
                      <TableCell align="left">
                        {formatRent(leaseDetails.price_per_month)}
                      </TableCell>
                      <TableCell align="left">
                        {`${DateTime.fromISO(
                          leaseDetails.start_date
                        ).toLocaleString()} - ${DateTime.fromISO(
                          leaseDetails.end_date
                        ).toLocaleString()}`}
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell align="left">-</TableCell>
                      <TableCell align="left">-</TableCell>
                    </>
                  )}
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PropertyTable;
