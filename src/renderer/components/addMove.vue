<template>
  <div style="margin:20px" class="text-center">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-2" label="إسم العميل" label-for="input-2" class="text-right">
        <CoolSelect required v-model="selectedClient" :items="users" itemText="name"></CoolSelect>
      </b-form-group>

      <b-form-group id="input-group-3" label="نوع الحركة" label-for="input-3" class="text-right">
        <b-form-select id="input-3" v-model="form.type" :options="types" required></b-form-select>
      </b-form-group>

      <div v-if="form.type === 'in' && form.type" class="text-right">
        <b-form-group id="input-group-4" label="المبلغ" label-for="input-4">
          <b-form-input id="input-4" v-model="form.totalAmount" type="number"></b-form-input>
        </b-form-group>
      </div>

      <div v-else-if="form.type && form.type !== 'in'">
        <b-form inline align="right" class="text-right mb-2">
          <b-button @click="addDrug" style="margin-right:20px">add</b-button>
          <cool-select v-model="selectedDrug" :items="drugs" itemText="name" />
          <b-form-input style="width:50px ; margin-left:20px" v-model="quantity" required></b-form-input>
        </b-form>
        <b-list-group class="mb-2">
          <b-list-group-item v-for="drug in form.drugs" :key="drug.id" class="text-left">
            <b-row>
              <b-col>{{drug.quantity + ' | ' + drug.name }}</b-col>
              <b-col>{{ drug.price * drug.quantity}}</b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
        <b-row>
          <b-col>{{ totalAmount}}</b-col>
          <b-col>إجمالى المبلغ</b-col>
        </b-row>
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
        type: null,
        totalAmount: null,
        drugs: []
      },
      selectedDrug: null,
      selectedClient: null,

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
    users: () => {
      //console.log(db.readRecord('drugs'));
      return db.readRecord("users");
    },
    drugs: () => {
      //console.log(db.readRecord('drugs'));
      return db.readRecord("drugs");
    },

    totalAmount: function() {
      let sum = 0;
      for (let i = 0; i < this.form.drugs.length; i++) {
        sum += this.form.drugs[i].price * this.form.drugs[i].quantity;
      }
      return sum;
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      //alert(JSON.stringify(this.form));
      if(this.form.type === 'in'){
alert("ok")
      }
      else{
      this.form.name = this.selectedClient.name;
      this.form.phoneNumber = this.selectedClient.phoneNumber;
      this.form.totalAmount = this.totalAmount;
      alert("out")
      let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;



      this.form.when = today;
      db.addRecord("moves", this.form);
      }

    },

    addDrug() {
      console.log(db.readRecord("drugs"));
      if (!this.selectedDrug || !this.quantity || this.quantity < 1)
        alert("أضف كمية صحيحة");
      else {
        this.form.drugs.push({
          name: this.selectedDrug.name,
          quantity: this.quantity,
          price: this.selectedDrug.price
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