import { useSquidStateStore } from "~/store";

export const GMPEToggle = () => {
  const { isSquidTrade, setEnableGMPExpress, enableGMPExpress } =
    useSquidStateStore();

  if (!isSquidTrade) return null;
  return (
    <div className="flex items-center justify-between ml-2 text-left gap-x-2">
      <div>
        <p className="text-xs text-accent">GMP Express</p>
      </div>
      <input
        type="checkbox"
        checked={enableGMPExpress}
        onChange={() => setEnableGMPExpress(!enableGMPExpress)}
        className="h-6 checkbox"
      />
    </div>
  );
};
