import { ChangeEventHandler } from "react";
import { FormValues } from "./types";

interface SelectProps {
  options: Array<{ value: string | number, label: string | number, disabled?: boolean, selected?: boolean }>,
  value: string | number,
  name: keyof FormValues,
  onChange: ChangeEventHandler<HTMLSelectElement>,
  testId?: string,
}
export default function Select(props: SelectProps) {
  return (
    <select data-test_id={props.testId}
      className="flex-grow p-2 text-sm appearance-none bg-no-repeat bg-right border border-[#ccd0d5] rounded-md w-full focus:outline-none"
      style={{ backgroundImage: "url('/arrow-down.png')" }}
      name={props.name}
      value={props.value}
      onChange={props.onChange}>
      {props.options.map(item => <option key={item.value} selected={item.selected} value={item.value} disabled={item.disabled}>{item.label}</option>)}
    </select>
  )
}