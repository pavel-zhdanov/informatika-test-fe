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
          <app-new-goods-modal></app-new-goods-modal>
        </v-toolbar>

        <v-data-table
          :headers="headers"
          :items="goods"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded; props.expanded?onClickRow(props.item):{}">
              <td>{{ props.item.goodsName }}</td>
              <td class="justify-center">{{ props.item.unit }}</td>
              <td class="justify-center">{{ props.item.pack }}</td>
              <td class="justify-center">{{ props.item.count }}</td>
              <td class="justify-center layout px-0">
                <app-edit-goods-modal :goods="props.item"></app-edit-goods-modal>
                <v-icon
                  small
                  @click="onDelete(props.item)"
                >
                  delete
                </v-icon>
              </td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-data-table
              :headers="headersMove"
              :items="moveGoods"
              hide-actions
              class="elevation-1"
              v-if="moveGoods.length>=1"
            >
              <template slot="items" slot-scope="props">
                  <td class="justify-center">{{ props.item.address }}</td>
                  <td class="justify-center">{{ props.item.importtime }}</td>
                  <td class="justify-center">{{ props.item.exporttime }}</td>
              </template>
            </v-data-table>
            <v-card
              flat
            v-else>
              <v-card-text>Движения товара отсутствуют</v-card-text>
            </v-card>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NewGoodsModal from './NewGoodsModal';
import EditGoodsModal from './EditGoodsModal';

export default {
  data() {
    return {
      headers: [
        {
          text: 'Название товара',
          align: 'left',
          value: 'goodsName',
        },
        { text: 'Единица измерения', value: 'unit' },
        { text: 'Вид упаковки', value: 'pack' },
        { text: 'Количество', value: 'count' },
      ],
      headersMove: [
        { text: 'Адрес склада', value: 'address' },
        { text: 'Дата ввоза', value: 'importtime' },
        { text: 'Дата вывоза', value: 'exporttime' },
      ],
      moveGoods: [],
    };
  },
  computed: {
    goods() {
      return this.$store.getters.goods;
    },
  },
  components: {
    appNewGoodsModal: NewGoodsModal,
    appEditGoodsModal: EditGoodsModal,
  },
  methods: {
    onDelete(goods) {
      this.$store.dispatch('deleteGoods', {
        id: goods.id });
    },
    onClickRow(item) {
      this.$store.dispatch('fetchMoveGoodsById', {
        id: item.id,
      })
        .then(() => {
          this.moveGoods = this.$store.getters.moveGoods;
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
</style>
