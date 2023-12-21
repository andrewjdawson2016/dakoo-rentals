const buildingsURL = `${process.env.REACT_APP_SERVER_URL}/buildings`;

export async function createBuilding({
  address,
  nickname,
  building_type,
  first_rental_month,
  unit_numbers,
}) {
  try {
    const response = await fetch(buildingsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        nickname,
        building_type,
        first_rental_month,
        unit_numbers,
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

export async function deleteBuilding(id) {
  try {
    const response = await fetch(`${buildingsURL}/${id}`, {
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

export async function getBuilding(id) {
  try {
    const response = await fetch(`${buildingsURL}/${id}`, {
      method: "GET",
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

    const data = await response.json();
    return data.building;
  } catch (e) {
    console.error("Error:", e.message);
    throw e;
  }
}

export async function listBuildings() {
  try {
    const response = await fetch(buildingsURL, {
      method: "GET",
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

    const data = await response.json();
    return data.buildings;
  } catch (e) {
    console.error("Error:", e.message);
    throw e;
  }
}
