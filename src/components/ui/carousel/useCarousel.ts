import type {
  EmblaCarouselType as CarouselApi,
  EmblaOptionsType as CarouselOptions,
  EmblaPluginType as CarouselPlugin
} from 'embla-carousel';
import emblaCarouselVue from 'embla-carousel-vue';
import type { HTMLAttributes, Ref } from 'vue';
import { inject, onMounted, onUnmounted, provide, ref } from 'vue';

export type CarouselEmits = {
  (e: 'init-api', payload: CarouselApi): void;
};

export interface CarouselProps {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin[];
  orientation?: 'horizontal' | 'vertical';
}

export interface WithClassAsProps {
  class?: HTMLAttributes['class'];
}

export interface CarouselContext {
  carouselRef: Ref<HTMLElement | undefined>;
  carouselApi: Ref<CarouselApi | undefined>;
  canScrollPrev: Ref<boolean>;
  canScrollNext: Ref<boolean>;
  scrollPrev: () => void;
  scrollNext: () => void;
  orientation: 'horizontal' | 'vertical';
}

const CAROUSEL_INJECTION_KEY = Symbol('carousel');

function useProvideCarousel(props: CarouselProps, emits: CarouselEmits): CarouselContext {
  const [carouselRef, carouselApi] = emblaCarouselVue(
    {
      ...props.opts,
      axis: props.orientation === 'horizontal' ? 'x' : 'y'
    },
    props.plugins
  );

  const canScrollPrev = ref(false);
  const canScrollNext = ref(false);

  function onSelect(api: CarouselApi) {
    canScrollPrev.value = api.canScrollPrev();
    canScrollNext.value = api.canScrollNext();
  }

  function scrollPrev() {
    carouselApi.value?.scrollPrev();
  }

  function scrollNext() {
    carouselApi.value?.scrollNext();
  }

  onMounted(() => {
    if (!carouselApi.value) return;

    carouselApi.value.on('init', onSelect);
    carouselApi.value.on('reInit', onSelect);
    carouselApi.value.on('select', onSelect);

    emits('init-api', carouselApi.value);
  });

  onUnmounted(() => {
    if (!carouselApi.value) return;
    carouselApi.value.off('select', onSelect);
  });

  const context: CarouselContext = {
    carouselRef,
    carouselApi,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    orientation: props.orientation || 'horizontal'
  };

  provide(CAROUSEL_INJECTION_KEY, context);

  return context;
}

function useCarousel(): CarouselContext {
  const context = inject<CarouselContext>(CAROUSEL_INJECTION_KEY);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

export { useCarousel, useProvideCarousel };
