<template>
  <div style="margin:20px" class="text-center" >
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-2" label="إسم العميل" label-for="input-2" class="text-right">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label="رقم الموبايل" label-for="input-1" class="text-right">
        <b-form-input id="input-1" v-model="form.phoneNumber" type="number"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="نوع الحركة" label-for="input-3" class="text-right">
        <b-form-select id="input-3" v-model="form.type" :options="types" required></b-form-select>
      </b-form-group>

      <div v-if="form.type === 'in' && form.type" class="text-right" >
        <b-form-group id="input-group-4" label="المبلغ" label-for="input-4">
          <b-form-input id="input-4" v-model="form.totalAmount" type="number"></b-form-input>
        </b-form-group>
      </div>

      <div v-else-if="form.type && form.type !== 'in'">
        <b-form inline align="right" class="text-right mb-2">
          <b-button @click="addDrug" style="margin-right:20px">add</b-button>
          <cool-select v-model="selectedDrug" :items="drugs.map(a => a.name)" />
          <b-form-input style="width:50px ; margin-left:20px" v-model="quantity" required></b-form-input>
        </b-form>
        <ul v-for="drug in form.drugs" :key="drug.id" class="text-left">
          <li>{{drug.quantity + '  | ' + drug.name  }}</li>
        </ul>
      </div>
      <b-button type="submit" variant="primary">أضف</b-button>
      <b-button type="reset" variant="danger">مسح</b-button>
    </b-form>
  </div>
</template>

<script>
import { CoolSelect } from "vue-cool-select";
import db from "../store/lowDb/index";
export default {
  components: { CoolSelect },
  data() {
    return {
      form: {
        phoneNumber: "",
        name: "",
        type: null,
        totalAmount: null,
        drugs: []
      },
      selectedDrug: null,
      names: ["محمد", "نشأت"],
      types: [
        { text: "Select One", value: null },
        { text: "وارد", value: "in" },
        "صادر"
      ],
      quantity: 1,
      show: true
    };
  },
  computed: {
    drugs: () => {
      //console.log(db.readRecord('drugs'));
      return db.readRecord("drugs");
    },
    drugNames: () => {
      return db.readRecord("drugs").map(a => a.name);
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    addDrug() {
      //   db.addRecord( 'drugs' ,     {
      //   "id": 1,
      //   "name" : "Hal54othane" ,
      //   "price" : 35
      // }  );
      console.log(db.readRecord("drugs"));
      if (!this.selectedDrug || !this.quantity || this.quantity < 1)
        alert("أضف كمية صحيحة");
      else {
        this.form.drugs.push({
          name: this.selectedDrug,
          quantity: this.quantity
        });
        this.selectedDrug = null;
        this.quantity = 1;
      }
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>