<template>
  <div style="margin:20px" class="text-center" >
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-2" label="إسم الدواء" label-for="input-2" class="text-right">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
          type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label="السعر" label-for="input-1" class="text-right">
        <b-form-input id="input-1" v-model="form.phoneNumber" type="number"></b-form-input>
      </b-form-group>





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