const unitsURL = `${process.env.REACT_APP_SERVER_URL}/units`;

export async function createUnit({ building_id, unit_type, unit_number }) {
  try {
    const response = await fetch(unitsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ building_id, unit_type, unit_number }),
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

export async function deleteUnit(id) {
  try {
    const response = await fetch(`${unitsURL}/${id}`, {
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
