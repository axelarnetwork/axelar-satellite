import { useSquidStateStore } from "~/store";

export const GMPEToggle = () => {
  const { isSquidTrade, setEnableGMPExpress, enableGMPExpress } =
    useSquidStateStore();

  if (!isSquidTrade) return null;
  return (
    <div
      onClick={() => setEnableGMPExpress(!enableGMPExpress)}
      className="flex items-center justify-between text-left gap-x-2 btn btn-info btn-xs"
    >
      <p className="text-xs text-accent">GMP Express</p>
      <input
        type="checkbox"
        checked={enableGMPExpress}
        className="checkbox checkbox-xs"
      />
    </div>
  );
};
