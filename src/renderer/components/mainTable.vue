<template>

  <div class="m-1 text-right" align="right">
    <b-row class="mb-2">
      <b-col cols=8>
        <b-form-input v-model="filters.selectedClient">

        </b-form-input>
      </b-col>
            <b-col cols="1">
        <b-form-input v-model="filters.min">

        </b-form-input>
      </b-col>
            <b-col cols="1">
        <b-form-input v-model="filters.max">
        </b-form-input>
      </b-col>
    </b-row>
    <b-table :items="moves" :fields="fields" responsive="sm" var="dark" > 
      <template v-slot:cell(show_details)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          class="mr-2"
        >{{ row.detailsShowing ? 'إخفى التفاصيل' : 'أظهر التفاصيل'}}</b-button>
      </template>
      <template v-slot:cell(type)="row">
        <div>{{ row.item.type? "وارد" : "صادر"}}</div>
      </template>

      <template v-slot:row-details="row">
        <b-card style="background-color:#CDCDCD">
          <b-row class="mb-2" style="color:#FF5500">
            <b-col>{{ row.item.age }}</b-col>
            <b-col>
              <b>السن</b>
            </b-col>
          </b-row>

          <b-row class="mb-2" style="color:#FF5500">
            <b-col>{{ row.item.phoneNumber }}</b-col>
            <b-col>
              <b>رقم الموبايل</b>
            </b-col>
          </b-row>

          <b-row class="mb-2" style="color:#FF5500">
            <b-col>{{ row.item.totalAmount }}</b-col>
            <b-col>
              <b>إجمالى المبلغ</b>
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
  </div>
</template>

<script>
import db from "../store/lowDb/index";
export default {
  computed: {
    moves: () => {
      return db.readRecord("moves");
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
        }
      ],
      filters : {
        selectedClient : null ,
        min : 0 ,
        max : null 
      }
    };
  }
};
</script>