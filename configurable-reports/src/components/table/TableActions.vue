<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  item: any;
  actions: {
    edit?: boolean;
    config?: boolean;
    delete?: boolean;
  };
  routes: {
    edit?: string;
    config?: string;
    delete?: string;
  };
}>();

const router = useRouter();

const navigate = (type: "edit" | "config" | "delete") => {
  const path = props.routes[type];
  if (path) {
    router.push(path.replace(":code", props.item.code));
  }
};
</script>

<template>
  <td class="px-3 sticky right-0 bg-white">
    <div class="flex py-2.5 justify-end gap-1">
      <svg
        v-if="actions.edit"
        @click="() => navigate('edit')"
        title="Editar"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mx-2 cursor-pointer text-gray-600"
      >
        <path
          d="M12 20H21M3.00003 20H4.67457C5.16376 20 5.40835 20 5.63852 19.9447C5.84259 19.8957 6.03768 19.8149 6.21663 19.7053C6.41846 19.5816 6.59141 19.4086 6.93732 19.0627L19.5001 6.49998C20.3285 5.67156 20.3285 4.32841 19.5001 3.49998C18.6716 2.67156 17.3285 2.67156 16.5001 3.49998L3.93729 16.0627C3.59139 16.4086 3.41843 16.5816 3.29475 16.7834C3.18509 16.9624 3.10428 17.1574 3.05529 17.3615C3.00003 17.5917 3.00003 17.8363 3.00003 18.3255V20Z"
          stroke="currentColor"
          stroke-width="2"
        ></path>
      </svg>

      <svg
        v-if="actions.config"
        @click="() => navigate('config')"
        title="Configurar"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-6 w-6 mx-2 cursor-pointer text-gray-600"
      >
        <path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Z" />
        <path
          d="M19.8 13a7 7 0 0 0 0-2l2.1-1.6a0.5 0.5 0 0 0 .1-0.7l-2-3.5a0.5 0.5 0 0 0-0.6-0.2l-2.5 1a7 7 0 0 0-1.7-1L15 2.2a0.5 0.5 0 0 0-0.5-0.5h-4a0.5 0.5 0 0 0-0.5 0.5L9.2 4a7 7 0 0 0-1.7 1L5 3.8a0.5 0.5 0 0 0-0.6 0.2l-2 3.5a0.5 0.5 0 0 0 .1 0.7L4.5 10.9a7 7 0 0 0 0 2L2.5 14.5a0.5 0.5 0 0 0-.1 0.7l2 3.5a0.5 0.5 0 0 0 0.6 0.2l2.5-1a7 7 0 0 0 1.7 1L9 21.8a0.5 0.5 0 0 0 .5 0.5h4a0.5 0.5 0 0 0 .5-0.5L14.8 20a7 7 0 0 0 1.7-1l2.5 1a0.5 0.5 0 0 0 .6-0.2l2-3.5a0.5 0.5 0 0 0-.1-0.7L19.8 13Z"
        />
      </svg>
      <svg
        v-if="actions.delete"
        @click="() => navigate('delete')"
        title="Eliminar"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 mx-2 cursor-pointer text-gray-600"
      >
        <path
          d="M9 3H15M3 6H21M19 6L18.2987 16.5193C18.1935 18.0975 18.1409 18.8867 17.8 19.485C17.4999 20.0118 17.0472 20.4353 16.5017 20.6997C15.882 21 15.0911 21 13.5093 21H10.4907C8.90891 21 8.11803 21 7.49834 20.6997C6.95276 20.4353 6.50009 20.0118 6.19998 19.485C5.85911 18.8867 5.8065 18.0975 5.70129 16.5193L5 6M10 10.5V15.5M14 10.5V15.5"
          stroke="currentColor"
          stroke-width="2"
        ></path>
      </svg>
    </div>
  </td>
</template>
