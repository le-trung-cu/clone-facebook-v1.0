import { useEffect, useRef } from "react"
type Props = {
  enable: boolean
  callback: (val: boolean) => void
}
export default function useClickOutside({enable, callback}: Props) {
  const elemRef = useRef<HTMLElement & HTMLFormElement>(null)
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (!elemRef.current?.contains(e.target as Node)){
        callback(false)
      }
    }
    if(enable) {
      document.addEventListener("click", handle)

      return () => document.removeEventListener("click", handle)
    }
  }, [enable, callback])

  return {
    elemRef,
  }
}