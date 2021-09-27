import React from "react";

const ContainerError = ({ msg }) => (
  <div
    className="mt-1 alert alert-danger animate__animated animate__bounceIn"
    role="alert"
  >
    {msg}
  </div>
);

export default ContainerError;
