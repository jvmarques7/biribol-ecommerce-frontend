import { useMemo } from "react";

type MaskFunction = (value: string) => string;

export function useMask(value: string, maskFn: MaskFunction) {
  const masked = useMemo(() => maskFn(value), [value, maskFn]);
  return { masked };
}
