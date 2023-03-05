import { Ref } from 'vue'

export interface SidebarProvider {
  opened: Ref<boolean>
  setOpened(value: boolean): void
}
