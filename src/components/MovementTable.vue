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
          <app-new-move-modal></app-new-move-modal>
        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="moves"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
              <td>{{ props.item.goodsName }}</td>
              <td class="text-xs-right">{{ props.item.address }}</td>
              <td class="text-xs-right">{{ props.item.importtime }}</td>
              <td class="text-xs-right">{{ props.item.exporttime }}</td>
              <td class="justify-center layout px-0">
                <app-edit-move-modal :move="props.item"></app-edit-move-modal>
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
import NewMoveModal from './NewMoveModal';
import EditMoveModal from './EditMoveModal';

export default {
  data() {
    return {
      headers: [
        {
          text: 'Название товара',
          align: 'left',
          value: 'goodsName',
        },
        { text: 'Адрес склада', value: 'address' },
        { text: 'Дата поставки', value: 'importtime' },
        { text: 'Дата вывоза', value: 'exporttime' },
      ],
    };
  },
  computed: {
    moves() {
      return this.$store.getters.moves;
    },
  },
  components: {
    appNewMoveModal: NewMoveModal,
    appEditMoveModal: EditMoveModal,
  },
  methods: {
    onDelete(move) {
      this.$store.dispatch('deleteMove', {
        id: move.id });
    },
  },
};
</script>

<style scoped>
</style>
