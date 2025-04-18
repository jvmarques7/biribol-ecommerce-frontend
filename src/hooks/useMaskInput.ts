import { useState } from "react";

type MaskFunction = (value: string) => string;

export function useMaskedInput(initialValue: string, maskFn: MaskFunction) {
  const [value, setValue] = useState(maskFn(initialValue));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const masked = maskFn(raw);
    setValue(masked);
  };

  return {
    value,
    onChange,
    setValueRaw: (raw: string) => setValue(maskFn(raw)), // caso precise atualizar manualmente
  };
}
