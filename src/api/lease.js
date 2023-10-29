const leasesURL = `${process.env.REACT_APP_SERVER_URL}/leases`;

export async function createLease({
  property_id,
  start_date,
  end_date,
  price_per_month,
  is_renewal,
  note,
  tenants,
}) {
  try {
    const response = await fetch(leasesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property_id,
        start_date,
        end_date,
        price_per_month,
        is_renewal,
        note,
        tenants,
      }),
    });

    if (!response.ok) {
      let errorMessage = "An unexpected error occurred";

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (jsonError) {}

      throw new Error(errorMessage);
    }
  } catch (e) {
    console.error("Error:", e.message);
    throw e;
  }
}

export async function deleteLease(id) {
  try {
    const response = await fetch(`${leasesURL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      let errorMessage = "An unexpected error occurred";

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (jsonError) {}

      throw new Error(errorMessage);
    }
  } catch (e) {
    console.error("Error:", e.message);
    throw e;
  }
}
