import { RESERVED_ADDRESSES } from "~/config/constants";

import { showErrorMsgAndThrow } from "~/utils/error";

export function checkReservedAddresses(destAddress: string) {
  if (!destAddress) {
    showErrorMsgAndThrow("Destination address can't be empty");
  }
  if (RESERVED_ADDRESSES?.includes(destAddress.toLowerCase())) {
    showErrorMsgAndThrow(
      `The address ${destAddress} is blacklisted. Can't send to this address`
    );
  }
}
