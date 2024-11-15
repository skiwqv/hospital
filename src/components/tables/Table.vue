<template>
  <section class="data-table">
    <h2>{{ title }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="data && data.length" class="table-wrapper">
      <table class="table">
        <thead class="table-head">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="index"
              class="head-title"
            >
              {{ column.label }}
            </th>
            <th v-if="deleteHandler" class="head-title">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td
              v-for="(column, colIndex) in columns"
              :key="colIndex"
              class="table-content"
              @click="column.clickable ? handleClick(row, column.key) : null"
              :class="column.clickable ? 'link' : ''"
            >
              {{ formatCellData(row, column.key) }}
            </td>
            <td v-if="deleteHandler" class="icon-wrapper">
              <component
                :is="actionIcon ? actionIcon(row) : DeleteIcon"
                class="delete-icon"
                @click="handleDelete(row)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 v-else>{{ emptyMessage }}</h4>
  </section>
</template>

<script setup>
import DeleteIcon from "@/assets/icons/delete.svg";
import { formatDate, formatTime } from "@/helpers/Formater";

const props = defineProps({
  title: String,
  data: Array,
  columns: Array,
  deleteHandler: Function,
  loading: Boolean,
  emptyMessage: String,
  actionIcon: Function,
});

const emit = defineEmits(["viewProfile"]);

const formatCellData = (row, key) => {
  if (key === "date") return formatDate(row[key]);
  if (key === "time") return formatTime(row[key]);
  return row[key];
};

const handleClick = (row) => {
  emit("viewProfile", row);
};

const handleDelete = (row) => {
  if (props.deleteHandler) {
    props.deleteHandler(row);
  }
};
</script>
