<script setup>
import { computed, watchEffect } from "vue"
import Sidebar from "@/layouts/components/Sidebar/index.vue";
import {useAppStore} from "@/store/modules/app"
import Header from "@/layouts/components/Header/index.vue";

const appStore = useAppStore()
const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
  }
})
</script>

<template>
  <div :class="layoutClasses" class="layout-container clearfix">
    <Sidebar class="layout-sidebar"/>
    <div class="layout-main">
      <!-- 头部导航栏和标签栏 -->
      <div class="layout-main-header">
        <Header />
<!--        <TagsView v-show="showTagsView" />-->
      </div>
      <!-- 页面主体内容 -->
      <div class="layout-main-content scrollbar">
        <router-view v-slot="{ Component, route }">
          <transition name="el-fade-in" mode="out-in">
<!--            <keep-alive :include="tagsViewStore.cachedViews">-->
              <component :is="Component" :key="route.path" class="content-grow" />
<!--            </keep-alive>-->
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>

.layout-container {
  position: relative;
  width: 100%;
}


.layout-sidebar {
  background-color: var(--sidebar-menu-bg-color);
  transition: width 0.35s;
  width: var(--sidebar-width) !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: var(--sidebar-border-right);
}

.layout-main {
  min-height: 100%;
  transition: margin-left 0.35s;
  margin-left: var(--sidebar-width);
  position: relative;
}

.layout-main-header {
  position: fixed !important;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--sidebar-width));
  transition: width 0.35s;
  background-color: var(--header-bg-color);
  box-shadow: var(--header-box-shadow);
  border-bottom: var(--header-border-bottom);
}

.layout-main-content {
  padding-top: var(--navigationbar-height);
  min-height: calc(100vh - var(--navigationbar-height));
  position: relative;
  height: 100vh;
  overflow: auto;
}


.hideSidebar {
  .layout-sidebar {
    width: var(--sidebar-hide-width) !important;
  }
  .layout-main {
    margin-left: var(--sidebar-hide-width);
  }
  .layout-main-header {
    width: calc(100% - var(--sidebar-hide-width));
  }
}


.withoutAnimation {
  .sidebar-container,
  .main-container {
    transition: none;
  }
}


.layout-main-content {
  width: 100%;
  display: flex;
  flex-grow: 1;
  overflow: auto;
  flex-direction: column;
  .content-grow {
    flex-grow: 1;
  }
}

</style>
