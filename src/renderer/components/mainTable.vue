<template>
  <div class="m-1 text-right" align="right">
    <b-table :items="items" :fields="fields" responsive="sm">
      <template v-slot:cell(show_details)="row">
        <b-button
          size="sm"
          @click="row.toggleDetails"
          class="mr-2"
        >{{ row.detailsShowing ? 'Hide' : 'Show'}} Details</b-button>
      </template>
      <template v-slot:cell(type)="row">
        <div>{{ row.item.type? "وارد" : "صادر"}}</div>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Age:</b>
            </b-col>
            <b-col>{{ row.item.age }}</b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Is Active:</b>
            </b-col>
            <b-col>{{ row.item.isActive }}</b-col>
          </b-row>

          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
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
      items: [
        { isActive: true, type: true, age: 40, name: "محمد نشأت" },
        { isActive: false, age: 21, name: "هشام المغربي", last_name: "Shaw" },
        {
          isActive: false,
          age: 89,
          first_name: "Geneva",
          last_name: "Wilson",
          _showDetails: false
        },
        { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" }
      ]
    };
  }
};
</script>