<template>
  <v-dialog v-model="modal" max-width="1000px">
    <v-btn slot="activator" color="primary" dark class="mb-2">Новый склад</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Новый товар</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-xl>
          <v-layout wrap>
            <v-flex xs12 sm8 md6>
              <v-text-field v-model="editedStore.address" label="Адрес склада"></v-text-field>
            </v-flex>
            <v-flex xs12 sm8 md6>
              <v-text-field v-model="editedStore.specequip"
                            label="Наличие спецтехники"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedStore.area" label="Площадь"></v-text-field>
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
      editedStore: {
        address: '',
        specequip: '',
        area: 0,
      },
      defaultStore: {
        address: '',
        specequip: '',
        area: 0,
      },
    };
  },
  computed: {
  },
  methods: {
    onCancel() {
      this.modal = false;
      this.editedStore = Object.assign({}, this.defaultStore);
    },
    onSave() {
      this.$store.dispatch('createStore', {
        address: this.editedStore.address,
        specequip: this.editedStore.specequip,
        area: this.editedStore.area });
      this.onCancel();
    },
  },
};
</script>

<style scoped>

</style>
