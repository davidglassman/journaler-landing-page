<script setup lang="ts">
import type { WithClassAsProps } from './useCarousel';
import { useCarousel } from './useCarousel';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const props = defineProps<WithClassAsProps>();

const { canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    :disabled="!canScrollNext"
    :class="cn('size-8 touch-manipulation rounded-full p-0', props.class)"
    variant="outline"
    @click="scrollNext"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
    <span class="sr-only">Next slide</span>
  </Button>
</template>
