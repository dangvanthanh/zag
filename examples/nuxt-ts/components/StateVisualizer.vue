<script setup lang="ts">
import { highlightState } from "@zag-js/stringify-state"
import { isRef } from "vue"

const props = defineProps<{
  state: any
  label?: string
  omit?: string[]
}>()

const state = isRef(props.state) ? props.state.value : props.state
</script>

<template>
  <div class="viz">
    <pre>
        <details open>
          <summary> {{props.label || "Visualizer"}} </summary>
          <div v-html="highlightState(state, props.omit)"></div>
        </details>
      </pre>
  </div>
</template>
