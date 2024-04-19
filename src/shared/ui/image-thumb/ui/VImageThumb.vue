<script setup>
import { ref } from 'vue'

import Image from 'primevue/image'

import { isEmptyValue } from '@/shared'

import imageIsBroken from '../assets/images/image-is-broken.png'
import imageIsEmpty from '../assets/images/image-is-empty.png'

const PREVIEW_STYLES = {
  maxWidth: '50vw',
  maxHeight: '50vh',
  transition: 'transform .2s ease'
}

defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  preview: {
    type: Boolean,
    default: false
  }
})

const isBroken = ref(false)

const onError = () => {
  isBroken.value = true
}
</script>

<template>
  <div
    :class="[
      'vet-image-thumb',
      (isEmptyValue(src) === true || isBroken === true) && 'vet-image-thumb--empty'
    ]"
  >
    <div class="vet-image-thumb__content">
      <template v-if="isEmptyValue(src) === false && isBroken === false">
        <img
          v-if="preview === false"
          loading="lazy"
          :title="title"
          :src="src"
          :alt="alt"
          @error="onError"
        />
        <Image v-else preview :src="src" :alt="alt">
          <template #indicatoricon>
            <i class="pi pi-search" />
          </template>
          <template #image>
            <img
              loading="lazy"
              :title="title"
              :src="src"
              :alt="alt"
              @error="onError"
            />
          </template>
          <template #preview="slotProps">
            <img
              :title="title"
              :src="src"
              :alt="alt"
              :style="{ ...slotProps.style, ...PREVIEW_STYLES }"
            />
          </template>
        </Image>
      </template>
      <img
        v-else-if="isBroken === true"
        :src="imageIsBroken"
        :title="title || 'Изображение не найдено'"
        :alt="alt || 'Изображение не найдено'"
        loading="lazy"
      />
      <img
        v-else
        :src="imageIsEmpty"
        :title="title || 'Изображение отсутствует'"
        :alt="alt || 'Изображение отсутствует'"
        loading="lazy"
      />
    </div>
  </div>
</template>

<style scoped>
.vet-image-thumb {
  width: 100%;
}

.vet-image-thumb__content {
  position: relative;
  padding-bottom: 100%;
}

.vet-image-thumb__content > img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vet-image-thumb__content > .p-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vet-image-thumb__content > .p-image > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vet-image-thumb--empty {
  opacity: 0.2;
}
</style>
