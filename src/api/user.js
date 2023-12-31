const usersURL = `${process.env.REACT_APP_SERVER_URL}/users`;

export async function signup({ email, password, first_name, last_name }) {
  try {
    const response = await fetch(`${usersURL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        first_name,
        last_name,
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const errorMessage = errorResponse.error || "Signup failed";
      throw new Error(errorMessage);
    }
  } catch (e) {
    console.error("Error: ", e.message);
    throw new Error(e.message);
  }
}

export async function login({ email, password }) {
  try {
    const response = await fetch(`${usersURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Login failed");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Error: ", e.message);
    throw e;
  }
}

export async function logout() {
  try {
    const response = await fetch(`${usersURL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Logout failed");
    }
  } catch (e) {
    console.error("Error: ", e.message);
    throw e;
  }
}
