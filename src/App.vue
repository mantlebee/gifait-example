<script setup lang="ts">
import { LookupRelationColumn } from "@mantlebee/fake-data-only";
import { FilterMatchMode } from "@primevue/core/api";
import Chip from "primevue/chip";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import Tab from "primevue/tab";
import TabList from "primevue/tablist";
import TabPanel from "primevue/tabpanel";
import TabPanels from "primevue/tabpanels";
import Tabs from "primevue/tabs";
import { reactive, ref } from "vue";

import {
  AppDatabase,
  CommentsTableKey,
  PostsTableKey,
  UsersTableKey,
} from "./database";

const database = new AppDatabase();

const currentTable = ref(database.tables[0]);

const filters = {
  [CommentsTableKey]: reactive({
    id: { field: "id", value: null, matchMode: FilterMatchMode.EQUALS },
  }),
  [PostsTableKey]: reactive({
    id: { field: "id", value: null, matchMode: FilterMatchMode.EQUALS },
  }),
  [UsersTableKey]: reactive({
    id: { field: "id", value: null, matchMode: FilterMatchMode.EQUALS },
  }),
};

const filterBy = <TRow>(
  column: LookupRelationColumn<TRow, unknown>,
  row: TRow
) => {
  const table = database.getTable(column.targetTableKey);
  currentTable.value = table;
  filters[column.targetTableKey][column.targetColumnName].value =
    row[column.name];
};
</script>

<template>
  <div>
    <Tabs v-model:value="currentTable">
      <TabList>
        <Tab
          @click="filters[table.key].id.value = null"
          v-for="table in database.tables"
          :key="table.key"
          :value="table"
          >{{ table.key.description }}</Tab
        >
      </TabList>
      <TabPanels>
        <TabPanel
          v-for="table in database.tables"
          :key="table.key"
          :value="table"
        >
          <Chip
            @click="filter.value = null"
            v-for="filter in Object.values(filters[table.key]).filter(
              (a) => a.value
            )"
            :key="filter.field"
            :label="filter.field"
            removable
          />
          <DataTable
            dataKey="id"
            v-model:filters="filters[table.key]"
            paginator
            :rows="10"
            :value="table.getRows()"
          >
            <Column
              v-for="column in table.columns"
              :key="column.name"
              :field="column.name"
              :header="column.name"
              sortable
            >
              <template #body="{ data }">
                <a
                  @click.prevent.stop="filterBy(column, data)"
                  href="#"
                  v-if="column instanceof LookupRelationColumn"
                >
                  {{ column.getTargetRowInfo(data, database)?.label }}
                </a>
                <span v-else>{{ data[column.name] }}</span>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped></style>
