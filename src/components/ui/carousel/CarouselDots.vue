<script setup lang="ts">
import type { WithClassAsProps } from './useCarousel';
import { useCarousel } from './useCarousel';
import { cn } from '@/lib/utils';
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<WithClassAsProps>();

const { carouselApi } = useCarousel();

const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);

function onSelect() {
  if (!carouselApi.value) return;
  selectedIndex.value = carouselApi.value.selectedScrollSnap();
}

function onInit() {
  if (!carouselApi.value) return;
  scrollSnaps.value = carouselApi.value.scrollSnapList();
  selectedIndex.value = carouselApi.value.selectedScrollSnap();
}

function scrollTo(index: number) {
  carouselApi.value?.scrollTo(index);
}

onMounted(() => {
  if (!carouselApi.value) return;

  onInit();
  carouselApi.value.on('init', onInit);
  carouselApi.value.on('reInit', onInit);
  carouselApi.value.on('select', onSelect);
});

onUnmounted(() => {
  if (!carouselApi.value) return;
  carouselApi.value.off('init', onInit);
  carouselApi.value.off('reInit', onInit);
  carouselApi.value.off('select', onSelect);
});
</script>

<template>
  <div :class="cn('flex items-center justify-center gap-2', props.class)">
    <button
      v-for="(_, index) in scrollSnaps"
      :key="index"
      type="button"
      :aria-label="`Go to slide ${index + 1}`"
      :class="
        cn(
          'size-2.5 rounded-full transition-colors',
          selectedIndex === index
            ? 'bg-neutral-900 dark:bg-white'
            : 'bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500'
        )
      "
      @click="scrollTo(index)"
    />
  </div>
</template>
