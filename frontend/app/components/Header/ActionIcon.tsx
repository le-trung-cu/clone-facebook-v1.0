import { autoUpdate, flip, offset, shift, size, useClick, useDismiss, useFloating, useInteractions, useMergeRefs } from "@floating-ui/react";
import clsx from "clsx";
import { ReactNode, useState } from "react";

export default function ActionIcon({ children, icon, crossAxis=0, height}: { children: ReactNode, icon: ReactNode, crossAxis?: number, height?: number}) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({ mainAxis: 4, crossAxis }),
      flip(),
      shift(),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight-15}px`,
            height: `${height ?? availableHeight-15}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss
  ]);

  return (
    <>
      <button className={clsx("rounded-full  w-10 h-10 flex items-center justify-center", 
       isOpen?  "bg-blue-100 text-blue-500" : "bg-[#f0f2f5]"
      )}
        ref={refs.setReference} {...getReferenceProps()}>
        {icon}
      </button>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {children}
        </div>
      )}
    </>
  )
}