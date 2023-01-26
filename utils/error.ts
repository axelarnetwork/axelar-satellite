import toast from "react-hot-toast";

export function showErrorMsgAndThrow(msg: string, throwMsg: boolean = false) {
  toast.error(msg);
  if (throwMsg) throw new Error(msg);
}
