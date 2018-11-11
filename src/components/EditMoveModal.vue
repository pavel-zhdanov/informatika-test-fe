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
        <span class="headline">Редактировать перемещение</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-xl>
          <v-layout wrap>
            <v-flex xs12 sm6 d-flex>
              <v-select
                :items="goodsNameList"
                label="Наименование товара"
                v-model="editedMove.goodsName"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 d-flex>
              <v-select
                :items="storesAddressList"
                label="Адрес склада"
                v-model="editedMove.address"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-menu
                :close-on-content-click="false"
                v-model="menuImporttime"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="editedMove.importtime"
                  label="Дата поставки"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  v-model="editedMove.importtime"
                  @input="menuImporttime = false"
                  :allowed-dates="allowedDatesImport"
                  :max="editedMove.exporttime.length>1?editedMove.exporttime:''"
                ></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-menu
                :close-on-content-click="false"
                v-model="menuExporttime"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="editedMove.exporttime"
                  label="Дата вывоза"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker
                  v-model="editedMove.exporttime"
                  @input="menuExporttime = false"
                  :allowed-dates="allowedDatesExport"
                  :min="editedMove.importtime.length>1?editedMove.importtime:''"
                ></v-date-picker>
              </v-menu>
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
  props: ['move'],
  data() {
    return {
      modal: false,
      editedMove: {
        id: this.move.id,
        goodsName: this.move.goodsName,
        address: this.move.address,
        exporttime: this.move.exporttime,
        importtime: this.move.importtime,
      },
      menuImporttime: false,
      menuExporttime: false,
    };
  },
  computed: {
    goodsNameList() {
      return this.$store.getters.getGoodsNameList;
    },
    storesAddressList() {
      return this.$store.getters.getStoresAddressList;
    },
  },
  methods: {
    onCancel() {
      this.editedMove = Object.assign({}, this.move);
      this.modal = false;
    },
    onSave() {
      this.$store.dispatch('updateMove', {
        id: this.editedMove.id,
        goodsName: this.editedMove.goodsName,
        address: this.editedMove.address,
        importtime: this.editedMove.importtime,
        exporttime: this.editedMove.exporttime });
      this.onCancel();
    },
    allowedDatesImport(val) {
      return val !== this.editedMove.exporttime;
    },
    allowedDatesExport(val) {
      return val !== this.editedMove.importtime;
    },
  },
};
</script>

<style scoped>

</style>
