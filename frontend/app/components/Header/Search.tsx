import { useEffect, useRef, useState } from "react"
import BackIcon from '@/app/icons/Back'
import SearchIcon from '@/app/icons/Search'
import clsx from "clsx"
import useClickOutside from "@/app/hooks/useClickOutside"

export default function Search() {
  const [open, setOpen] = useState(false)

  const {elemRef} = useClickOutside({enable: open, callback: setOpen})

  return (
    <form ref={elemRef} autoComplete="off" className={clsx({"fixed top-0 left-0 h-[320px] bg-white shadow pr-4 py-2 pl-2 rounded-br-md": open, "ml-2": !open})}>
      <div className="flex items-center">
        {open && <button className="w-10 h-10 rounded-full hover:bg-[#f0f2f5] flex items-center justify-center mr-1" 
        type="button"
        onClick={() => setOpen(false)}><BackIcon /></button>}
        <label className="bg-[#f0f2f5] flex items-center rounded-full pr-4 pl-3 py-2">
          <SearchIcon />
          <input className="bg-[#f0f2f5] pl-1 text-base font-light min-w-[220px] focus:outline-none" placeholder="Tìm kiếm trên Facebook"
            onFocus={() => setOpen(true)} />
        </label>
      </div>
    </form>
  )
}