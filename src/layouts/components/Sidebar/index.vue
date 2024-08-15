<script setup>

import SidebarItem from "@/layouts/components/Sidebar/SidebarItem.vue";
import Logo from "@/layouts/components/Logo/index.vue";
import {computed, ref} from "vue"
import {storeToRefs} from "pinia"
import {useAppStore} from "@/store/modules/app"
import {getCssVariableValue} from "@/utils"
import {useRoute} from "vue-router";

const route = useRoute()
const appStore = useAppStore()

const sidebarMenuBgColor = getCssVariableValue("--sidebar-menu-bg-color")
const sidebarMenuTextColor = getCssVariableValue("--sidebar-menu-text-color")
const sidebarMenuActiveTextColor = getCssVariableValue("--sidebar-menu-active-text-color")

const activeMenu = computed(() => {
  const {
    meta: {activeMenu},
    path
  } = route
  return activeMenu ? activeMenu : path
})

const isCollapse = computed(() => !appStore.sidebar.opened)

const backgroundColor = computed(() => (sidebarMenuBgColor))
const textColor = computed(() => (sidebarMenuTextColor))
const activeTextColor = computed(() => (sidebarMenuActiveTextColor))
const sidebarMenuItemHeight = computed(() => {
  return "var(--sidebar-menu-item-height)" // "var(--navigationbar-height)"
})
const sidebarMenuHoverBgColor = computed(() => {
  return "var(--sidebar-menu-hover-bg-color)" // "transparent"
})
const tipLineWidth = computed(() => {
  return "2px" // "0px"
})
// 当为顶部模式时隐藏垂直滚动条
const hiddenScrollbarVerticalBar = computed(() => {
  return "block"
})

const menusRoutes = ref([])
menusRoutes.value.push({
  path: "/",
  name: "home",
  meta: {
    title: "首页",
    svgIcon: "dashboard", //elIcon
    affix: true
  }
})
</script>

<template>
  <div class="has-logo">
    <Logo :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu"
               :collapse="isCollapse"
               :background-color="backgroundColor"
               :text-color="textColor"
               :active-text-color="activeTextColor"
               :unique-opened="true"
               :collapse-transition="false"
               :mode="'vertical'"
      >
        <SidebarItem v-for="menu in menusRoutes" :key="menu.path" :item="menu" :base-path="menu.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped>

.has-logo {
  .el-scrollbar {
    height: calc(101% - var(--header-height));
  }
}

.el-scrollbar {
  height: 101%;

  :deep(.scrollbar-wrapper) {
    overflow-x: hidden !important;

    .el-scrollbar__view {
      height: 100%;
    }
  }

  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      display: none;
    }

    &.is-vertical {
      display: v-bind(hiddenScrollbarVerticalBar);
    }
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

.el-menu--horizontal {
  height: v-bind(sidebarMenuItemHeight);
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: v-bind(sidebarMenuItemHeight);
  line-height: v-bind(sidebarMenuItemHeight);

  &.is-active,
  &:hover {
    background-color: v-bind(sidebarMenuHoverBgColor);
  }
}

:deep(.el-sub-menu) {
  &.is-active {
    > .el-sub-menu__title {
      color: v-bind(activeTextColor) !important;
    }
  }
}

:deep(.el-menu-item.is-active) {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind(tipLineWidth);
    height: 100%;
    background-color: var(--sidebar-menu-tip-line-bg-color);
  }
}

.el-menu--collapse {
  :deep(.el-sub-menu.is-active) {
    .el-sub-menu__title {
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: v-bind(tipLineWidth);
        height: 100%;
        background-color: var(--sidebar-menu-tip-line-bg-color);
      }
    }
  }
}
</style>
