import { ChangeEventHandler } from "react";

export default function Radio({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: ChangeEventHandler<HTMLInputElement> }) {
  return (
    <label className="border border-[#ccd0d5] rounded-md flex-grow flex justify-between p-2 text-sm">
      <span>{label}</span>
      <input type="radio" name={name} value={value} onChange={onChange} />
    </label>
  )
}