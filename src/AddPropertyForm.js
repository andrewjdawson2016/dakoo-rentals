import React, { useState } from "react";

const AddPropertyForm = () => {
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/properties`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address }),
        }
      );
      if (response.ok) {
        alert("Property added successfully!");
        setAddress("");
      } else {
        alert("Failed to add property. Please try again.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddPropertyForm;
