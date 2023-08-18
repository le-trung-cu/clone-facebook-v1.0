'use client'

import React, { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FloatingArrow, arrow, Placement, useFloating, autoUpdate, useInteractions, offset,  useDismiss, shift, flip, size, useFocus } from '@floating-ui/react'

import clsx from 'clsx'
import { FormValues } from './types'

interface InputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>,
  onBlur?: FocusEventHandler<HTMLInputElement>,
  value?: string | number | readonly string[],
  type: HTMLInputTypeAttribute,
  name: keyof FormValues,
  className?: string,
  placeholder?: string,
  testId?: string,
  error?: string,
  placement?: Placement,
}

export default function Input(props: InputProps) {
  const [isOpen, setIsOpen] = useState(true)
  const arrowRef = useRef(null);
  const { refs, floatingStyles, context } = useFloating({
    placement: props.placement || 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({ mainAxis: 10, crossAxis: 10 }),
      flip(),
      shift(),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
      }),
      arrow({
        element: arrowRef,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const focus = useFocus(context)
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    dismiss
  ])
  return (
    <div className={twMerge("p-1.5 flex-grow", props.className)}>
      <input ref={refs.setReference}
        className={twMerge(clsx("peer p-2 text-sm border border-[#ccd0d5] rounded-md w-full focus:border-[#ccd0d5] focus:outline-none", { "border-red-500": props.error }))}
        type="email"
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        placeholder={props.placeholder}
        data-test_id={props.testId}
        {...getReferenceProps()}
      />
      {props.error && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="invisible peer-focus:visible bg-red-700 rounded-sm shadow p-4 text-white text-sm font-light"
        >
          <FloatingArrow className="fill-red-700" ref={arrowRef} context={context} />
          {props.error}
        </div>
      )}
    </div>
  )
}