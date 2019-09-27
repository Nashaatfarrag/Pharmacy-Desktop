<template>
  <b-container  class="text-center p-2"  v-if="show">
    <b-form >
      <b-form-group id="input-group-2" label="إسم العميل" label-for="input-2" class="text-right">
        <vue-simple-suggest
          v-model="chosen"
          :list="userNames"
          :min-length="2"
          @hide-list="getData"
          :filter-by-query="true"
        >
          <!-- Filter by input text to only show the matching results -->
        </vue-simple-suggest>
      </b-form-group>

      <b-form-group id="input-group-3" label="رقم الموبايل" label-for="input-3" class="text-right">
        <b-form-input id="input-3" v-model="form.phoneNumber" type="number"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="السن" label-for="input-1" class="text-right mb-1">
        <b-form-input id="input-1" v-model="form.age" type="number"></b-form-input>
      </b-form-group>

    </b-form>
      <div id="controller">
        <b-button @click="onSubmit" variant="primary" :disabled="has">أضف</b-button>
        <b-button @click="onReset" variant="success" :disabled="!has">تعديل البيانات</b-button>
        <b-button @click="remove" variant="danger" :disabled="!has">مسح العميل</b-button>
      </div>
  </b-container>
</template>

<script>
import { CoolSelect } from "vue-cool-select";
import db from "../store/lowDb/index";
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css"; // Using a css-loader
export default {
  name: "client",
  components: { CoolSelect, VueSimpleSuggest },
  data() {
    return {
      form: {
        age: null,
        name: null,
        phoneNumber: ""
      },
      show: true,
      chosen: null,
      userNames: null
    };
  },
  computed: {
    has: function() {
      return db.data
        .get("users")
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
      this.userNames = db.data.getState().users.map(a => a.name);
    },

    getData() {
      if (this.has) {
        this.form.age = this.has.age;
        this.form.name = this.has.name;
        this.form.phoneNumber = this.has.phoneNumber;
      }
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (this.chosen) {
        if (
          db.data
            .get("users")
            .find({
              name: this.chosen
            })
            .value()
        ) {
          alert("إسم موجود بالفعل");
        } else {
          alert("تمام");
          db.addRecord("users", {
            name: this.chosen,
            phoneNumber: this.form.phoneNumber,
            age: this.form.age
          });
        }
      } else {
        alert("أدخل قيم صحيحة");
      }
      this.updateData();
    },
    remove() {
      if (this.has) {
        db.data
          .get("users")
          .remove({ _id: this.has._id })
          .write();
      }

      this.reload();
    },
    reload() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
      this.form = {};
      this.updateData();
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      db.data
        .get("users")
        .find({ _id: this.has._id })
        .assign({ phoneNumber: this.form.phoneNumber, age: this.form.age })
        .write();
      // Trick to reset/clear native browser form validation state
    }
  }
};
</script>
<style  scoped>
#controller{margin-top: 60px;}

</style>