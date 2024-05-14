import * as dialog from "@zag-js/dialog"
import { useMachine, normalizeProps, Portal } from "@zag-js/react"
import React, { useState } from "react"

export default function Dialog() {
  const [open, setOpen] = useState(false)

  const [state, send] = useMachine(
    dialog.machine({
      id: "1",
      open,
      onOpenChange(details) {
        setOpen(details.open)
      },
    }),
    {
      context: { open },
    },
  )
  const api = dialog.connect(state, send, normalizeProps)

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Open Dialog</button>
      <p>state - isOpen: {String(open)}</p>
      <p>machine - isOpen: {String(api.open)}</p>
      {api.open && (
        <Portal>
          <div {...api.backdropProps} />
          <div {...api.positionerProps}>
            <div {...api.contentProps}>
              <h2 {...api.titleProps}>Edit profile</h2>
              <p {...api.descriptionProps}>Make changes to your profile here. Click save when you are done.</p>
              <div>
                <input placeholder="Enter name..." />
                <button>Save</button>
              </div>
              <button {...api.closeTriggerProps}>Close</button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}
