<script setup>
defineProps({
  overlay: {
    type: Boolean,
    default: false
  },
  inline: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div
    :class="[
      'VLoader',
      overlay === true && 'VLoader--overlay',
      inline === true && 'VLoader--inline'
    ]"
  />
</template>

<style scoped>
.VLoader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 500;
}

.VLoader:before {
  content: '';
  position: sticky;
  top: calc(50% - 20px);
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  border-radius: 50%;
  border: 5px solid var(--text-color);
  border-right-color: #f90;
  animation: VLoader 1s linear infinite;
}

.VLoader--overlay {
  background-color: #fff;
}

.VLoader--inline {
  position: relative;
  display: inline-flex;
  width: auto;
  height: auto;
  background-color: transparent;
}

@keyframes VLoader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
