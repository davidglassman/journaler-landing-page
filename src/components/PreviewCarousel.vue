<template>
  <Carousel
    class="mx-auto w-full max-w-full md:max-w-[52rem] lg:max-w-[66rem] xl:max-w-[80rem]"
    :plugins="[autoplayPlugin, Fade()]"
    :opts="{ loop: true }"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
      >
        <img
          :src="isDark ? darkImages[index] : lightImages[index]"
          :alt="`Preview screenshot ${index + 1}`"
          class="block h-auto max-h-[calc(100vh-4rem)] w-full object-contain md:max-h-[calc(100vh-5rem)]"
        />
      </CarouselItem>
    </CarouselContent>
    <CarouselDots class="mt-4" />
  </Carousel>
</template>

<script setup lang="ts">
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { onMounted, onUnmounted, ref } from 'vue';

interface Props {
  lightImages: string[];
  darkImages: string[];
}

const props = defineProps<Props>();

const isDark = ref(false);
let observer: MutationObserver | null = null;

const autoplayPlugin = Autoplay({
  delay: 4000,
  stopOnInteraction: false,
  stopOnMouseEnter: false
});

function updateTheme() {
  isDark.value = document.documentElement.classList.contains('dark');
}

onMounted(() => {
  updateTheme();

  observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        updateTheme();
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>
