import * as avatar from "@zag-js/avatar"
import { normalizeProps } from "./normalize-props"
import { spreadProps } from "./spread-props"
import { Component } from "./component"
import { VanillaMachine } from "./lib/machine"

export class Avatar extends Component<avatar.Props, avatar.Api> {
  initMachine(props: avatar.Props) {
    return new VanillaMachine(avatar.machine, props)
  }

  initApi() {
    return avatar.connect(this.machine.service, normalizeProps)
  }

  render = () => {
    const rootEl = this.rootEl
    spreadProps(this.rootEl, this.api.getRootProps())
    const imageEl = rootEl.querySelector<HTMLElement>(".avatar-image")
    if (imageEl) spreadProps(imageEl, this.api.getImageProps())
    const fallbackEl = rootEl.querySelector<HTMLElement>(".avatar-fallback")
    if (fallbackEl) spreadProps(fallbackEl, this.api.getFallbackProps())
  }
}
