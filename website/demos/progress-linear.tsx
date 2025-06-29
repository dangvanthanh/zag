import * as progress from "@zag-js/progress"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"

interface ProgressLinearProps extends Omit<progress.Props, "id"> {}

export function ProgressLinear(props: ProgressLinearProps) {
  const service = useMachine(progress.machine, {
    id: useId(),
    ...props,
  })

  const api = progress.connect(service, normalizeProps)

  return (
    <div>
      <div {...api.getRootProps()}>
        <div {...api.getLabelProps()}>Upload progress</div>
        <div {...api.getTrackProps()}>
          <div {...api.getRangeProps()} />
        </div>
        <div {...api.getValueTextProps()}>{api.valueAsString}</div>
      </div>

      <div>
        <button onClick={() => api.setValue((api.value ?? 0) - 20)}>
          Decrease
        </button>

        <button onClick={() => api.setValue((api.value ?? 0) + 20)}>
          Increase
        </button>

        <button onClick={() => api.setValue(null)}>Indeterminate</button>
      </div>
    </div>
  )
}
