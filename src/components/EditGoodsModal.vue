<template>
  <v-dialog v-model="modal" max-width="1000px">
    <v-icon
      small
      class="mt-3 mr-2"
      slot="activator"
    >
      edit
    </v-icon>
    <v-card>
      <v-card-title>
        <span class="headline">Редактировать товар</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedGoods.goodsName" label="Название товара"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedGoods.unit" label="Единицы измерения"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedGoods.pack" label="Вид упаковки"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedGoods.count" label="Количество"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="onCancel">Отмена</v-btn>
        <v-btn color="blue darken-1" flat @click="onSave">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['goods'],
  data() {
    return {
      modal: false,
      editedGoods: {
        id: this.goods.id,
        goodsName: this.goods.goodsName,
        unit: this.goods.unit,
        pack: this.goods.pack,
        count: this.goods.count,
      },
    };
  },
  computed: {
  },
  methods: {
    onCancel() {
      this.editedGoods = Object.assign({}, this.goods);
      this.modal = false;
    },
    onSave() {
      this.$store.dispatch('updateGoods', {
        id: this.editedGoods.id,
        goodsName: this.editedGoods.goodsName,
        unit: this.editedGoods.unit,
        pack: this.editedGoods.pack,
        count: this.editedGoods.count });
      this.onCancel();
    },
  },
};
</script>

<style scoped>

</style>
