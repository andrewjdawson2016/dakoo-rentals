const leaseEventsURL = `${process.env.REACT_APP_SERVER_URL}/lease_events`;

export async function updateLeaseEventExecutionDate({ id, execution_date }) {
  try {
    const response = await fetch(leaseEventsURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, execution_date }),
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
