<script setup lang="ts">
import TableActions from "../table/TableActions.vue";
import PaginationFooter from "../table/PaginationFooter.vue";

defineProps<{
  columns: { label: string; key: string }[];
  rows: Record<string, any>[];
  hasActions?: boolean;
  actions?: {
    edit?: (code: string) => void;
    config?: (code: string) => void;
    delete?: (code: string) => void;
  };
}>();
</script>

<template>
  <table class="min-w-full table-auto shadow-lg">
    <thead class="h-14">
      <tr>
        <th
          v-for="col in columns"
          :key="col.key"
          class="sticky top-0 bg-white cursor-pointer"
        >
          <div class="flex items-center justify-start text-base text-gray-600 px-3 hover:text-gray-900 whitespace-nowrap">
            {{ col.label }}
          </div>
        </th>
        <th v-if="hasActions" class="px-3"></th>
      </tr>
    </thead>
    <tbody class="bg-gray-50 shadow-xl">
      <tr
        v-for="item in rows"
        :key="item.id || item.code"
        class="bg-white border-y-2 border-gray-100 h-tr hover:bg-gray-100"
      >
        <td
          v-for="col in columns"
          :key="col.key"
          class="px-3"
        >
          <div class="max-w-xs overflow-hidden whitespace-pre-line text-ellipsis flex break-all justify-start" style="inline-size: max-content">
            {{ item[col.key] }}
          </div>
        </td>

        <td v-if="hasActions" class="px-3 sticky right-0 bg-white">
          <TableActions
            :item="item"
            :actions="{
              edit: actions?.edit,
              config: actions?.config,
              delete: actions?.delete,
            }"
          />
        </td>
      </tr>
    </tbody>
    <PaginationFooter />
  </table>
</template>
