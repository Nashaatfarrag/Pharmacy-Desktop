<template>
  <b-container class="text-right" align="right">
    <b-row class="filters p-1">
      <b-col cols="2" class="container bg-danger">
        إجمالى المبالغ
        <br />
        الوارد {{money.moneyIn}}
        <br />
        الصادر {{money.moneyOut}}
        <br />
        <br />
        الفرق {{money.moneyIn - money.moneyOut}}
        <br />عدد الحركات
        <br />
        {{filtered? filtered.length:moves.length}}
      </b-col>
      <b-col>
        <b-row align-v="center" align-h="end">
          <b-col cols="4">
            <CoolSelect v-model="filters.selectedClient" :items="users" itemText="name"></CoolSelect>
          </b-col>
          <b-col cols="3">بحث بإسم العميل</b-col>
        </b-row>
        <b-row class="mt-1" align-v="center" align-h="end">
          <b-col cols="2">
            <b-form-input v-model="filters.max" type="number"></b-form-input>
          </b-col>
          <b-col cols="2">الحد الأقصى</b-col>
          <b-col cols="2">
            <b-form-input v-model="filters.min" type="number"></b-form-input>
          </b-col>
          <b-col cols="2">الحد الأدني</b-col>

          <b-col cols="2">تحديد السعر</b-col>
        </b-row>
        <b-row class="mt-1" align-v="center" align-h="end">
          <b-col cols="4">
            <b-form-select style="max-width:250px;" v-model="filters.type" :options="types"></b-form-select>
          </b-col>
          <b-col cols="2">نوع الحركة</b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-table
      :items="filtered ? filtered : moves"
      :fields="fields"
      responsive="sm"
      head-variant="light"
    >
      <template v-slot:cell(show_details)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          class="mr-2"
        >{{ row.detailsShowing ? 'إخفى التفاصيل' : 'أظهر التفاصيل'}}</b-button>
      </template>
      <template v-slot:cell(type)="row">
        <div>{{ row.item.type === "in" ? "وارد": "صادر"}}</div>
      </template>

      <template v-slot:row-details="row">
        <b-card style="background-color:#CDCDCD">
          <b-row class="mb-2 text-primary">
            <b-col>{{ row.item.totalAmount }}</b-col>
            <b-col>
              <b>إجمالى المبلغ</b>
            </b-col>
          </b-row>

          <b-row class="mb-2 text-primary">
            <b-col>{{ row.item.phoneNumber }}</b-col>
            <b-col>
              <b>رقم الموبايل</b>
            </b-col>
          </b-row>
          <b-row class="mb-2 text-primary">
            <b-col>{{ row.item.age }}</b-col>
            <b-col>
              <b>السن</b>
            </b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col>
              <b-list-group>
                <b-list-group-item v-for="drug in row.item.drugs" :key="drug.id">
                  <b-row>
                    <b-col>{{drug.quantity + ' | ' + drug.name }}</b-col>
                    <b-col>{{ drug.price * drug.quantity}}</b-col>
                  </b-row>
                </b-list-group-item>
              </b-list-group>
            </b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">إخفاء</b-button>
        </b-card>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import db from "../store/lowDb/index";
import { CoolSelect } from "vue-cool-select";
export default {
  name: "main-Table",
  components: {
    CoolSelect
  },
  computed: {
    moves: () => db.readRecord("moves"),
    users: () => db.readRecord("users"),
    filtered: function() {
      let data = this.moves;

      if (this.filters.selectedClient) {
        data = data.filter(
          val => val.name === this.filters.selectedClient.name
        );
      }
      if (this.filters.min) {
        data = data.filter(val => val.totalAmount >= this.filters.min);
      }
      if (this.filters.type) {
        data = data.filter(val => val.type === this.filters.type);
      }
      if (this.filters.max) {
        data = data.filter(
          val => val.totalAmount <= parseInt(this.filters.max)
        );
      }
      return data;
    },
    money: function() {
      let data = this.filtered ? this.filtered : this.moves;
      let result = {
        moneyIn: 0,
        moneyOut: 0
      };
      if (data) {
        for (let i = 0; i < data.length; i++) {
          let amount = data[i].totalAmount ? parseInt(data[i].totalAmount) : 0;
          if (data[i].type === "in") {
            result.moneyIn += amount;
          } else {
            result.moneyOut += amount;
          }
        }
      }
      return result;
    }
  },
  data() {
    return {
      fields: [
        {
          key: "show_details",
          label: "التفاصيل"
        },
        {
          key: "name",
          label: "الإسم",
          sortable: false
        },
        {
          key: "type",
          label: "نوع المعاملة"
        },
        {
          key: "when",
          label: "التاريخ",
          sortable: true
        },
        {
          key: "totalAmount",
          label: "المبلغ",
          sortable: true
        }
      ],
      filters: {
        selectedClient: null,
        min: 0,
        max: null,
        type: null
      },
      types: [
        { text: "الكل", value: null },
        { text: "وارد", value: "in" },
        { text: "صادر", value: "out" }
      ]
    };
  }
};
</script>