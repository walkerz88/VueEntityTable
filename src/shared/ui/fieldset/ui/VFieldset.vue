<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <fieldset class="vet-fieldset">
    <legend class="vet-fieldset__legend">
      {{ label }}
    </legend>
    <slot />
  </fieldset>
</template>

<style scoped>
.vet-fieldset {
  padding: 0.25rem 1rem;
  border: 1px solid var(--bluegray-100);
  border-radius: 6px;
  margin-bottom: 1rem;
}

.vet-fieldset__legend {
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}
</style>
