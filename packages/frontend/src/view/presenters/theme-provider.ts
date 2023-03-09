import { Ref } from 'vue'

export interface ThemeProvider {
  isDark: Ref<boolean>
  toggleDarkmode(): void
}
