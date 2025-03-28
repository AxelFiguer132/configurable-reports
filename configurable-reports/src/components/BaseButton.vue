<script setup lang="ts">
const props = defineProps<{
  color?: "blue" | "gray" | "green";
  block?: boolean;
  customClass?: string;
}>();

const colorClasses = {
  blue: "bg-blue-600 text-white hover:bg-blue-700",
  gray: "bg-gray-500 text-white hover:bg-gray-600",
  green: "bg-green-600 text-white hover:bg-green-700",
};
</script>

<template>
    <button
      :class="[
        'rounded-md text-white',
        colorClasses[props.color] || colorClasses.blue,
        props.block ? 'w-full' : '',
        props.customClass
      ]"
      v-bind="$attrs"
    >
      <slot/>
    </button>
  </template>
