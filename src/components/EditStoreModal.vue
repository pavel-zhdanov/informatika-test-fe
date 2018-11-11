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
        <span class="headline">Редактировать склад</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedStore.address" label="Адрес склада"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
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
  props: ['store'],
  data() {
    return {
      modal: false,
      editedStore: {
        id: this.store.id,
        address: this.store.address,
        specequip: this.store.specequip,
        area: this.store.area,
      },
    };
  },
  computed: {
  },
  methods: {
    onCancel() {
      this.editedStore = Object.assign({}, this.store);
      this.modal = false;
    },
    onSave() {
      this.$store.dispatch('updateStore', {
        id: this.editedStore.id,
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
