import React from "react";

// components

import CardTableListFormateurs from "components/Cards/CardTableListFormateurs.js";
import CardTableListUsers from "components/Cards/CardTableListUsers.js";


export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
        <CardTableListFormateurs />
          </div>
        <div className="w-full mb-12 px-4">
          <CardTableListUsers color="dark" />
        </div>
      </div>
    </>
  );
}
