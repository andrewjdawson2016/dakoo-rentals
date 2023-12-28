const expensesURL = `${process.env.REACT_APP_SERVER_URL}/expenses`;

export async function createExpense({ building_id, month_year, amount, note }) {
  try {
    const response = await fetch(expensesURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        building_id,
        month_year,
        amount,
        note,
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

export async function deleteExpense(id) {
  try {
    const response = await fetch(`${expensesURL}/${id}`, {
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
