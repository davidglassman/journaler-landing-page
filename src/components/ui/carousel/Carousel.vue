<script setup lang="ts">
import type { CarouselEmits, CarouselProps, WithClassAsProps } from './useCarousel';
import { useProvideCarousel } from './useCarousel';
import { cn } from '@/lib/utils';

const props = withDefaults(defineProps<CarouselProps & WithClassAsProps>(), {
  orientation: 'horizontal'
});

const emits = defineEmits<CarouselEmits>();

const { carouselRef, carouselApi } = useProvideCarousel(props, emits);

defineExpose({
  carouselRef,
  carouselApi
});
</script>

<template>
  <div
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
  >
    <slot
      :carousel-api="carouselApi"
      :can-scroll-prev="true"
      :can-scroll-next="true"
    />
  </div>
</template>
