<template>
  <Button
    @click="toggleTheme"
    aria-label="Toggle theme"
    variant="ghost"
    size="icon"
    class="-ml-3 cursor-pointer bg-transparent hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 dark:hover:bg-transparent"
  >
    <Moon class="hidden size-5 text-neutral-300 dark:inline" />
    <Sun class="size-5 text-neutral-500 dark:hidden" />
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@components/ui/button';
import { Sun, Moon } from 'lucide-vue-next';
import { onMounted } from 'vue';

const toggleTheme = () => {
  if (localStorage.theme === 'dark') {
    localStorage.theme = 'light';
    document.documentElement.classList.remove('dark');
  } else {
    localStorage.theme = 'dark';
    document.documentElement.classList.add('dark');
  }
};

onMounted(() => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
</script>

<style scoped></style>
