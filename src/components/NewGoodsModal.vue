<template>
  <v-dialog v-model="modal" max-width="500px">
    <v-btn slot="activator" color="primary" dark class="mb-2">Новый товар</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Новый товар</span>
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
  data() {
    return {
      modal: false,
      editedGoods: {
        goodsName: '',
        unit: '',
        pack: '',
        count: 0,
      },
      defaultGoods: {
        goodsName: '',
        unit: '',
        pack: '',
        count: 0,
      },
    };
  },
  computed: {
  },
  methods: {
    onCancel() {
      this.modal = false;
      this.editedGoods = Object.assign({}, this.defaultGoods);
    },
    onSave() {
      this.$store.dispatch('createGoods', {
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
