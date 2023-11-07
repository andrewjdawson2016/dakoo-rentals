import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listProperties, createProperty } from "../api";
import {
  Button,
  Input,
  TableHead,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Container,
  TableFooter,
  Box,
} from "@mui/material";
import { findLeaseOnDate, formatRent } from "../util";
import { DateTime } from "luxon";

function PropertyTable() {
  const [propertyLeasesMap, setPropertyLeasesMap] = useState(new Map());
  const [newAddress, setNewAddress] = useState("");
  const navigate = useNavigate();

  const goToLeaseDetails = (address) => {
    const encodedAddress = encodeURIComponent(address);
    navigate(`/${encodedAddress}`);
  };

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
  });

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

  const handleAddProperty = () => {
    if (newAddress) {
      createProperty({ address: newAddress })
        .then(() => {
          setPropertyLeasesMap(
            new Map(propertyLeasesMap).set(newAddress, null)
          );
          setNewAddress("");
        })
        .catch((error) => {
          console.error("Error adding property:", error.message);
        });
    }
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
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Address</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Rent</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Lease Dates</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Details</TableCell>
            </TableRow>
          </TableHead>
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
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: "grey",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "darkgrey",
                        },
                        textTransform: "none",
                      }}
                      onClick={() => goToLeaseDetails(address)}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
          <TableFooter
            style={{
              borderTop: "2px solid rgba(224, 224, 224, 1)",
              backgroundColor: "#fafafa",
            }}
          >
            <TableRow>
              <TableCell
                align="left"
                style={{ paddingTop: "20px", paddingBottom: "20px" }}
              >
                <Input
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Address"
                  fullWidth
                  style={{
                    fontSize: "0.875rem",
                  }}
                />
              </TableCell>
              <TableCell style={{ padding: 0, border: 0 }}></TableCell>
              <TableCell style={{ padding: 0, border: 0 }}></TableCell>
              <TableCell
                align="right"
                style={{ paddingTop: "20px", paddingBottom: "20px" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddProperty}
                  style={{
                    textTransform: "none",
                  }}
                >
                  Add Property
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PropertyTable;
