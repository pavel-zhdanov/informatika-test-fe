<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-toolbar flat color="white">
          <v-toolbar-title>Список складов</v-toolbar-title>
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
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.address }}</td>
              <td class="justify-center">{{ props.item.specequip }}</td>
              <td class="justify-center">{{ props.item.area }}</td>
              <td class="justify-center layout px-0">
                <app-edit-store-modal :store="props.item"></app-edit-store-modal>
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
            <v-layout row wrap>
              <v-flex xs12 sm6 md4>
                <v-menu
                  :close-on-content-click="false"
                  v-model="menuDateFrom"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="dateFrom"
                    label="Движение товара с..."
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    v-model="dateFrom"
                    @input="menuDateFrom = false"
                    :allowed-dates="allowedDatesFrom"
                    :max="dateTo.length>1?dateTo:''"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-menu
                  :close-on-content-click="false"
                  v-model="menuDateTo"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="dateTo"
                    label="Движения товара по..."
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker
                    v-model="dateTo"
                    @input="menuDateTo = false"
                    :allowed-dates="allowedDatesTo"
                    :min="dateFrom.length>1?dateFrom:''"
                  ></v-date-picker>
                </v-menu>
              </v-flex>
              <v-btn color="primary" dark class="mb-2"
                     @click="showGoodsOnStoreTable=!showGoodsOnStoreTable;
                     onClickShowGoods(props.item)">Показать</v-btn>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap v-if="showGoodsOnStoreTable">
              <v-flex xs12>
              <v-data-table
                :headers="headersGoodsOnStore"
                :items="goodsOnStore"
                hide-actions
                class="elevation-1"
                v-if="goodsOnStore.length>=1"
              >
                <template slot="items" slot-scope="props">
                  <td class="justify-center">{{ props.item.name }}</td>
                  <td class="justify-center">{{ props.item.importtime }}</td>
                  <td class="justify-center">{{ props.item.exporttime }}</td>
                </template>
              </v-data-table>
              <v-card
                flat
                v-else>
                <v-card-text>Движения товара отсутствуют</v-card-text>
              </v-card>
              </v-flex>
            </v-layout>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>


    <v-layout>
        <v-flex xs12 sm6 md4>
          <v-menu
            :close-on-content-click="false"
            v-model="menuEmptyDateFrom"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="emptyDateFrom"
              label="Пустые склады с..."
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker
              v-model="emptyDateFrom"
              @input="menuEmptyDateFrom = false"
              :allowed-dates="allowedEmptyDatesFrom"
              :max="emptyDateTo.length>1?emptyDateTo:''"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-menu
            :close-on-content-click="false"
            v-model="menuEmptyDateTo"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="emptyDateTo"
              label="Пустые склады по..."
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker
              v-model="emptyDateTo"
              @input="menuEmptyDateTo = false"
              :allowed-dates="allowedEmptyDatesTo"
              :min="emptyDateFrom.length>1?emptyDateFrom:''"
            ></v-date-picker>
          </v-menu>
        </v-flex>
        <v-btn color="primary" dark class="mb-2"
               @click="showEmptyStore">
          {{showEmptyStoreTable?'Скрыть':'Показать пустые склады'}}</v-btn>
    </v-layout>

    <v-layout v-if="showEmptyStoreTable">
      <v-flex>
        <v-data-table
          :headers="headers"
          :items="emptyStore"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
              <td>{{ props.item.address }}</td>
              <td class="justify-center">{{ props.item.specequip }}</td>
              <td class="justify-center">{{ props.item.area }}</td>
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
      headersGoodsOnStore: [
        {
          text: 'Название товара',
          align: 'left',
          value: 'name',
        },
        { text: 'Дата поступления', value: 'importtime' },
        { text: 'Дата вывоза', value: 'exporttime' },
      ],
      menuDateFrom: false,
      menuDateTo: false,
      menuEmptyDateFrom: false,
      menuEmptyDateTo: false,
      dateFrom: '',
      dateTo: '',
      emptyDateFrom: '',
      emptyDateTo: '',
      goodsOnStore: [],
      emptyStore: [],
      showGoodsOnStoreTable: false,
      showEmptyStoreTable: false,
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
    allowedDatesFrom(val) {
      return val !== this.dateTo;
    },
    allowedDatesTo(val) {
      return val !== this.dateFrom;
    },
    allowedEmptyDatesFrom(val) {
      return val !== this.emptyDateTo;
    },
    allowedEmptyDatesTo(val) {
      return val !== this.emptyDateFrom;
    },
    onClickShowGoods(item) {
      this.$store.dispatch('fetchGoodsOnStore', {
        id: item.id,
        dateTo: this.dateTo,
        dateFrom: this.dateFrom,
      })
        .then(() => {
          this.goodsOnStore = this.$store.getters.goodsOnStore;
        })
        .catch(() => {});
    },
    showEmptyStore() {
      if (!this.showEmptyStoreTable) {
        this.$store.dispatch('fetchEmptyStore', {
          dateTo: this.emptyDateTo,
          dateFrom: this.emptyDateFrom,
        })
          .then(() => {
            this.emptyStore = this.$store.getters.emptyStore;
            this.showEmptyStoreTable = !this.showEmptyStoreTable;
          })
          .catch(() => {});
      } else {
        this.showEmptyStoreTable = !this.showEmptyStoreTable;
      }
    },
  },
};
</script>

<style scoped>
</style>
