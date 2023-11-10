import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listProperties } from "../../api";
import { Container, Box } from "@mui/material";
import LeaseTabsBox from "../lease/TabsBox";

function PropertyDetails() {
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
      {leases.map((lease, index) => (
        <Box key={lease.id || index} mb={10}>
          <LeaseTabsBox lease={lease} />
        </Box>
      ))}
    </Container>
  );
}

export default PropertyDetails;
