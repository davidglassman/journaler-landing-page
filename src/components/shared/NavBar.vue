<template>
  <ThemeSelector />
</template>

<script setup lang="ts">
import ThemeSelector from '@/components/shared/ThemeSelector.vue';

export interface Link {
  href: string;
  title: string;
}

const props = defineProps<{
  links: Link[];
}>();
</script>

<style scoped></style>
