<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-toolbar flat color="white">
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider
            class="mx-2"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <app-new-store-modal></app-new-store-modal>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="stores"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{ props.item.address }}</td>
            <td class="text-xs-right">{{ props.item.specequip }}</td>
            <td class="text-xs-right">{{ props.item.area }}</td>
            <td class="justify-center layout px-0">
              <app-edit-store-modal :store="props.item"></app-edit-store-modal>
              <v-icon
                small
                @click="onDelete(props.item)"
              >
                delete
              </v-icon>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NewStoreModal from './NewStoreModal';
import EditStoreModal from './EditStoreModal';

export default {
  data() {
    return {
      headers: [
        {
          text: 'Адрес склада',
          align: 'left',
          value: 'address',
        },
        { text: 'Наличие спецтехники', value: 'specequip' },
        { text: 'Площадь', value: 'area' },
      ],
    };
  },
  computed: {
    stores() {
      return this.$store.getters.stores;
    },
  },
  components: {
    appNewStoreModal: NewStoreModal,
    appEditStoreModal: EditStoreModal,
  },
  methods: {
    onDelete(store) {
      this.$store.dispatch('deleteStore', {
        id: store.id });
    },
  },
};
</script>

<style scoped>
</style>
