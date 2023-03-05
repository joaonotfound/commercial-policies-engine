<script lang="ts" setup>
import {
  faBookmark,
  faBox,
  faHome,
  faUser,
  faShoppingCart,
  faGears
} from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'nuxt/app'
import SidebarHeader from './sidebar/SidebarHeader.vue'
import SidebarMenu from './sidebar/SidebarMenu.vue'
import SidebarDivier from './sidebar/SidebarDivider.vue'
import LogoutButton from './sidebar/SidebarLogoutButton.vue'
// const favorites = ['home', 'bookmark']
const favorites = [
  {
    label: 'home',
    icon: faHome,
    route: '/home'
  },
  {
    label: 'bookmark',
    icon: faBookmark,
    route: '/bookmarks'
  }
]
const router = useRouter()
const redirect = (path: string) => {
  router.replace(path)
}
const clients = {
  label: 'Customers',
  icon: faUser,
  route: '/customers',
  opened: false
  // opened: true,
  // items: ['Social', 'Personal', 'Friends']
}
const orders = {
  label: 'Orders',
  icon: faShoppingCart,
  route: '/orders',
  opened: false
  // opened: true,
  // items: ['Social', 'Personal', 'Friends']
}
const products = {
  label: 'Products',
  icon: faBox,
  route: '/products',
  opened: false
  // opened: true,
  // items: ['Social', 'Personal', 'Friends']
}
const rules = {
  label: 'Rules',
  icon: faGears,
  route: '/rules',
  opened: false
  // opened: true,
  // items: ['Social', 'Personal', 'Friends']
}
const menus = [clients, orders, products, rules]

// const extended = ref<boolen>(true)
</script>

<template>
  <aside
    class="absolute top-0 left-0 flex flex-col p-3 h-[100%] overflow-y-auto text-center bg-primary-d5 text-light shadow-lg">
    <SidebarHeader />
    <div
      v-for="favorite of favorites"
      :key="favorite.label"
      class="p-4 hover:pl-5 mt-3 flex items-center rounded-md transition ease-in-out duration-100 cursor-pointer hover:bg-primary-d3"
      @click="redirect(favorite.route)">
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
