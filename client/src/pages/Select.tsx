import React, { useState } from "react";
type Option = {
  value: number | string;
  label: string;
};

type SelectProps = {
  options: Option[];
};

export function Select({ options }: SelectProps) {
  const [value, setValue] = useState(options[0]?.value);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
  }

  return (
    <select value={value} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
