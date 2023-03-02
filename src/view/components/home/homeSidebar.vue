<script lang="ts" setup>
import { faBookmark, faBox, faHome } from '@fortawesome/free-solid-svg-icons'
import SidebarHeader from './sidebar/SidebarHeader.vue'
import SidebarMenu from './sidebar/SidebarMenu.vue'
import SidebarDivier from './sidebar/SidebarDivider.vue'
import LogoutButton from './sidebar/SidebarLogoutButton.vue'
// const favorites = ['home', 'bookmark']
const favorites = [
  {
    label: 'home',
    icon: faHome
  },
  {
    label: 'bookmark',
    icon: faBookmark
  }
]
const chatbox = {
  label: 'Chatbox',
  icon: faBox,
  opened: true,
  items: ['Social', 'Personal', 'Friends']
}
const menus = [chatbox, chatbox, chatbox, chatbox, chatbox]

// const extended = ref<boolen>(true)
</script>

<template>
  <aside
    class="absolute top-0 left-0 flex flex-col p-3 h-[100%] overflow-y-auto text-center bg-primary-d5 text-light shadow-lg">
    <SidebarHeader />
    <div
      v-for="favorite of favorites"
      :key="favorite.label"
      class="p-3 mt-3 flex items-center rounded-md transition ease-in-out duration-100 cursor-pointer hover:bg-primary-d3">
      <font-awesome-icon :icon="favorite.icon" />
      <span class="text-[15px] ml-4 text-gray-200 font-bold">{{
        favorite.label
      }}</span>
    </div>
    <SidebarDivier />
    <div class="flex flex-col flex-1 overflow-y-scroll scrollbar-hide">
      <SidebarMenu v-for="menu of menus" :key="menu.label" :menu="menu" />
    </div>
    <SidebarDivier />
    <LogoutButton />
  </aside>
</template>
<style>
/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
