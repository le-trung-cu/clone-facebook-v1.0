'use client'

import React, { useState } from 'react'
import {  useFloating, autoUpdate, useClick, useInteractions, offset, useDismiss, shift, flip, size } from '@floating-ui/react'

export default function TooltipInfo({ testId, text, children, }: { testId?: string, text: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({

    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'left',
    middleware: [
      offset(10),
      flip(),
      shift(),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
      })],
    whileElementsMounted: autoUpdate,
  });
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ])

  return (
    <>
      <div data-test_id={testId} className="flex items-center space-x-1 mt-3.5 mb-2">
        <span className="text-xs text-[#606770] ">{text}</span>
        <button type="button" ref={refs.setReference}
          className="w-3 h-3 bg-[#606770] rounded-full text-[8px] text-white"
          title="Nhấp chuột để biết thêm thông tin"
          {...getReferenceProps()}>?</button>
      </div>
      {isOpen && <div className="TooltipInfo_content">
        <div ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}>
          {children}
        </div>
      </div>}
    </>
  )
}