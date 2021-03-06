import React from "react";

const Error = ({ data }) => {
  const showErrors = (message) => {
    return Object.entries(message).map(([key, value], i) => {
      return (
        <div key={i}>
          <p>
            The {key} {value[0]}
          </p>
        </div>
      );
    });
  };
  return (
    <div className="alert alert-danger text-center">
      {showErrors(data.error)}
    </div>
  );
};

export default Error;
