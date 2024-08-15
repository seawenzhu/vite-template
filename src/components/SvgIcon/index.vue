<script setup>
import { computed } from "vue"

const props = defineProps(
    {
      name: {
        type: String,
        required: true
      },
      prefix: {
        type: String,
        default: "icon"
      }
    }
)

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
