<template>
  <div style="margin:20px" class="text-center">
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
      <b-form-group id="input-group-1" label="السن" label-for="input-1" class="text-right">
        <b-form-input id="input-1" v-model="form.age" type="number"></b-form-input>
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
        age: null
      },
      show: true
    };
  },
  computed: {},
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
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