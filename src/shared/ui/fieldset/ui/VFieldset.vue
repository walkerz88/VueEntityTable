<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <fieldset class="VFieldset">
    <legend class="VFieldset__legend">
      {{ label }}
    </legend>
    <slot />
  </fieldset>
</template>

<style scoped>
.VFieldset {
  padding: 0.25rem 1rem;
  border: 1px solid var(--bluegray-100);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.VFieldset__legend {
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
</style>
