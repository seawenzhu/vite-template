<script setup>
// import { useLayoutMode } from "@/hooks/useLayoutMode"
import logo from "@/assets/logo.png?url"

const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  }
})

// const { isLeft, isTop } = useLayoutMode()
</script>

<template>
  <div class="layout-logo-container layout-mode-top flex items-center" :class="{ 'collapse-logo': props.collapse }">
    <transition name="layout-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img :src="logo" class="layout-logo"  alt="logo"/>
      </router-link>
      <router-link class="flex" v-else key="expand" to="/">
        <img :src="logo" class="layout-logo-text w-8 h-8 mx-1"  alt="logo"/>
        <span class="text-2xl text-white">Smart Admin</span>
      </router-link>
    </transition>
  </div>
</template>

<style scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--header-height);
  line-height: var(--header-height);
  text-align: center;
  overflow: hidden;
  .layout-logo {
    display: none;
  }
  .layout-logo-text {
    height: 100%;
    vertical-align: middle;
  }
}

.layout-mode-top {
  height: var(--navigationbar-height);
  line-height: var(--navigationbar-height);
}

.collapse-logo {
  justify-content: center;
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-text {
    display: none;
  }
}
</style>
