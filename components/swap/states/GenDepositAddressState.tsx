import React from "react";
import { SpinnerCircular } from "spinners-react";
import { InputWrapper } from "../../common";
import { InitialStats } from "../parts";
import { ProgressBar } from "./parts";

export const GenDepositAddressState = () => {
  return (
    <>
      <InitialStats />
      <InputWrapper className="h-40">
        <div className="h-full space-x-2">
          <div className="flex flex-col w-full h-full">
            <div className="h-full">
              <ProgressBar level={1} />

              <div className="flex items-center justify-center mt-6 text-sm gap-x-2">
                <SpinnerCircular
                  size={20}
                  thickness={147}
                  color={"#00a5ff"}
                  secondaryColor={"#375f73"}
                />
                <span className="font-semibold">
                  Generating deposit address...
                </span>
              </div>
            </div>
            <div className="w-full mt-auto">
              <div className="my-0 divider" />
              <div className="w-full text-sm font-medium text-center text-gray-500">
                Generating deposit address
              </div>
            </div>
          </div>
        </div>
      </InputWrapper>
    </>
  );
};
