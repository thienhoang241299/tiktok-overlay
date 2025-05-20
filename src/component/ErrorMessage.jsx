import React from "react";

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <p style={{ color: "red" }}>{message}</p>;
}
