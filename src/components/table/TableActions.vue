<script setup lang="ts">
const props = defineProps<{
  item: any;
  actions: {
    edit?: (code: string) => void;
    config?: (code: string) => void;
    delete?: (code: string) => void;
  };
}>();
</script>

<template>
  <div class="flex py-2.5 justify-end gap-1">
    <!-- ✏️ Editar -->
    <svg
      v-if="actions.edit"
      @click="() => actions.edit?.(item.code)"
      title="Editar"
      class="cursor-pointer text-gray-600 h-5 w-5"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 20h9M3 20h1.7c.5 0 .8 0 1.1-.1.2 0 .4-.1.6-.2.2-.1.4-.3.7-.6L20 6.5c.8-.8.8-2 0-2.8s-2-.8-2.8 0L4.3 16.6c-.3.3-.5.5-.6.7-.1.2-.2.4-.2.6C3 18.3 3 18.6 3 19v1z"/>
    </svg>

    <!-- ⚙️ Configurar -->
    <svg
      v-if="actions.config"
      @click="() => actions.config?.(item.code)"
      title="Configurar"
      class="cursor-pointer text-gray-600 h-5 w-5"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
      <path d="M19.8 13a7 7 0 0 0 0-2l2.1-1.6a.5.5 0 0 0 .1-.7l-2-3.5a.5.5 0 0 0-.6-.2l-2.5 1a7 7 0 0 0-1.7-1L15 2.2a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 0-.5.5L9.2 4a7 7 0 0 0-1.7 1l-2.5-1a.5.5 0 0 0-.6.2l-2 3.5a.5.5 0 0 0 .1.7L4.5 10.9a7 7 0 0 0 0 2L2.5 14.5a.5.5 0 0 0-.1.7l2 3.5a.5.5 0 0 0 .6.2l2.5-1a7 7 0 0 0 1.7 1L9 21.8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5l.8-2.2a7 7 0 0 0 1.7-1l2.5 1a.5.5 0 0 0 .6-.2l2-3.5a.5.5 0 0 0-.1-.7L19.8 13z"/>
    </svg>

    <!-- 🗑️ Eliminar -->
    <svg
      v-if="actions.delete"
      @click="() => actions.delete?.(item.code)"
      title="Eliminar"
      class="cursor-pointer text-gray-600 h-5 w-5"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <path d="M9 3h6M3 6h18M19 6l-.7 10.5c-.1 1.6-.2 2.4-.6 3-.3.5-.8.9-1.3 1.2-.6.3-1.4.3-3 .3h-3c-1.6 0-2.4 0-3-.3-.5-.3-1-.7-1.3-1.2-.4-.6-.5-1.4-.6-3L5 6m5 4.5v5M14 10.5v5"/>
    </svg>
  </div>
</template>
