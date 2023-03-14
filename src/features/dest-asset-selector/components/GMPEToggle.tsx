import { useSquidStateStore } from "~/store";

export const GMPEToggle = () => {
  const { isSquidTrade, setEnableGMPExpress, enableGMPExpress } =
    useSquidStateStore();

  if (!isSquidTrade) {
    return null;
  }
  return (
    <label className="flex items-center justify-between text-left gap-x-2 btn btn-info btn-xs">
      <span className="text-xs text-accent">GMP Express</span>
      <input
        type="checkbox"
        checked={enableGMPExpress}
        className="checkbox checkbox-xs"
        onChange={setEnableGMPExpress.bind(null, !enableGMPExpress)}
      />
    </label>
  );
};
