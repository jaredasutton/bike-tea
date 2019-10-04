import React, { useState, useEffect } from "react";

export default ({ submitAction }) => {
  return (
    <button onClick={submitAction} className="new-map-submit">
      Submit
    </button>
  );
};
