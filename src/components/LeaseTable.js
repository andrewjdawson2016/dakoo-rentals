import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listProperties } from "../api";
import {
  Container,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Table,
} from "@mui/material";
import { formatRent } from "../util";
import { DateTime } from "luxon";

function LeaseTable() {
  const [leases, setLeases] = useState([]);
  const { address } = useParams();

  useEffect(() => {
    listProperties()
      .then((properties) => {
        const property = properties.find((p) => p.address === address);
        if (property) {
          setLeases(property.leases);
        }
      })
      .catch((e) => {
        console.error("Error fetching properties: ", e.message);
      });
  }, [address]);

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
              <TableCell style={{ fontWeight: "bold" }}>Lease Dates</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Rent</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Tenants</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leases.map((lease, index) => (
              <TableRow key={index}>
                <TableCell align="left">
                  {`${DateTime.fromISO(
                    lease.start_date
                  ).toLocaleString()} - ${DateTime.fromISO(
                    lease.end_date
                  ).toLocaleString()}`}
                </TableCell>
                <TableCell align="left">
                  {formatRent(lease.price_per_month)}
                </TableCell>
                <TableCell align="left">
                  {lease.tenants.map((tenant, tenantIndex) => (
                    <React.Fragment key={tenantIndex}>
                      {tenant.name} ({tenant.email})
                      <br />
                    </React.Fragment>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default LeaseTable;
