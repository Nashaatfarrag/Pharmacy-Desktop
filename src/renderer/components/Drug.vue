<template>
  <div style="margin:20px" class="text-center">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-2" label="إسم الدواء" label-for="input-2" class="text-right">
        <vue-simple-suggest
          v-model="chosen"
          :list="drugNames"
          :min-length="2"
          @hide-list="getPrice"
          :filter-by-query="true"
        >
          <!-- Filter by input text to only show the matching results -->
        </vue-simple-suggest>
      </b-form-group>

      <b-form-group id="input-group-1" label="السعر" label-for="input-1" class="text-right">
        <b-form-input id="input-1" v-model="form.price" type="number"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" :disabled="has">أضف</b-button>
      <b-button type="reset" variant="success" :disabled="!has">تعديل السعر</b-button>
    </b-form>
  </div>
</template>

<script>
import { CoolSelect } from "vue-cool-select";
import db from "../store/lowDb/index";
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css"; // Using a css-loader
export default {
  name: "hi",
  components: { CoolSelect, VueSimpleSuggest },
  data() {
    return {
      form: {
        price: null,
        name: null
      },
      selectedDrug: null,
      show: true,
      chosen: null,
      drugNames: null
    };
  },
  computed: {
    has: function() {
      return db.data
        .get("drugs")
        .find({
          name: this.chosen
        })
        .value();
    }
  },
  mounted: function() {
    this.updateData();
  },
  methods: {
    updateData() {
      this.drugNames = db.data.getState().drugs.map(a => a.name);
    },

    getPrice() {
      console.log("hi");
      if (this.has) {
        this.form.price = this.has.price;
        this.form.name = this.has.name;
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (this.chosen !== null && this.form.price !== null) {
        alert("تمام");
        db.addRecord("drugs", {
          name: this.chosen,
          price: this.form.price
        });
      } else {
        alert("أدخل قيم صحيحة");
      }
      this.updateData();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      db.data
        .get("drugs")
        .find({ _id: this.has._id })
        .assign({ price: this.form.price })
        .write();
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
      this.updateData();
    }
  }
};
</script>