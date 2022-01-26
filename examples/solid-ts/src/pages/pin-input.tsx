import { injectGlobal } from "@emotion/css"
import * as PinInput from "@ui-machines/pin-input"
import { normalizeProps, SolidPropTypes, useMachine, useSetup } from "@ui-machines/solid"
import { createMemo, createUniqueId } from "solid-js"
import { StateVisualizer } from "../components/state-visualizer"
import { pinInputStyle } from "../../../../shared/style"
import { useControls } from "../hooks/use-controls"

injectGlobal(pinInputStyle)

export default function Page() {
  const controls = useControls({
    type: { type: "select", options: ["numeric", "alphanumeric", "alphabetic"] as const, defaultValue: "numeric" },
    mask: { type: "boolean", defaultValue: false },
    otp: { type: "boolean", defaultValue: false },
  })

  const [state, send] = useMachine(PinInput.machine, {
    context: controls.context,
  })

  const ref = useSetup<HTMLDivElement>({ send, id: createUniqueId() })

  const pin = createMemo(() => PinInput.connect<SolidPropTypes>(state, send, normalizeProps))

  return (
    <div>
      <controls.ui />

      <div className="pin-input" ref={ref} {...pin().containerProps}>
        <input data-testid="input-1" {...pin().getInputProps({ index: 0 })} />
        <input data-testid="input-2" {...pin().getInputProps({ index: 1 })} />
        <input data-testid="input-3" {...pin().getInputProps({ index: 2 })} />
      </div>

      <button data-testid="clear-button" onClick={pin().clearValue}>
        Clear
      </button>

      <StateVisualizer state={state} />
    </div>
  )
}
