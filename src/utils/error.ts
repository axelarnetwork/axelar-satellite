import toast from "react-hot-toast";

export function showErrorMsgAndThrow(msg: string) {
  toast.error(msg);
  throw new Error(msg);
}
