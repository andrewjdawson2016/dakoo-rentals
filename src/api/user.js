const usersURL = `${process.env.REACT_APP_SERVER_URL}/users`;

export async function signup({ email, password, first_name, last_name }) {
  try {
    await fetch(`${usersURL}/signup`, {
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
  } catch (e) {
    console.error("Error: ", e.message);
    throw e;
  }
}

export async function login({ email, password }) {
  try {
    await fetch(`${usersURL}/login`, {
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
  } catch (e) {
    console.error("Error: ", e.message);
    throw e;
  }
}

export async function logout() {
  try {
    await fetch(`${usersURL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  } catch (e) {
    console.error("Error: ", e.message);
    throw e;
  }
}
