<template>
  <div>
    <b-nav pills tabs fill>
      <b-nav-item >
        <router-link to="/mainTable" >عرض المعاملات</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/addMove">أضف فاتورة</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/addClient">أضف عميل</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/addDrug">أضف دواء</router-link>
      </b-nav-item>
    </b-nav>
  </div>
</template>
<style >
.navbar .router-link-exact-active {
  color: red;
}
</style>