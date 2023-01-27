import React from "react";

export const UnderMaintenance = () => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h1 className="text-lg font-bold">
          <span>📡</span>
          <span className="ml-5">Satellite is under maintenance</span>
        </h1>
        <p className="py-4">
          We apologise for any inconvenience but Satellite is currently
          undergoing maintenance
        </p>
        <p>We will be back as soon as possible!</p>
      </div>
    </div>
  );
};
